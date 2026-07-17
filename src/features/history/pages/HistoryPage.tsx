import * as React from 'react'
import { Link } from 'react-router-dom'
import { mockHistory } from '@/lib/mockData'
import { Button } from '@/components/common/Button'

export function HistoryPage() {
  const [history] = React.useState(mockHistory)

  return (
    <div className="w-full pb-[80px] pt-[40px]">
      <div className="mx-auto w-full max-w-[1080px] px-7">
        <div className="mb-[34px] flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-[560]">Upload History</h1>
            <div className="mt-1 font-mono text-[13px] text-[var(--color-text-secondary)]">Your previously analyzed documents</div>
          </div>
          <Button asChild className="hidden rounded-[3px] border border-[var(--color-primary-hover)] bg-[rgba(122,31,43,0.1)] text-[var(--color-ivory)] hover:bg-[rgba(122,31,43,0.2)] md:flex">
            <Link to="/upload">New Upload</Link>
          </Button>
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)] py-[80px] text-center">
            <div className="mb-[18px] flex h-[64px] w-[64px] items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-bg-elevated)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[28px] w-[28px] text-[var(--color-gold-bright)]">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>
            <h3 className="mb-2 font-heading text-[20px] font-[560]">No uploads yet</h3>
            <p className="mb-6 max-w-[300px] text-[14.5px] text-[var(--color-text-secondary)]">Upload your first legal document to begin understanding your rights.</p>
            <Button asChild className="rounded-[3px]">
              <Link to="/upload">Upload Document</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {history.map((doc) => (
              <div key={doc.id} className="flex flex-col justify-between gap-5 rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)] p-[24px] transition-colors hover:border-[var(--color-gold)] hover:bg-[#1C1716] md:flex-row md:items-center">
                <div className="flex items-center gap-5">
                  <div className="hidden h-[48px] w-[48px] items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)] bg-[var(--color-background)] sm:flex">
                    <div className="h-[6px] w-[6px] rounded-full bg-[var(--color-gold)]"></div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-[17px] font-[560] text-[var(--color-ivory)]">{doc.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-[var(--color-text-secondary)]">
                      <span className="text-[var(--color-gold-bright)]">{doc.type}</span>
                      <span className="h-[3px] w-[3px] rounded-full bg-[var(--color-line)]"></span>
                      <span>{new Date(doc.date).toLocaleDateString()}</span>
                      <span className="h-[3px] w-[3px] rounded-full bg-[var(--color-line)]"></span>
                      <span>{doc.jurisdiction}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button asChild variant="ghost" className="rounded-[3px] px-4 py-[8px] text-[13.5px]">
                    <Link to={`/results/${doc.id}`}>View Results</Link>
                  </Button>
                  <Button asChild className="rounded-[3px] border border-[rgba(184,134,11,0.45)] bg-[rgba(184,134,11,0.14)] px-4 py-[8px] text-[13.5px] text-[var(--color-gold-bright)] hover:bg-[rgba(184,134,11,0.22)]">
                    <Link to={`/draft/${doc.id}`}>Generate Draft</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
