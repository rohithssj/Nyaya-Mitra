import { Card } from '@/components/common/Card'
import type { ExtractionResult } from '@/lib/services/DocumentStore'

export function ExtractedInfoCard({ ext }: { ext?: ExtractionResult }) {
  if (!ext) return null;

  return (
    <Card className="mb-7 p-[26px]" id="extraction-section">
      <div className="mb-5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
        🔍 Extracted Information
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
        {ext.complainant && (
          <div>
            <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Complainant</h3>
            <div className="text-[14.5px] text-[#C9C0B4]">{ext.complainant}</div>
          </div>
        )}
        {ext.accused && (
          <div>
            <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Accused</h3>
            <div className="text-[14.5px] text-[#C9C0B4]">{ext.accused}</div>
          </div>
        )}
        {ext.policeStation && (
          <div>
            <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Police Station</h3>
            <div className="text-[14.5px] text-[#C9C0B4]">{ext.policeStation}</div>
          </div>
        )}
        {ext.firNumber && (
          <div>
            <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">FIR Number</h3>
            <div className="text-[14.5px] text-[#C9C0B4]">{ext.firNumber}</div>
          </div>
        )}
        {ext.addresses && ext.addresses.length > 0 && (
          <div>
            <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Addresses</h3>
            <ul className="list-inside list-disc text-[14.5px] text-[#C9C0B4]">
              {ext.addresses.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        )}
        {ext.importantPersons && ext.importantPersons.length > 0 && (
          <div>
            <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Important Persons</h3>
            <ul className="list-inside list-disc text-[14.5px] text-[#C9C0B4]">
              {ext.importantPersons.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        )}
        {ext.importantOrganizations && ext.importantOrganizations.length > 0 && (
          <div>
            <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Organizations</h3>
            <ul className="list-inside list-disc text-[14.5px] text-[#C9C0B4]">
              {ext.importantOrganizations.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </div>
        )}
        {ext.acts && ext.acts.length > 0 && (
          <div>
            <h3 className="mb-2 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Acts</h3>
            <div className="flex flex-wrap gap-2">
              {ext.acts.map((act, i) => (
                <span key={i} className="rounded-full border border-[var(--color-border)] bg-black/20 px-3 py-1 font-mono text-[12px] text-[#F5F5F5]">{act}</span>
              ))}
            </div>
          </div>
        )}
        {ext.sections && ext.sections.length > 0 && (
          <div>
            <h3 className="mb-2 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Sections</h3>
            <div className="flex flex-wrap gap-2">
              {ext.sections.map((sec, i) => (
                <span key={i} className="rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1 font-mono text-[12px] text-[var(--color-gold-bright)]">{sec}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
