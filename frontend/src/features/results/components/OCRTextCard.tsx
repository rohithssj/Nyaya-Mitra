import { Card } from '@/components/common/Card'

export function OCRTextCard({ rawText }: { rawText: string }) {
  return (
    <Card className="mb-7 p-[26px]" id="ocr-section">
      <div className="mb-3.5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
        📜 Original OCR Text
      </div>
      <div className="whitespace-pre-wrap font-sans text-[15px] leading-[1.75] text-[#C9C0B4] max-h-[400px] overflow-y-auto">
        {rawText === 'Not Available' || !rawText ? (
          <span className="italic text-[var(--color-text-secondary)]">No text could be extracted from this document.</span>
        ) : (
          rawText
        )}
      </div>
    </Card>
  )
}
