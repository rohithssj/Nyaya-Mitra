import { Link, useParams, Navigate } from 'react-router-dom'
import { DocumentStore } from '@/lib/services/DocumentStore'

import { DashboardSidebar } from '../components/DashboardSidebar'
import { OverviewCard } from '../components/OverviewCard'
import { QuickStatsCard } from '../components/QuickStatsCard'
import { SummaryCard } from '../components/SummaryCard'
import { TimelineCard } from '../components/TimelineCard'
import { RightsCard } from '../components/RightsCard'
import { ExtractedInfoCard } from '../components/ExtractedInfoCard'
import { LegalAnalysisCard } from '../components/LegalAnalysisCard'
import { OCRTextCard } from '../components/OCRTextCard'
import { ExportCard } from '../components/ExportCard'
import { DeveloperPanel } from '../components/DeveloperPanel'
import { PrintableReport } from '../components/PrintableReport'

export function ResultsPage() {
  const { documentId } = useParams()
  console.log('[DEBUG Frontend] 8. ResultsPage rendered for doc:', documentId)
  
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

  return (
    <div className="w-full pb-[60px] pt-[40px]">
      
      {/* Printable Report (hidden on screen) */}
      <PrintableReport doc={doc} />

      {/* Screen Dashboard (hidden on print) */}
      <div className="mx-auto w-full max-w-[1200px] px-7 flex gap-10 print:hidden">
        
        <DashboardSidebar />

        <div className="flex-1 min-w-0">
          <OverviewCard doc={doc} />
          
          <QuickStatsCard doc={doc} />

          <SummaryCard summary={doc.summary} />

          <TimelineCard timeline={doc.timeline} />

          <RightsCard rights={doc.rights} />

          <ExtractedInfoCard ext={doc.extraction} />

          <LegalAnalysisCard re={doc.ruleEngine} />

          <OCRTextCard rawText={doc.ocr?.rawText || 'Not Available'} />

          <ExportCard doc={doc} />

          <DeveloperPanel doc={doc} />
        </div>

      </div>
    </div>
  )
}
