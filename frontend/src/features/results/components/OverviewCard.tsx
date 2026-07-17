import type { Document } from '@/lib/services/DocumentStore'

export function OverviewCard({ doc }: { doc: Document }) {
  const ocr = doc.ocr || { language: 'Unknown' }
  
  return (
    <div className="mb-7" id="overview-section">
      <div className="flex items-center gap-3.5 mb-6">
         <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)]">
          <div className="absolute inset-[5px] rounded-full border border-dashed border-[var(--color-primary-hover)] opacity-70"></div>
          <div className="h-[9px] w-[9px] rounded-full bg-[var(--color-gold)]"></div>
        </div>
        <div>
          <h1 className="font-heading text-2xl font-[560]">{doc.fileName}</h1>
          <div className="mt-1 font-mono text-[12px] text-[var(--color-text-secondary)]">
            {ocr.language} • Document Overview
          </div>
        </div>
      </div>
    </div>
  )
}
