import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button'

export function HowItWorksPage() {
  const steps = [
    {
      title: "Upload your legal document",
      desc: "Photograph or upload the FIR, notice, or chargesheet. No formatting required.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
          <path d="M12 3v13M7 9l5-5 5 5"/><path d="M5 21h14"/>
        </svg>
      )
    },
    {
      title: "OCR extracts the text",
      desc: "Our system converts images into readable text, capturing all details precisely.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
          <path d="M4 4h16v16H4z"/><path d="M4 8h16M4 16h16M8 4v16M16 4v16"/>
        </svg>
      )
    },
    {
      title: "AI identifies the document",
      desc: "We classify the document type to determine exactly which legal rules apply.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
          <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
        </svg>
      )
    },
    {
      title: "Rule Engine determines rights",
      desc: "Extracted facts are checked against the actual criminal procedure code to find deadlines and bail rules.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      )
    },
    {
      title: "Simple explanation is generated",
      desc: "Get a plain-language summary of your situation in English, Hindi, or Telugu.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
    {
      title: "You can ask questions",
      desc: "Have a specific concern? Ask our AI and get grounded, contextual answers.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
        </svg>
      )
    },
    {
      title: "Generate legal draft",
      desc: "We pre-fill a draft application (like a bail request) ready for your lawyer.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
        </svg>
      )
    }
  ]

  return (
    <div className="w-full">
      <section className="relative overflow-hidden border-b border-[var(--color-border)] py-[80px]">
        <div className="mx-auto max-w-[800px] px-8 text-center">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-3.5 before:bg-[var(--color-gold-bright)] after:h-px after:w-3.5 after:bg-[var(--color-gold-bright)]">
            Workflow
          </div>
          <h1 className="mb-4 font-heading text-[38px] font-[560] leading-[1.08] tracking-[-0.01em] md:text-[46px]">
            How Nyaya Mitra Works
          </h1>
          <p className="mx-auto max-w-[500px] text-[16px] text-[#C9C0B4]">
            From upload to legal draft. Every step is deterministic, transparent, and built to ensure you understand your rights.
          </p>
        </div>
      </section>

      <section className="py-[60px] pb-[100px]">
        <div className="mx-auto max-w-[640px] px-8">
          <div className="relative border-l border-dashed border-[var(--color-border)] pl-[34px]">
            {steps.map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i} 
                className="relative mb-14 last:mb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[54px] top-1 flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)] bg-[var(--color-background)]">
                  <div className="absolute inset-[3px] rounded-full border border-dashed border-[var(--color-primary-hover)] opacity-50"></div>
                  <span className="font-mono text-[13px] font-medium text-[var(--color-gold-bright)]">{i + 1}</span>
                </div>

                <div className="rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)] p-[26px] transition-colors hover:border-[var(--color-gold)] hover:bg-[#1C1716]">
                  <div className="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[var(--color-primary-hover)] bg-[rgba(122,31,43,0.16)] text-[var(--color-gold-bright)]">
                    {step.icon}
                  </div>
                  <h3 className="mb-2 font-heading text-[20px] font-[560]">{step.title}</h3>
                  <p className="text-[14.5px] leading-[1.65] text-[var(--color-text-secondary)]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-[60px] text-center">
            <Button asChild size="lg" className="rounded-[3px] px-8 py-[14px]">
              <Link to="/upload">Upload Document Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
