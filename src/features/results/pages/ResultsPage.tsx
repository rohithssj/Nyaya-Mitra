import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/common/Card'

export function ResultsPage() {
  const { documentId } = useParams()

  return (
    <div className="w-full pb-[60px] pt-[40px]">
      <div className="mx-auto w-full max-w-[1080px] px-7">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)]">
              <div className="absolute inset-[5px] rounded-full border border-dashed border-[var(--color-primary-hover)] opacity-70"></div>
              <div className="h-[9px] w-[9px] rounded-full bg-[var(--color-gold)]"></div>
            </div>
            <div>
              <h1 className="font-heading text-2xl font-[560]">Your FIR, explained</h1>
              <div className="mt-1 font-mono text-[12px] text-[var(--color-text-secondary)]">Uploaded today · Section 41A, CrPC</div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2.5">
          <span className="inline-block rounded-full border border-[rgba(184,134,11,0.4)] bg-[rgba(184,134,11,0.14)] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-[var(--color-gold-bright)]">Bailable · your right</span>
          <span className="inline-block rounded-full border border-[rgba(156,43,58,0.5)] bg-[rgba(122,31,43,0.18)] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-[#E08B96]">Chargesheet due · 60 days</span>
          <span className="inline-block rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-[var(--color-text-secondary)]">Court: Metropolitan Magistrate, Hyderabad</span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-[22px]">
            {/* Summary Card */}
            <Card className="p-[26px]">
              <div className="mb-3.5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
                In plain words
              </div>
              <p className="text-[15px] leading-[1.75] text-[#C9C0B4]">
                This FIR has been filed against you under a section of the law that allows bail as a right —
                the police cannot keep you in custody without producing you before a magistrate within
                24 hours. The investigating officer has 60 days to file a chargesheet. Until then, you
                can apply for bail directly; you do not need to wait for the case to proceed further.
              </p>
            </Card>

            {/* Ask Card */}
            <Card className="p-[22px_24px]">
              <div className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
                Ask about your case
              </div>
              <div className="mt-3.5 flex flex-wrap gap-2">
                <span className="cursor-pointer rounded-full border border-[var(--color-border)] px-3 py-1.5 text-[12px] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold-bright)]">What happens if I miss the deadline?</span>
                <span className="cursor-pointer rounded-full border border-[var(--color-border)] px-3 py-1.5 text-[12px] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold-bright)]">Can I apply for bail myself?</span>
                <span className="cursor-pointer rounded-full border border-[var(--color-border)] px-3 py-1.5 text-[12px] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold-bright)]">What does Section 41A mean?</span>
              </div>
              <div className="mt-3.5 flex gap-2.5">
                <input type="text" placeholder="Type a question about your document…" className="flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-[18px] py-[11px] font-sans text-[13.5px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-gold)]" />
                <button className="flex h-[38px] w-[38px] shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-[var(--color-primary)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px] stroke-white text-white">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </button>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-[22px_24px]">
              <div className="mb-3.5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
                Key facts
              </div>
              <div className="flex items-center justify-between border-b border-[var(--color-border)] py-[13px]">
                <span className="text-[13.5px] text-[#C9C0B4]">Bail status</span>
                <span className="inline-block rounded-full border border-[rgba(184,134,11,0.4)] bg-[rgba(184,134,11,0.14)] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-[var(--color-gold-bright)]">Bailable</span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--color-border)] py-[13px]">
                <span className="text-[13.5px] text-[#C9C0B4]">Chargesheet deadline</span>
                <span className="inline-block rounded-full border border-[rgba(156,43,58,0.5)] bg-[rgba(122,31,43,0.18)] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-[#E08B96]">Mar 4</span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--color-border)] py-[13px]">
                <span className="text-[13.5px] text-[#C9C0B4]">Investigating officer</span>
                <span className="inline-block rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-[var(--color-text-secondary)]">SI R. Kumar</span>
              </div>
              <div className="flex items-center justify-between py-[13px]">
                <span className="text-[13.5px] text-[#C9C0B4]">Jurisdiction</span>
                <span className="inline-block rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-[var(--color-text-secondary)]">Hyderabad</span>
              </div>
            </Card>
          </div>
        </div>

        <Card className="mt-[28px] flex flex-wrap items-center justify-between gap-5 border-[var(--color-primary-hover)] bg-[rgba(122,31,43,0.08)] p-[24px]">
          <div>
            <h3 className="mb-1 font-heading text-[17px] font-[560]">Ready for the next step?</h3>
            <p className="text-[13.5px] text-[var(--color-text-secondary)]">Generate a bail application pre-filled with your case details.</p>
          </div>
          <Link to={`/draft/${documentId}`} className="inline-flex items-center gap-[8px] rounded-[3px] border border-[rgba(184,134,11,0.45)] bg-[rgba(184,134,11,0.14)] px-[18px] py-[10px] font-sans text-[14px] font-medium text-[var(--color-gold-bright)] transition-colors hover:bg-[rgba(184,134,11,0.22)]">
            Draft my bail application
          </Link>
        </Card>
      </div>
    </div>
  )
}
