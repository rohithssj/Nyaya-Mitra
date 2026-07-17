import { Link, useParams } from 'react-router-dom'
import { mockDraft } from '@/lib/mockData'

export function DraftPage() {
  const { documentId } = useParams()
  const draft = mockDraft[documentId as keyof typeof mockDraft] || mockDraft['mock-doc-123']

  return (
    <div className="w-full pb-[60px] pt-[40px]">
      <div className="mx-auto w-full max-w-[1080px] px-7">
        <div className="mb-[26px] flex flex-wrap items-center justify-between gap-3.5">
          <div>
            <div className="mb-2 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
              Generated draft
            </div>
            <h1 className="font-heading text-[22px] font-[560]">Bail Application</h1>
          </div>
          <div className="flex gap-2.5">
            <button className="inline-flex items-center gap-2 rounded-[3px] border border-[var(--color-line)] bg-transparent px-[18px] py-[10px] font-sans text-[14px] font-medium text-[#C9C0B4] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold-bright)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px]">
                <path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>
              </svg>
              Print
            </button>
            <button className="inline-flex items-center gap-2 rounded-[3px] border border-[rgba(184,134,11,0.45)] bg-[rgba(184,134,11,0.14)] px-[18px] py-[10px] font-sans text-[14px] font-medium text-[var(--color-gold-bright)] transition-colors hover:bg-[rgba(184,134,11,0.22)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px]">
                <path d="M12 3v13M7 9l5-5 5 5"/><path d="M5 21h14"/>
              </svg>
              Download PDF
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-[680px] rounded-[3px] bg-[#EFE7D8] p-[52px_56px] font-mono text-[13.5px] leading-[1.9] text-[#2A2422] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="mb-[26px] border-b-[1.5px] border-[var(--color-primary)] pb-4 text-center font-heading">
            <div className="text-[17px] font-[650] text-[#5A161F]">{draft.court}</div>
            <div className="mt-1 text-[11.5px] uppercase tracking-[0.04em] text-[#5c554c]">{draft.location}</div>
          </div>

          <p><strong>IN THE MATTER OF:</strong></p>
          <p className="my-[10px] mb-[20px]">State vs. <span className="border-b border-dotted border-[#8a8072] px-0.5 font-medium text-[#5A161F]">{draft.applicant}</span>, FIR No. <span className="border-b border-dotted border-[#8a8072] px-0.5 font-medium text-[#5A161F]">{draft.firNumber}</span>, {draft.section}</p>

          <p><strong>APPLICATION FOR BAIL</strong></p>
          <p className="mt-[14px]">
            The applicant, <span className="border-b border-dotted border-[#8a8072] px-0.5 font-medium text-[#5A161F]">{draft.applicant}</span>, respectfully submits that the
            offence alleged in the above FIR is bailable in nature. The applicant has been cooperative
            with the investigation and undertakes to comply with all conditions the Hon'ble Court may
            impose, including regular appearance and surrender of travel documents if required.
          </p>
          <p className="mt-[14px]">
            It is therefore prayed that this Hon'ble Court be pleased to grant bail to the applicant
            in connection with FIR No. <span className="border-b border-dotted border-[#8a8072] px-0.5 font-medium text-[#5A161F]">{draft.firNumber}</span>, in the interest of
            justice.
          </p>

          <div className="mt-[40px] flex justify-between text-[12px]">
            <div className="text-center">
              <div className="mb-1.5 w-[150px] border-t border-[#5c554c]"></div>
              Applicant
            </div>
            <div className="text-center">
              <div className="mb-1.5 w-[150px] border-t border-[#5c554c]"></div>
              Date: <span className="border-b border-dotted border-[#8a8072] px-0.5 font-medium text-[#5A161F]">{draft.date}</span>
            </div>
          </div>
        </div>

        <p className="mt-[22px] text-center text-[12.5px] text-[var(--color-text-secondary)]">
          This is a starting draft. <Link to="#" className="border-b border-[var(--color-gold-bright)] text-[var(--color-gold-bright)] hover:text-white">Review the bracketed fields</Link> before filing or sharing with a lawyer.
        </p>
      </div>
    </div>
  )
}
