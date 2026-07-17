import { Card } from '@/components/common/Card'
import type { RightsResult } from '@/lib/services/DocumentStore'

export function RightsCard({ rights }: { rights?: RightsResult }) {
  if (!rights) {
    return (
      <Card className="mb-7 p-[26px]" id="rights-section">
        <div className="mb-3.5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
          🛡 Your Rights & Next Steps
        </div>
        <div className="italic text-[var(--color-text-secondary)]">Unable to generate guidance for this document.</div>
      </Card>
    )
  }

  return (
    <Card className="mb-7 p-[26px]" id="rights-section">
      <div className="mb-6 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
        🛡 Your Rights & Next Steps
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="mb-3 font-mono text-[13px] uppercase tracking-wider text-[var(--color-text-secondary)]">Your Rights</h3>
          <p className="font-sans text-[15px] leading-relaxed text-[#F5F5F5]">
            <span className="text-[var(--color-gold-bright)] mr-2">✓</span>
            {rights.rightsSummary}
          </p>
        </div>

        {rights.nextSteps && rights.nextSteps.length > 0 && (
          <div>
            <h3 className="mb-3 font-mono text-[13px] uppercase tracking-wider text-[var(--color-text-secondary)]">Next Steps</h3>
            <div className="grid gap-3">
              {rights.nextSteps.map((step, idx) => (
                <div key={idx} className="flex gap-3 p-3 rounded border border-[var(--color-border)] bg-black/20">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-bright)] text-black font-bold text-xs">{idx + 1}</div>
                  <p className="text-[14.5px] text-[#C9C0B4]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {rights.documentsToKeep && rights.documentsToKeep.length > 0 && (
          <div>
            <h3 className="mb-3 font-mono text-[13px] uppercase tracking-wider text-[var(--color-text-secondary)]">Documents To Keep</h3>
            <ul className="space-y-2">
              {rights.documentsToKeep.map((doc, idx) => (
                <li key={idx} className="flex gap-2 text-[14.5px] text-[#C9C0B4]">
                  <span>📄</span> <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {rights.warnings && rights.warnings.length > 0 && (
          <div>
            <h3 className="mb-3 font-mono text-[13px] uppercase tracking-wider text-[var(--color-text-secondary)]">Warnings</h3>
            <ul className="space-y-2">
              {rights.warnings.map((warning, idx) => (
                <li key={idx} className="flex gap-2 text-[14.5px] text-[#B8860B]">
                  <span>⚠</span> <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  )
}
