import '../styles/globals.css'
import { GeistSans } from "geist/font/sans";


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
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
