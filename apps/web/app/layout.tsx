import '../styles/globals.css'
import { GeistSans } from "geist/font/sans";
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'

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
        <Toaster position="top-right" expand={false} richColors />
        {children}
      </body>
    </html>
  )
}
