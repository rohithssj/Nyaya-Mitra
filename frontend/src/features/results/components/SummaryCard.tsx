import { Card } from '@/components/common/Card'

export function SummaryCard({ summary }: { summary?: string }) {
  return (
    <Card className="mb-7 p-[26px]" id="summary-section">
      <div className="mb-3.5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
        📝 Plain Language Summary
      </div>
      <div className="font-sans text-[15.5px] leading-[1.8] text-[#F5F5F5] max-w-[850px]">
        {summary ? (
          <p>{summary}</p>
        ) : (
          <p className="italic text-[var(--color-text-secondary)]">Summary could not be generated.</p>
        )}
      </div>
    </Card>
  )
}
