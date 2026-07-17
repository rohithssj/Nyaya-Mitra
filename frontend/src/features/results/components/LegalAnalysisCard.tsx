import { Card } from '@/components/common/Card'
import type { RuleEngineResult } from '@/lib/services/DocumentStore'

export function LegalAnalysisCard({ re }: { re?: RuleEngineResult }) {
  return (
    <Card className="mb-7 p-[26px]" id="analysis-section">
      <div className="mb-5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
        ⚖ Legal Analysis
      </div>
      
      {re && (re.sections.length > 0 || re.facts.length > 0) ? (
        <div className="space-y-6">
          {re.sections.length > 0 && (
            <div>
              <h3 className="mb-2 font-mono text-[13px] uppercase tracking-wider text-[var(--color-text-secondary)]">Rules Applied</h3>
              <div className="flex flex-wrap gap-2">
                {re.sections.map(sec => (
                  <span key={sec} className="rounded-full border border-[var(--color-border)] bg-black/20 px-3 py-1 font-mono text-[13px] text-[#F5F5F5]">
                    {sec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {re.facts.length > 0 && (
            <div>
              <h3 className="mb-2 flex items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-[var(--color-text-secondary)]">
                <span>📜</span> Legal Facts
              </h3>
              <ul className="list-inside list-none space-y-2 text-[14.5px] text-[#C9C0B4]">
                {re.facts.map((fact, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--color-text-secondary)] mt-0.5">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-start gap-3 p-4 rounded bg-[rgba(122,31,43,0.16)] border border-[var(--color-primary-hover)]">
          <span className="text-[var(--color-gold-bright)]">ℹ</span>
          <p className="text-[14.5px] text-[#C9C0B4] leading-relaxed">
            No legal sections or applicable document rules were detected in this document. Rule-based legal analysis is not applicable for this document type.
          </p>
        </div>
      )}
    </Card>
  )
}
