import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)] font-sans text-[var(--color-text-primary)] antialiased">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
