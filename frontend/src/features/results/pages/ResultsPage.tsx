import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Card } from '@/components/common/Card'
import { DocumentStore } from '@/lib/services/DocumentStore'

export function ResultsPage() {
  const { documentId } = useParams()
  console.log('[DEBUG Frontend] 8. ResultsPage rendered for doc:', documentId)
  
  const [showDeveloperPanel, setShowDeveloperPanel] = useState(false)
  
  if (!documentId) {
    console.log('[DEBUG Frontend] No documentId, redirecting to /upload')
    return <Navigate to="/upload" />
  }
  
  const doc = DocumentStore.getDocument(documentId)
  console.log('[DEBUG Frontend] 8.1 Retrieved doc from store:', doc)

  if (!doc) {
    console.warn('[DEBUG Frontend] Document not found in store!')
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
  
  const ext = doc.extraction;
  const re = doc.ruleEngine;
  const summary = doc.summary;
  const timeline = doc.timeline;

  return (
    <div className="w-full pb-[60px] pt-[40px]">
      <div className="mx-auto w-full max-w-[1080px] px-7">
        
        {/* 1. Document Overview */}
        <div className="mb-7">
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-[20px] rounded border border-[var(--color-border)] bg-black/20">
            <div>
              <div className="font-mono text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Type</div>
              <div className="text-[14px] text-[#F5F5F5]">{ext?.documentType || doc.classification?.type || 'Unknown'}</div>
            </div>
            <div>
              <div className="font-mono text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Confidence</div>
              <div className="text-[14px] text-[#F5F5F5]">{(doc.classification?.confidence || ocr.confidence * 100).toFixed(1)}%</div>
            </div>
            {ext?.court && (
              <div>
                <div className="font-mono text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Court</div>
                <div className="text-[14px] text-[#F5F5F5]">{ext.court}</div>
              </div>
            )}
            {ext?.caseNumber && (
              <div>
                <div className="font-mono text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Case Number</div>
                <div className="text-[14px] text-[#F5F5F5]">{ext.caseNumber}</div>
              </div>
            )}
            {ext?.dates && ext.dates.length > 0 && (
              <div>
                <div className="font-mono text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Date</div>
                <div className="text-[14px] text-[#F5F5F5]">{ext.dates[0].value}</div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Plain Language Summary */}
        <Card className="mb-7 p-[26px]">
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

        {/* 3. Legal Timeline */}
        <Card className="mb-7 p-[26px]">
          <div className="mb-6 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
            📅 Legal Timeline
          </div>
          
          {timeline && timeline.events.length > 0 ? (
            <div className="relative ml-3 border-l border-[var(--color-border)] pl-6 space-y-8">
              {timeline.events.map((event, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-[2px] border-[var(--color-surface)] bg-[var(--color-gold-bright)]"></div>
                  
                  {event.date && (
                    <div className="mb-1 font-mono text-[11.5px] uppercase tracking-wider text-[var(--color-gold-bright)]">
                      {event.date}
                    </div>
                  )}
                  <h3 className="mb-1.5 font-sans text-[16px] font-semibold text-[#F5F5F5]">
                    {event.title}
                  </h3>
                  <p className="font-sans text-[14.5px] leading-relaxed text-[#C9C0B4]">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="italic text-[var(--color-text-secondary)]">
              No timeline available for this document.
            </div>
          )}
        </Card>

        {/* 4. Extracted Information */}
        {ext && (
          <Card className="mb-7 p-[26px]">
            <div className="mb-5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
              Extracted Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              {ext.complainant && (
                <div>
                  <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Complainant</h3>
                  <div className="text-[14.5px] text-[#C9C0B4]">{ext.complainant}</div>
                </div>
              )}
              {ext.accused && (
                <div>
                  <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Accused</h3>
                  <div className="text-[14.5px] text-[#C9C0B4]">{ext.accused}</div>
                </div>
              )}
              {ext.policeStation && (
                <div>
                  <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Police Station</h3>
                  <div className="text-[14.5px] text-[#C9C0B4]">{ext.policeStation}</div>
                </div>
              )}
              {ext.firNumber && (
                <div>
                  <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">FIR Number</h3>
                  <div className="text-[14.5px] text-[#C9C0B4]">{ext.firNumber}</div>
                </div>
              )}
              {ext.addresses && ext.addresses.length > 0 && (
                <div>
                  <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Addresses</h3>
                  <ul className="list-inside list-disc text-[14.5px] text-[#C9C0B4]">
                    {ext.addresses.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              )}
              {ext.importantPersons && ext.importantPersons.length > 0 && (
                <div>
                  <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Important Persons</h3>
                  <ul className="list-inside list-disc text-[14.5px] text-[#C9C0B4]">
                    {ext.importantPersons.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              )}
              {ext.importantOrganizations && ext.importantOrganizations.length > 0 && (
                <div>
                  <h3 className="mb-1 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Organizations</h3>
                  <ul className="list-inside list-disc text-[14.5px] text-[#C9C0B4]">
                    {ext.importantOrganizations.map((o, i) => <li key={i}>{o}</li>)}
                  </ul>
                </div>
              )}
              {ext.acts && ext.acts.length > 0 && (
                <div>
                  <h3 className="mb-2 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Acts</h3>
                  <div className="flex flex-wrap gap-2">
                    {ext.acts.map((act, i) => (
                      <span key={i} className="rounded-full border border-[var(--color-border)] bg-black/20 px-3 py-1 font-mono text-[12px] text-[#F5F5F5]">{act}</span>
                    ))}
                  </div>
                </div>
              )}
              {ext.sections && ext.sections.length > 0 && (
                <div>
                  <h3 className="mb-2 font-mono text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)]">Sections</h3>
                  <div className="flex flex-wrap gap-2">
                    {ext.sections.map((sec, i) => (
                      <span key={i} className="rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1 font-mono text-[12px] text-[var(--color-gold-bright)]">{sec}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* 5. Legal Analysis (Rule Engine) */}
        <Card className="mb-7 p-[26px]">
          <div className="mb-5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
            Legal Analysis (Rule Engine)
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

              {re.rights.length > 0 && (
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-[var(--color-text-secondary)]">
                    <span>✓</span> Your Rights
                  </h3>
                  <ul className="list-inside list-none space-y-2 text-[14.5px] text-[#C9C0B4]">
                    {re.rights.map((right, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[var(--color-gold-bright)] mt-0.5">✓</span>
                        <span>{right}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {re.deadlines.length > 0 && (
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-[var(--color-text-secondary)]">
                    <span>🕒</span> Important Deadlines
                  </h3>
                  <ul className="list-inside list-none space-y-2 text-[14.5px] text-red-300">
                    {re.deadlines.map((deadline, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-red-400 mt-0.5">🕒</span>
                        <span>{deadline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {re.warnings.length > 0 && (
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-[var(--color-text-secondary)]">
                    <span>⚠</span> Warnings
                  </h3>
                  <ul className="list-inside list-none space-y-2 text-[14.5px] text-[#B8860B]">
                    {re.warnings.map((warning, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#B8860B] mt-0.5">⚠</span>
                        <span>{warning}</span>
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

        {/* 6. Plain OCR Text */}
        <Card className="mb-7 p-[26px]">
          <div className="mb-3.5 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
            Extracted Text
          </div>
          <div className="whitespace-pre-wrap font-sans text-[15px] leading-[1.75] text-[#C9C0B4] max-h-[400px] overflow-y-auto">
            {ocr.rawText === 'Not Available' ? (
              <span className="italic text-[var(--color-text-secondary)]">No text could be extracted from this document.</span>
            ) : (
              ocr.rawText
            )}
          </div>
        </Card>

        {/* 7. Developer Debug Panel */}
        <div className="mt-12 rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)]">
          <button 
            className="flex w-full items-center justify-between p-4 font-mono text-[12px] uppercase tracking-wider text-[var(--color-gold-bright)] hover:bg-black/20"
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
                {JSON.stringify(ocr.fullResponse, null, 2) || 'No raw response available'}
              </div>

              <div className="mb-2"><strong>Raw Extraction Response:</strong></div>
              <div className="max-h-[200px] overflow-y-auto whitespace-pre-wrap rounded bg-black/40 p-2 text-[#C9C0B4]">
                {JSON.stringify(doc.extraction, null, 2) || 'No extraction available'}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
