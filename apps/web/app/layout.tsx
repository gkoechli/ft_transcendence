import '../styles/globals.css'
import { GeistSans } from "geist/font/sans";
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'

import { ThemeProvider } from "../components/theme/theme-provider"

export const metadata = {
  title: 'Pungy',
  description: 'Online multiplayer pong game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-right" expand={false} richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
