import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Monitoring } from "react-scan/monitoring/next";
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Anesthetic Coder | Writer • Photographer • Traveller",
  description: "Personal portfolio showcasing blogs, vlogs, photography, and poetry.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://unpkg.com/react-scan/dist/install-hook.global.js"
          strategy="beforeInteractive"
        />
      </head>
      <Monitoring
        apiKey="SLKBA2j_QoGPEPe2ODDaMQwxCW0TfHOz" // Safe to expose publically
        url="https://monitoring.react-scan.com/api/v1/ingest"
        commit={process.env.GIT_COMMIT_HASH} // optional but recommended
        branch={process.env.GIT_BRANCH} // optional but recommended
      />
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <div className="animated-bg"></div>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}