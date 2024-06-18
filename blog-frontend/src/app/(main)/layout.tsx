import Ribbon from '@/components/Ribbon'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/Footer'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Ribbon />
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  )
}
