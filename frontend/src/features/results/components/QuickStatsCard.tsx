import type { Document } from '@/lib/services/DocumentStore'

export function QuickStatsCard({ doc }: { doc: Document }) {
  const ext = doc.extraction
  const classification = doc.classification
  const timeline = doc.timeline
  
  const stats = [
    { label: 'Type', value: ext?.documentType || classification?.type || 'Unknown' },
    { label: 'Confidence', value: ((classification?.confidence || doc.ocr?.confidence || 0) * 100).toFixed(1) + '%' },
    { label: 'Processing Time', value: `${((doc.ocr?.processingTime || 0) / 1000).toFixed(1)}s` },
    { label: 'Status', value: 'Analysis Complete ✓' }
  ];

  if (ext?.importantPersons?.length) stats.push({ label: 'People', value: ext.importantPersons.length.toString() });
  if (ext?.importantOrganizations?.length) stats.push({ label: 'Organizations', value: ext.importantOrganizations.length.toString() });
  if (ext?.dates?.length) stats.push({ label: 'Dates', value: ext.dates.length.toString() });
  if (ext?.addresses?.length) stats.push({ label: 'Addresses', value: ext.addresses.length.toString() });
  if (ext?.sections?.length) stats.push({ label: 'Sections', value: ext.sections.length.toString() });
  if (timeline?.events?.length) stats.push({ label: 'Events', value: timeline.events.length.toString() });

  return (
    <div className="mb-4 grid grid-cols-2 gap-4 p-4 rounded border border-[var(--color-border)] bg-black/20" id="stats-section">
      {stats.map((stat, i) => (
        <div key={i}>
          <div className="font-mono text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">{stat.label}</div>
          <div className="text-[14px] text-[#F5F5F5]">{stat.value}</div>
        </div>
      ))}
    </div>
  )
}
