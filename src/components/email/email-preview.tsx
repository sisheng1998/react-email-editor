"use client"

import React from "react"
import { useQueryState } from "nuqs"

import { cn } from "@/lib/utils"
import { useEmail } from "@/hooks/use-email"
import CodePreview from "@/components/code/code-preview"
import ErrorMessage from "@/components/email/error-message"
import LoadingIndicator from "@/components/loading-indicator"
import { parseAsView, VIEW_KEY, VIEWS } from "@/constants/views"

const EmailPreview = () => {
  const [view] = useQueryState(
    VIEW_KEY,
    parseAsView.withDefault(VIEWS[0].value)
  )

  const { previewHtml, initialized, error } = useEmail()

  return (
    <div className="relative flex h-full flex-col">
      {!initialized && <LoadingIndicator />}

      {view === "code" ? (
        <CodePreview />
      ) : (
        previewHtml && (
          <iframe
            srcDoc={previewHtml}
            title="Email Preview"
            className={cn(
              "h-full w-full border-0 bg-white",
              view === "mobile" && "mx-auto max-w-[360px]"
            )}
            sandbox="allow-popups"
          />
        )
      )}

      {error && <ErrorMessage error={error} />}
    </div>
  )
}

export default EmailPreview
