import type { Document } from '@/lib/services/DocumentStore';
import { Card } from '@/components/common/Card';

export function KeyFactsCard({ doc }: { doc: Document }) {
  const ext = doc.extraction;
  
  const facts = [
    { label: 'Document Type', value: ext?.documentType || doc.classification?.type || 'Unknown' },
    { label: 'Court', value: ext?.court },
    { label: 'Case Number', value: ext?.caseNumber },
    { label: 'Sections', value: ext?.sections?.join(', ') },
    { label: 'People', value: ext?.importantPersons?.join(', ') },
    { label: 'Organizations', value: ext?.importantOrganizations?.join(', ') },
    { label: 'Status', value: 'Ready for Review' }
  ].filter(f => f.value); // Only show facts that have a value

  return (
    <Card className="mb-4 p-4 border border-[var(--color-border)] shadow-lg" id="key-facts-section">
      <div className="mb-4 font-mono text-[11px] uppercase tracking-wider text-[var(--color-gold-bright)] flex items-center gap-2 before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
        Key Facts
      </div>
      <div className="space-y-3">
        {facts.map((fact, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">{fact.label}</span>
            <span className="text-sm text-gray-200">{fact.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
