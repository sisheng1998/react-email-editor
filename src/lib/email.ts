import React from "react"
import * as ReactEmailComponents from "@react-email/components"
import { transform } from "@swc/wasm-web"

import { EmailComponent } from "@/types/email"

export const transpileCode = async (code: string) => {
  const result = await transform(code, {
    jsc: { parser: { syntax: "typescript", tsx: true } },
    module: { type: "commonjs" },
    isModule: true,
  })

  return result.code
}

export const evaluateCode = (code: string): EmailComponent => {
  const { module, process, require } = {
    module: {
      exports: {
        default: undefined as unknown,
      },
    },
    process: {
      env: {
        NODE_ENV: "production",
      },
    },
    require: (module: string) => {
      if (module === "react") return React
      if (module === "@react-email/components") return ReactEmailComponents
      throw new Error(`Module "${module}" not found`)
    },
  }

  new Function("exports", "process", "require", code)(
    module.exports,
    process,
    require
  )

  const emailComponent = module.exports.default

  if (emailComponent === undefined) {
    throw new Error("The code does not contain a default export")
  }

  return emailComponent as EmailComponent
}

export const sendTestEmail = async (body: {
  to: string
  subject: string
  html: string
}) => {
  const response = await fetch("https://react.email/api/send/test", {
    method: "POST",
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error || "Something went wrong")
  }

  return data
}