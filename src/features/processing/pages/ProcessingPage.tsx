import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export function ProcessingPage() {
  const navigate = useNavigate()

  // Mock processing delay then redirect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/results/mock-doc-123')
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-[34px] flex h-[84px] w-[84px] items-center justify-center rounded-full border-[1.6px] border-[var(--color-gold)]">
        <div className="absolute inset-2 animate-[spin_6s_linear_infinite] rounded-full border border-dashed border-[var(--color-primary-hover)]"></div>
        <div className="h-3 w-3 rounded-full bg-[var(--color-gold)]"></div>
      </div>
      
      <h1 className="mb-2 font-heading text-2xl font-[560] leading-tight tracking-[-0.01em]">
        Reading your document…
      </h1>
      <p className="mb-[38px] text-[14px] text-[var(--color-text-secondary)]">
        This usually takes under a minute.
      </p>

      <div className="flex w-full max-w-[340px] flex-col gap-4 text-left">
        {/* Done Step */}
        <div className="flex items-center gap-3 text-[14.5px] text-[#C9C0B4]">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[rgba(184,134,11,0.18)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-[11px] w-[11px] stroke-[var(--color-gold-bright)]">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          Document received
        </div>
        
        {/* Done Step */}
        <div className="flex items-center gap-3 text-[14.5px] text-[#C9C0B4]">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[rgba(184,134,11,0.18)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-[11px] w-[11px] stroke-[var(--color-gold-bright)]">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          Identified as an FIR
        </div>
        
        {/* Active Step */}
        <div className="flex items-center gap-3 text-[14.5px] text-[#C9C0B4]">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-primary-hover)]">
            <div className="h-[7px] w-[7px] animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-[var(--color-primary-hover)]"></div>
          </div>
          Checking applicable rights & deadlines
        </div>
        
        {/* Pending Step */}
        <div className="flex items-center gap-3 text-[14.5px] text-[var(--color-text-secondary)] opacity-55">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)]"></div>
          Preparing plain-language summary
        </div>
      </div>
    </div>
  )
}
