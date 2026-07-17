import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

export function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] py-[90px] pt-[104px]">
        {/* Glow effect */}
        <div className="pointer-events-none absolute -right-[160px] -top-[200px] h-[520px] w-[520px] bg-[radial-gradient(circle,rgba(122,31,43,0.28)_0%,rgba(122,31,43,0)_68%)]"></div>
        
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-16 px-8 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-3.5 before:bg-[var(--color-gold-bright)]">
              AI Legal Rights Navigator
            </div>
            <h1 className="mb-[22px] font-heading text-[38px] font-[560] leading-[1.08] tracking-[-0.01em] md:text-[52px]">
              Legal papers,<br />translated into <em className="font-[450] italic text-[var(--color-gold-bright)]">plain sense.</em>
            </h1>
            <p className="mb-[34px] max-w-[480px] text-[17.5px] text-[#C9C0B4]">
              Upload an FIR, chargesheet, or legal notice. Nyaya Mitra explains what it means,
              what rights apply, what deadlines matter — and drafts your next step, in English,
              Hindi, or Telugu.
            </p>
            <div className="mb-[28px] flex items-center gap-4">
              <Button asChild size="lg" className="rounded-[2px]">
                <Link to="/upload">Try it now</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="rounded-[2px]">
                <Link to="/how-it-works">See how it works</Link>
              </Button>
            </div>
            <div className="flex items-center gap-2.5 font-mono text-[13px] text-[var(--color-text-secondary)]">
              <span className="h-[5px] w-[5px] rounded-full bg-[var(--color-gold)]"></span>
              Informational guidance, not a substitute for a lawyer
            </div>
          </div>

          <div className="relative rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)] p-[26px]">
            <div className="rounded-[2px] border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-[18px]">
              <span className="mb-2.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                First Information Report — Extract
              </span>
              <p className="font-mono text-[12.5px] leading-[1.85] text-[#C9C0B4]">
                "...the accused shall be produced before the <mark className="bg-transparent font-medium text-[var(--color-primary-hover)] border-b border-[var(--color-primary-hover)]">Magistrate</mark> within
                twenty-four hours... offence under Section 41A is
                <mark className="bg-transparent font-medium text-[var(--color-primary-hover)] border-b border-[var(--color-primary-hover)]">bailable</mark>... investigation to be completed within
                <mark className="bg-transparent font-medium text-[var(--color-primary-hover)] border-b border-[var(--color-primary-hover)]">sixty days</mark>..."
              </p>
            </div>

            <div className="my-[18px] flex items-center justify-center gap-3.5">
              <div className="h-px flex-1 bg-[var(--color-border)]"></div>
              <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)]">
                <div className="absolute inset-[5px] rounded-full border border-dashed border-[var(--color-primary-hover)]"></div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px] text-[var(--color-gold-bright)]">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </div>
              <div className="h-px flex-1 bg-[var(--color-border)]"></div>
            </div>

            <div className="rounded-[2px] border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-[18px]">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] py-2.5">
                <span className="text-[13.5px] text-[#C9C0B4]">Bail status</span>
                <span className="inline-block rounded-full border border-[rgba(184,134,11,0.4)] bg-[rgba(184,134,11,0.14)] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-[var(--color-gold-bright)]">Bailable · your right</span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--color-border)] py-2.5">
                <span className="text-[13.5px] text-[#C9C0B4]">Chargesheet deadline</span>
                <span className="inline-block rounded-full border border-[rgba(156,43,58,0.5)] bg-[rgba(122,31,43,0.18)] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-[#E08B96]">60 days · Mar 4</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[13.5px] text-[#C9C0B4]">Next step</span>
                <span className="inline-block rounded-full border border-[rgba(184,134,11,0.4)] bg-[rgba(184,134,11,0.14)] px-2.5 py-1 font-mono text-[11.5px] tracking-[0.02em] text-[var(--color-gold-bright)]">Draft bail application</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="border-b border-[var(--color-border)] py-[96px]">
        <div className="mx-auto max-w-[1180px] px-8">
          <div className="mb-[56px] max-w-[560px]">
            <div className="flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-3.5 before:bg-[var(--color-gold-bright)]">
              Process
            </div>
            <h2 className="mt-4 font-heading text-[34px] font-[560]">From confusion to a clear next step.</h2>
            <p className="mt-3.5 text-[15.5px] text-[#C9C0B4]">Three stages, the same order every document goes through — nothing skipped, nothing assumed.</p>
          </div>
          <div className="grid grid-cols-1 gap-px border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-3">
            <div className="bg-[var(--color-background)] px-8 py-9">
              <div className="font-mono text-[12px] tracking-[0.05em] text-[var(--color-gold)]">01 — Upload</div>
              <h3 className="my-3.5 font-heading text-[21px] font-medium">Share the document</h3>
              <p className="text-[14.5px] text-[var(--color-text-secondary)]">Photograph or upload the FIR, notice, or chargesheet. No formatting or typing required.</p>
            </div>
            <div className="bg-[var(--color-background)] px-8 py-9">
              <div className="font-mono text-[12px] tracking-[0.05em] text-[var(--color-gold)]">02 — Analyze</div>
              <h3 className="my-3.5 font-heading text-[21px] font-medium">Rules are applied</h3>
              <p className="text-[14.5px] text-[var(--color-text-secondary)]">Sections, deadlines, and bail eligibility are extracted and checked against actual criminal procedure — not guessed.</p>
            </div>
            <div className="bg-[var(--color-background)] px-8 py-9">
              <div className="font-mono text-[12px] tracking-[0.05em] text-[var(--color-gold)]">03 — Act</div>
              <h3 className="my-3.5 font-heading text-[21px] font-medium">Understand & act</h3>
              <p className="text-[14.5px] text-[var(--color-text-secondary)]">Read a plain-language summary of your rights, and download a drafted next step, like a bail application.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-b border-[var(--color-border)] py-[96px]">
        <div className="mx-auto max-w-[1180px] px-8">
          <div className="mb-[56px] max-w-[560px]">
            <div className="flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-3.5 before:bg-[var(--color-gold-bright)]">
              Not a chatbot
            </div>
            <h2 className="mt-4 font-heading text-[34px] font-[560]">Structured guidance, not a summary.</h2>
            <p className="mt-3.5 text-[15.5px] text-[#C9C0B4]">A generic assistant paraphrases text. Nyaya Mitra applies legal rules to it and tells you what to do next.</p>
          </div>
          <div className="grid grid-cols-1 gap-px border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2">
            <div className="bg-[var(--color-surface)] p-8 transition-colors hover:bg-[#1C1716]">
              <div className="mb-[18px] flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[var(--color-primary-hover)]">
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px] stroke-[var(--color-gold-bright)]">
                  <path d="M4 4h16v16H4z" stroke="none"/><path d="M6 8h12M6 12h12M6 16h8"/>
                </svg>
              </div>
              <h3 className="mb-2 font-heading text-[18px] font-medium">Plain-language explanation</h3>
              <p className="text-[14px] text-[var(--color-text-secondary)]">Every clause explained in English, Hindi, or Telugu — no legal degree required.</p>
            </div>
            <div className="bg-[var(--color-surface)] p-8 transition-colors hover:bg-[#1C1716]">
              <div className="mb-[18px] flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[var(--color-primary-hover)]">
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px] stroke-[var(--color-gold-bright)]">
                  <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>
                </svg>
              </div>
              <h3 className="mb-2 font-heading text-[18px] font-medium">Rights & deadlines</h3>
              <p className="text-[14px] text-[var(--color-text-secondary)]">Bail eligibility, statutory timelines, and what the law entitles you to — calculated, not paraphrased.</p>
            </div>
            <div className="bg-[var(--color-surface)] p-8 transition-colors hover:bg-[#1C1716]">
              <div className="mb-[18px] flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[var(--color-primary-hover)]">
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px] stroke-[var(--color-gold-bright)]">
                  <path d="M4 6h16M4 12h10M4 18h7"/>
                </svg>
              </div>
              <h3 className="mb-2 font-heading text-[18px] font-medium">Structured extraction</h3>
              <p className="text-[14px] text-[var(--color-text-secondary)]">Sections applied, IO name, court jurisdiction, and case status pulled into one clear dashboard.</p>
            </div>
            <div className="bg-[var(--color-surface)] p-8 transition-colors hover:bg-[#1C1716]">
              <div className="mb-[18px] flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[var(--color-primary-hover)]">
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px] stroke-[var(--color-gold-bright)]">
                  <path d="M12 3v12M6 9l6 6 6-6"/><path d="M5 21h14"/>
                </svg>
              </div>
              <h3 className="mb-2 font-heading text-[18px] font-medium">Draft documents</h3>
              <p className="text-[14px] text-[var(--color-text-secondary)]">A bail application or reply, pre-filled with your case details, ready to review with a lawyer or file.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Document Types */}
      <section id="documents" className="py-[96px] pb-8">
        <div className="mx-auto max-w-[1180px] px-8">
          <div className="mb-0 max-w-[560px]">
            <div className="flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-3.5 before:bg-[var(--color-gold-bright)]">
              Coverage
            </div>
            <h2 className="mt-4 font-heading text-[34px] font-[560]">Built for criminal documents first.</h2>
            <p className="mt-3.5 text-[15.5px] text-[#C9C0B4]">The MVP focuses where confusion is most costly. Everything else is on the way.</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            {['FIR', 'Chargesheet', 'Legal notice', 'Court summons'].map(doc => (
              <span key={doc} className="rounded-full border border-[var(--color-primary-hover)] bg-[rgba(122,31,43,0.1)] px-4 py-2 font-mono text-[13px] text-white">
                {doc}
              </span>
            ))}
            {['Rental agreements', 'Employment contracts', 'Loan & bank notices', 'Tax notices'].map(doc => (
              <span key={doc} className="rounded-full border border-[var(--color-border)] bg-transparent px-4 py-2 font-mono text-[13px] text-[var(--color-text-secondary)] after:opacity-70 after:content-['_\·_soon']">
                {doc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Band */}
      <section className="border-b border-[var(--color-border)] py-[64px]">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-10 px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap font-heading text-[26px] text-[#C9C0B4]">
            <span className="border-r border-[var(--color-border)] pr-5">English</span>
            <span className="border-r border-[var(--color-border)] px-5">हिंदी</span>
            <span className="pl-5">తెలుగు</span>
          </div>
          <div className="max-w-[340px] text-[13.5px] leading-[1.7] text-[var(--color-text-secondary)]">
            <strong className="font-medium text-[#C9C0B4]">Nyaya Mitra gives information, not legal advice. </strong>
            For representation, we point you to verified legal aid clinics and NALSA resources.
          </div>
        </div>
      </section>
    </div>
  );
}
