import { useState } from 'react'
import { Card } from '@/components/common/Card'
import type { Document } from '@/lib/services/DocumentStore'
import { ExportService } from '@/lib/services/ExportService'

export function ExportCard({ doc }: { doc: Document }) {
  const [downloadingJSON, setDownloadingJSON] = useState(false)
  const [downloadingSummary, setDownloadingSummary] = useState(false)
  const [copying, setCopying] = useState(false)
  const [printing, setPrinting] = useState(false)

  const handleDownloadJSON = () => {
    setDownloadingJSON(true)
    ExportService.downloadJSON(doc)
    setTimeout(() => setDownloadingJSON(false), 2000)
  }

  const handleDownloadSummary = () => {
    setDownloadingSummary(true)
    ExportService.downloadSummary(doc)
    setTimeout(() => setDownloadingSummary(false), 2000)
  }

  const handleCopySummary = async () => {
    setCopying(true)
    const success = await ExportService.copySummary(doc)
    if (!success) {
      alert('Unable to copy to clipboard.')
    }
    setTimeout(() => setCopying(false), 2000)
  }

  const handlePrint = () => {
    setPrinting(true)
    // Small delay to allow the "Opening Print Dialog..." text to render before blocking the main thread
    setTimeout(() => {
      ExportService.printReport()
      setPrinting(false)
    }, 300)
  }

  return (
    <Card className="mb-7 p-[26px]" id="export-section">
      <div className="mb-5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
        📤 Export
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={handleDownloadJSON}
          disabled={downloadingJSON}
          className="rounded border border-[var(--color-border)] bg-black/20 p-3 text-sm text-[#F5F5F5] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {downloadingJSON ? '✓ JSON Downloaded' : 'Download JSON'}
        </button>
        <button 
          onClick={handleDownloadSummary}
          disabled={downloadingSummary}
          className="rounded border border-[var(--color-border)] bg-black/20 p-3 text-sm text-[#F5F5F5] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {downloadingSummary ? '✓ Summary Downloaded' : 'Download Summary'}
        </button>
        <button 
          onClick={handleCopySummary}
          disabled={copying}
          className="rounded border border-[var(--color-border)] bg-black/20 p-3 text-sm text-[#F5F5F5] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copying ? '✓ Copied to Clipboard' : 'Copy Summary'}
        </button>
        <button 
          onClick={handlePrint}
          disabled={printing}
          className="rounded border border-[var(--color-border)] bg-black/20 p-3 text-sm text-[#F5F5F5] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {printing ? 'Opening Print Dialog...' : 'Print Report'}
        </button>
      </div>
    </Card>
  )
}
