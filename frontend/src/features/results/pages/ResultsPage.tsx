import { Link, useParams, Navigate } from 'react-router-dom'
import { DocumentStore } from '@/lib/services/DocumentStore'

import { OverviewCard } from '../components/OverviewCard'
import { SummaryCard } from '../components/SummaryCard'
import { TimelineCard } from '../components/TimelineCard'
import { RightsCard } from '../components/RightsCard'
import { ExtractedInfoCard } from '../components/ExtractedInfoCard'
import { LegalAnalysisCard } from '../components/LegalAnalysisCard'
import { OCRTextCard } from '../components/OCRTextCard'
import { ExportCard } from '../components/ExportCard'
import { DeveloperPanel } from '../components/DeveloperPanel'
import { PrintableReport } from '../components/PrintableReport'
import { KeyFactsCard } from '../components/KeyFactsCard'
import { QuickStatsCard } from '../components/QuickStatsCard'
import { ChatAssistant } from '../../chat/ChatAssistant'
import { DraftGenerator } from '../../draft/DraftGenerator'

export function ResultsPage() {
  const { documentId } = useParams()
  
  if (!documentId) {
    return <Navigate to="/" replace />
  }

  const doc = DocumentStore.getDocument(documentId)
  
  if (!doc) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
        <h2 className="mb-4 text-2xl text-[var(--color-text-primary)]">Document Not Found</h2>
        <p className="mb-6 text-[var(--color-text-secondary)]">The requested document session has expired or does not exist.</p>
        <Link to="/" className="text-[var(--color-gold-bright)] hover:underline">
          Return to Upload
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full pb-[60px] pt-[40px]">
      
      {/* Printable Report (hidden on screen) */}
      <PrintableReport doc={doc} />

      {/* Screen Dashboard (hidden on print) */}
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-7 print:hidden">
        
        {/* Navigation / Header */}
        <div className="mb-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-white transition-colors">
            ← Back to Upload
          </Link>
        </div>

        {/* 2-Column SaaS Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN (~65%) */}
          <div className="lg:col-span-8 space-y-6">
            <OverviewCard doc={doc} />
            <SummaryCard summary={doc.summary} />
            <TimelineCard timeline={doc.timeline} />
            <RightsCard rights={doc.rights} />
            <DraftGenerator doc={doc} />
            
            <div className="pt-10 space-y-6 border-t border-[var(--color-border)]">
              <h2 className="text-xl font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Technical Details</h2>
              <ExtractedInfoCard ext={doc.extraction} />
              <LegalAnalysisCard re={doc.ruleEngine} />
              <OCRTextCard rawText={doc.ocr?.rawText || 'Not Available'} />
            </div>
          </div>

          {/* RIGHT COLUMN (~35%) - Sticky on Desktop */}
          <div className="lg:col-span-4 lg:sticky lg:top-[40px] lg:max-h-[calc(100vh-80px)] lg:overflow-y-auto lg:pr-2 space-y-6 custom-scrollbar">
            <KeyFactsCard doc={doc} />
            <QuickStatsCard doc={doc} />
            <ChatAssistant doc={doc} />
            <ExportCard doc={doc} />
            <DeveloperPanel doc={doc} />
          </div>

        </div>
      </div>
    </div>
  )
}
