import { Card } from '@/components/common/Card'

export function ExportCard() {
  return (
    <Card className="mb-7 p-[26px]" id="export-section">
      <div className="mb-5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
        📤 Export
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="rounded border border-[var(--color-border)] bg-black/20 p-3 text-sm text-[#F5F5F5] hover:bg-[var(--color-primary-hover)] transition-colors">
          Download JSON
        </button>
        <button className="rounded border border-[var(--color-border)] bg-black/20 p-3 text-sm text-[#F5F5F5] hover:bg-[var(--color-primary-hover)] transition-colors">
          Download Summary
        </button>
        <button className="rounded border border-[var(--color-border)] bg-black/20 p-3 text-sm text-[#F5F5F5] hover:bg-[var(--color-primary-hover)] transition-colors">
          Copy Summary
        </button>
        <button className="rounded border border-[var(--color-border)] bg-black/20 p-3 text-sm text-[#F5F5F5] hover:bg-[var(--color-primary-hover)] transition-colors">
          Print Report
        </button>
      </div>
    </Card>
  )
}
