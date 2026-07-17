import type { Document } from '@/lib/services/DocumentStore'

export function PrintableReport({ doc }: { doc: Document }) {
  const ext = doc.extraction
  const now = new Date().toLocaleString()

  return (
    <div className="hidden print:block text-black bg-white w-full max-w-none m-0 p-8 font-sans text-sm">
      <style>
        {`
          @page { margin: 2cm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
          .page-break { page-break-before: always; }
          .avoid-break { page-break-inside: avoid; }
        `}
      </style>

      {/* Header */}
      <div className="border-b-2 border-black pb-4 mb-8">
        <h1 className="text-3xl font-bold mb-2 uppercase tracking-wider">Nyaya Mitra</h1>
        <h2 className="text-xl text-gray-700 mb-4">AI Legal Analysis Report</h2>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div><strong>Generated:</strong> {now}</div>
          <div><strong>Document ID:</strong> {doc.id}</div>
          <div><strong>Processing Time:</strong> {doc.ocr ? (doc.ocr.processingTime / 1000).toFixed(1) + 's' : 'N/A'}</div>
          <div><strong>Analysis Version:</strong> 1.0</div>
        </div>
      </div>

      {/* Overview */}
      <div className="mb-8 avoid-break">
        <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 uppercase">Document Overview</h3>
        <table className="w-full text-left text-sm">
          <tbody>
            <tr><th className="py-1 w-1/4">Document Type:</th><td>{ext?.documentType || doc.classification?.type || 'Unknown'}</td></tr>
            {ext?.court && <tr><th className="py-1">Court:</th><td>{ext.court}</td></tr>}
            {ext?.caseNumber && <tr><th className="py-1">Case Number:</th><td>{ext.caseNumber}</td></tr>}
            {ext?.dates && ext.dates.length > 0 && (
              <tr><th className="py-1 align-top">Dates:</th><td>{ext.dates.map(d => `${d.value} (${d.type})`).join(', ')}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      {doc.summary && (
        <div className="mb-8 avoid-break">
          <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 uppercase">Plain Language Summary</h3>
          <p className="leading-relaxed text-justify">{doc.summary}</p>
        </div>
      )}

      {/* Timeline */}
      {doc.timeline && doc.timeline.events.length > 0 && (
        <div className="mb-8 avoid-break">
          <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 uppercase">Timeline</h3>
          <ul className="list-disc pl-5 space-y-3">
            {doc.timeline.events.map((event, i) => (
              <li key={i}>
                <strong>{event.date ? `[${event.date}] ` : ''}{event.title}</strong>
                <p className="mt-1 text-gray-800">{event.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rights */}
      {doc.rights && (
        <div className="mb-8 avoid-break">
          <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 uppercase">Rights & Next Steps</h3>
          
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Your Rights</h4>
            <p className="leading-relaxed">{doc.rights.rightsSummary}</p>
          </div>

          {doc.rights.nextSteps.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Next Steps</h4>
              <ol className="list-decimal pl-5 space-y-1">
                {doc.rights.nextSteps.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
          )}

          {doc.rights.documentsToKeep.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Documents to Keep</h4>
              <ul className="list-disc pl-5 space-y-1">
                {doc.rights.documentsToKeep.map((docItem, i) => <li key={i}>{docItem}</li>)}
              </ul>
            </div>
          )}

          {doc.rights.warnings.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1 text-red-700">Warnings</h4>
              <ul className="list-disc pl-5 space-y-1 text-red-700">
                {doc.rights.warnings.map((warning, i) => <li key={i}>{warning}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Legal Analysis */}
      {doc.ruleEngine && (doc.ruleEngine.sections.length > 0 || doc.ruleEngine.facts.length > 0) && (
        <div className="mb-8 avoid-break">
          <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 uppercase">Legal Analysis</h3>
          
          {doc.ruleEngine.sections.length > 0 && (
            <div className="mb-3">
              <strong>Rules Applied: </strong> {doc.ruleEngine.sections.join(', ')}
            </div>
          )}
          
          {doc.ruleEngine.facts.length > 0 && (
            <div>
              <strong>Legal Facts:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {doc.ruleEngine.facts.map((fact, i) => <li key={i}>{fact}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-4 border-t border-gray-300 text-center text-xs text-gray-500 avoid-break">
        Generated by Nyaya Mitra on {now} • Document ID: {doc.id}
      </div>
    </div>
  )
}
