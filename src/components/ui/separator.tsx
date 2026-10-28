import * as React from "react"

import { cn } from "@/lib/utils"

// Plain-div version of the Radix separator (same markup and attributes), so it
// renders on the server and doesn't pull the Radix runtime into the client JS.
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}) {
  return (
    <div
      data-slot="separator"
      data-orientation={orientation}
      {...(decorative
        ? { role: "none" }
        : {
            role: "separator",
            "aria-orientation":
              orientation === "vertical" ? "vertical" : undefined,
          })}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
