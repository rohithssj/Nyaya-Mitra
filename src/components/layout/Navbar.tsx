import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/common/Button'

export function Navbar() {
  const location = useLocation()
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'How it Works', path: '/#how' },
    { name: 'History', path: '/history' },
  ]

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--color-border)] bg-[rgba(13,13,13,0.86)] px-8 py-4 backdrop-blur-[10px]">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-2.5 font-heading text-[19px] font-[560] text-[var(--color-ivory)]">
        <div className="relative flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)]">
          <div className="absolute inset-[4px] rounded-full border border-dashed border-[var(--color-primary-hover)] opacity-70"></div>
          <div className="h-[6px] w-[6px] rounded-full bg-[var(--color-gold)]"></div>
        </div>
        Nyaya Mitra
      </Link>

      {/* Center: Links */}
      <nav className="hidden items-center gap-9 md:flex">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path || (link.path === '/#how' && location.hash === '#how')
          return (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-[14.5px] transition-colors hover:text-[var(--color-gold-bright)] ${
                isActive ? 'text-[var(--color-gold-bright)] font-medium' : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>

      {/* Right: Language, Upload CTA, Profile */}
      <div className="flex items-center gap-5">
        <div className="hidden overflow-hidden rounded-full border border-[var(--color-border)] font-mono text-[12.5px] sm:flex">
          <button className="bg-[var(--color-primary)] px-[13px] py-[7px] text-[var(--color-ivory)] transition-all">EN</button>
          <button className="px-[13px] py-[7px] text-[var(--color-text-secondary)] transition-all hover:text-[var(--color-ivory)]">हिं</button>
          <button className="px-[13px] py-[7px] text-[var(--color-text-secondary)] transition-all hover:text-[var(--color-ivory)]">తె</button>
        </div>

        <Button asChild className="rounded-[3px] border border-[var(--color-primary-hover)] bg-[var(--color-primary)] px-5 py-[11px] font-sans text-[14.5px] font-medium text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-primary-hover)]">
          <Link to="/upload">Upload Document</Link>
        </Button>

        {/* Profile Avatar Placeholder */}
        <Link to="/settings" className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[14px] font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold-bright)]">
          P
        </Link>
      </div>
    </header>
  )
}
