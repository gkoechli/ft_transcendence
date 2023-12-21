import '../styles/globals.css'
import { GeistSans } from "geist/font/sans";
import { GeistMono } from 'geist/font/mono'


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
      <body className='font-sans'>
        {children}
      </body>
    </html>
  )
}
