import { useState } from 'react'
import type { Document } from '@/lib/services/DocumentStore'

export function DeveloperPanel({ doc }: { doc: Document }) {
  const [showDeveloperPanel, setShowDeveloperPanel] = useState(false)
  const ocr = doc.ocr || { language: 'Unknown', confidence: 0, processingTime: 0, fullResponse: null, rawText: '' }

  return (
    <div className="mt-12 rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)]" id="developer-section">
      <button 
        className="flex w-full items-center justify-between p-4 font-mono text-[12px] uppercase tracking-wider text-[var(--color-gold-bright)] hover:bg-black/20 transition-colors"
        onClick={() => setShowDeveloperPanel(!showDeveloperPanel)}
      >
        <span>Developer Panel - Debug Data</span>
        <span>{showDeveloperPanel ? 'Collapse ▲' : 'Expand ▼'}</span>
      </button>
      
      {showDeveloperPanel && (
        <div className="border-t border-[var(--color-border)] p-4 font-mono text-[11px] text-[var(--color-text-secondary)]">
          <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div><strong>Document ID:</strong> <br/>{doc.id}</div>
            <div><strong>File Name:</strong> <br/>{doc.fileName}</div>
            <div><strong>Language:</strong> <br/>{ocr.language}</div>
            <div><strong>OCR Confidence:</strong> <br/>{(ocr.confidence * 100).toFixed(1)}%</div>
            <div><strong>Classification Confidence:</strong> <br/>{(doc.classification?.confidence || 0).toFixed(2)}</div>
            <div><strong>Processing Time:</strong> <br/>{ocr.processingTime}ms</div>
            <div><strong>Characters:</strong> <br/>{ocr.rawText.length}</div>
            <div><strong>Words:</strong> <br/>{ocr.rawText.split(/\s+/).length}</div>
          </div>
          
          <div className="mb-2"><strong>Raw OCR Response (JSON):</strong></div>
          <div className="mb-4 max-h-[200px] overflow-y-auto whitespace-pre-wrap rounded bg-black/40 p-2 text-[#C9C0B4]">
            {JSON.stringify(doc.ocr, null, 2) || 'No raw response available'}
          </div>

          <div className="mb-2"><strong>Raw Extraction Response:</strong></div>
          <div className="mb-4 max-h-[200px] overflow-y-auto whitespace-pre-wrap rounded bg-black/40 p-2 text-[#C9C0B4]">
            {JSON.stringify(doc.extraction, null, 2) || 'No extraction available'}
          </div>
          
          <div className="mb-2"><strong>Raw Rights Response:</strong></div>
          <div className="max-h-[200px] overflow-y-auto whitespace-pre-wrap rounded bg-black/40 p-2 text-[#C9C0B4]">
            {JSON.stringify(doc.rights, null, 2) || 'No rights available'}
          </div>
        </div>
      )}
    </div>
  )
}
