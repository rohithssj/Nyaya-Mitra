import * as React from 'react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-background)] px-8 py-[48px] pb-[40px]">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-[20px]">
        {/* Left: Logo */}
        <div className="flex items-center gap-2.5 font-heading text-[16px] font-[560] text-[var(--color-ivory)]">
          <div className="relative flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)]">
            <div className="absolute inset-[3px] rounded-full border border-dashed border-[var(--color-primary-hover)] opacity-70"></div>
            <div className="h-[4px] w-[4px] rounded-full bg-[var(--color-gold)]"></div>
          </div>
          Nyaya Mitra
        </div>

        {/* Center: Disclaimer */}
        <p className="max-w-[520px] text-[12.5px] leading-[1.7] text-[var(--color-text-secondary)]">
          Nyaya Mitra is an informational tool and does not constitute legal advice or create an attorney–client relationship. Informational guidance only—not legal advice.
        </p>

        {/* Right: Links */}
        <div className="flex gap-[26px] text-[13px] text-[#C9C0B4]">
          <Link to="/about" className="transition-colors hover:text-[var(--color-gold-bright)]">About</Link>
          <Link to="/privacy" className="transition-colors hover:text-[var(--color-gold-bright)]">Privacy</Link>
          <Link to="/terms" className="transition-colors hover:text-[var(--color-gold-bright)]">Terms</Link>
          <Link to="/disclaimer" className="transition-colors hover:text-[var(--color-gold-bright)]">Disclaimer</Link>
        </div>
      </div>
    </footer>
  )
}
