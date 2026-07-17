import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadZone } from '@/components/common/UploadZone'

export function UploadPage() {
  const navigate = useNavigate()

  const handleUpload = () => {
    // Mock the flow
    navigate('/processing')
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 pb-10 text-center">
      <h1 className="mb-2.5 max-w-[480px] font-heading text-[26px] font-[560] leading-[1.25] tracking-[-0.01em] md:text-[32px]">
        Upload your document.<br />We'll explain it simply.
      </h1>
      <p className="mb-9 max-w-[380px] text-[15px] text-[#C9C0B4]">
        FIR, notice, or chargesheet — in any language, any photo.
      </p>

      <UploadZone onUpload={handleUpload} />

      <div className="my-[22px] flex w-full max-w-[440px] items-center gap-3 text-[13px] text-[var(--color-text-secondary)]">
        <div className="h-px flex-1 bg-[var(--color-border)]"></div>
        or
        <div className="h-px flex-1 bg-[var(--color-border)]"></div>
      </div>

      <button className="inline-flex items-center gap-[9px] rounded-full border border-[var(--color-border)] bg-transparent px-[22px] py-3 font-sans text-[14.5px] text-[#C9C0B4] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold-bright)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
        Take a photo instead
      </button>

      <div className="mt-[52px] flex flex-col gap-[22px] md:flex-row md:gap-9">
        <div className="flex max-w-[110px] flex-col items-center gap-2.5">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[var(--color-primary-hover)] bg-[rgba(122,31,43,0.16)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-[var(--color-gold-bright)]">
              <path d="M12 3v13M7 9l5-5 5 5"/>
              <path d="M5 21h14"/>
            </svg>
          </div>
          <span className="text-[12.5px] leading-[1.4] text-[var(--color-text-secondary)]">Upload</span>
        </div>
        <div className="flex max-w-[110px] flex-col items-center gap-2.5">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[var(--color-primary-hover)] bg-[rgba(122,31,43,0.16)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-[var(--color-gold-bright)]">
              <circle cx="11" cy="11" r="7"/>
              <path d="M21 21l-4-4"/>
            </svg>
          </div>
          <span className="text-[12.5px] leading-[1.4] text-[var(--color-text-secondary)]">We check it</span>
        </div>
        <div className="flex max-w-[110px] flex-col items-center gap-2.5">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[var(--color-primary-hover)] bg-[rgba(122,31,43,0.16)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-[var(--color-gold-bright)]">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="9"/>
            </svg>
          </div>
          <span className="text-[12.5px] leading-[1.4] text-[var(--color-text-secondary)]">You get clear answers</span>
        </div>
      </div>
    </div>
  )
}
