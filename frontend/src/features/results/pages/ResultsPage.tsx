import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Card } from '@/components/common/Card'
import { DocumentStore } from '@/lib/services/DocumentStore'

export function ResultsPage() {
  const { documentId } = useParams()
  const [showDeveloperPanel, setShowDeveloperPanel] = useState(false)
  
  if (!documentId) return <Navigate to="/upload" />
  const doc = DocumentStore.getDocument(documentId)

  if (!doc) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <h2>Document not found.</h2>
        <Link to="/upload" className="ml-4 text-[var(--color-gold-bright)] underline">Upload again</Link>
      </div>
    )
  }

  const ocr = doc.ocr || {
    rawText: 'Not Available',
    language: 'Unknown',
    confidence: 0,
    pageCount: 1,
    processingTime: 0,
    fullResponse: null
  }

  return (
    <div className="w-full pb-[60px] pt-[40px]">
      <div className="mx-auto w-full max-w-[1080px] px-7">
        
        {/* Developer Debug Panel */}
        <div className="mb-6 rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)]">
          <button 
            className="flex w-full items-center justify-between p-4 font-mono text-[12px] uppercase tracking-wider text-[var(--color-gold-bright)] hover:bg-black/20"
            onClick={() => setShowDeveloperPanel(!showDeveloperPanel)}
          >
            <span>Developer Panel - OCR Debug Data</span>
            <span>{showDeveloperPanel ? 'Collapse ▲' : 'Expand ▼'}</span>
          </button>
          
          {showDeveloperPanel && (
            <div className="border-t border-[var(--color-border)] p-4 font-mono text-[11px] text-[var(--color-text-secondary)]">
              <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div><strong>Document ID:</strong> <br/>{doc.id}</div>
                <div><strong>File Name:</strong> <br/>{doc.fileName}</div>
                <div><strong>Language:</strong> <br/>{ocr.language}</div>
                <div><strong>Confidence:</strong> <br/>{(ocr.confidence * 100).toFixed(1)}%</div>
                <div><strong>Page Count:</strong> <br/>{ocr.pageCount}</div>
                <div><strong>Processing Time:</strong> <br/>{ocr.processingTime}ms</div>
                <div><strong>Characters:</strong> <br/>{ocr.rawText.length}</div>
                <div><strong>Words:</strong> <br/>{ocr.rawText.split(/\s+/).length}</div>
              </div>
              
              <div className="mb-2"><strong>Raw OCR Response (JSON):</strong></div>
              <div className="max-h-[200px] overflow-y-auto whitespace-pre-wrap rounded bg-black/40 p-2 text-[#C9C0B4]">
                {JSON.stringify(ocr.fullResponse, null, 2) || 'No raw response available'}
              </div>
            </div>
          )}
        </div>

        {/* Public OCR Display */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
             <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)]">
              <div className="absolute inset-[5px] rounded-full border border-dashed border-[var(--color-primary-hover)] opacity-70"></div>
              <div className="h-[9px] w-[9px] rounded-full bg-[var(--color-gold)]"></div>
            </div>
            <div>
              <h1 className="font-heading text-2xl font-[560]">{doc.fileName}</h1>
              <div className="mt-1 font-mono text-[12px] text-[var(--color-text-secondary)]">
                {ocr.language} • {(ocr.confidence * 100).toFixed(1)}% Confidence
              </div>
            </div>
          </div>
        </div>

        <Card className="p-[26px]">
          <div className="mb-3.5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
            Extracted Text
          </div>
          <div className="whitespace-pre-wrap font-sans text-[15px] leading-[1.75] text-[#C9C0B4]">
            {ocr.rawText === 'Not Available' ? (
              <span className="italic text-[var(--color-text-secondary)]">No text could be extracted from this document.</span>
            ) : (
              ocr.rawText
            )}
          </div>
        </Card>

      </div>
    </div>
  )
}
