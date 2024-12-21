import React from "react"

import { EmailProvider } from "@/hooks/use-email"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import ClientOnly from "@/components/layouts/client-only"
import Preloader from "@/components/layouts/preloader"
import TopLoader from "@/components/layouts/top-loader"
import ThemeProvider from "@/components/theme-provider"

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <SidebarProvider>
      <TopLoader />

      <EmailProvider>
        <ClientOnly>{children}</ClientOnly>
      </EmailProvider>
    </SidebarProvider>

    <Preloader />

    <Toaster />
  </ThemeProvider>
)

export default Providers
