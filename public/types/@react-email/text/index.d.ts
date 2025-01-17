import * as React from "react"

type TextProps = Readonly<React.ComponentPropsWithoutRef<"p">>
declare const Text: React.ForwardRefExoticComponent<
  Readonly<
    Omit<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
      >,
      "ref"
    >
  > &
    React.RefAttributes<HTMLParagraphElement>
>

export { Text, type TextProps }
