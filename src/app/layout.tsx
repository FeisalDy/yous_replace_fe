import type { Metadata } from 'next'
import './globals.css'
import Provider from './provider'
import NavbarComponent from '@/components/Navbar/NavBar'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased dark text-foreground bg-background`}>
        <Provider>
          <div className='min-h-svh space-y-4' suppressHydrationWarning>
            <NavbarComponent />
            <div className='max-w-screen-lg mx-auto'>{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  )
}
