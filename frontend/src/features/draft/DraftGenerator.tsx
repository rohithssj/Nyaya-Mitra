import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import type { Document } from '@/lib/services/DocumentStore';
import { copyToClipboard } from '@/lib/utils/clipboard';
import { downloadStringAsFile } from '@/lib/utils/download';

export function DraftGenerator({ doc }: { doc: Document }) {
  const [draftType, setDraftType] = useState('Reply to Legal Notice');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState<{ title: string; body: string; placeholders: string[] } | null>(null);
  const [editedBody, setEditedBody] = useState('');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const DRAFT_TYPES = [
    'Reply to Legal Notice',
    'Reply to Court Summons',
    'Application for Bail',
    'Representation Letter',
    'Extension Request',
    'General Legal Response'
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setDraft(null);
    try {
      const response = await fetch('http://localhost:3000/api/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: doc.id, draftType })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate draft');
      
      setDraft(data);
      setEditedBody(data.body);
    } catch (error: any) {
      alert(`Error generating draft: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [editedBody]);

  const handleCopy = async () => {
    if (!draft) return;
    const text = `${draft.title}\n\n${editedBody}`;
    const success = await copyToClipboard(text);
    if (success) alert('Draft copied to clipboard!');
  };

  const handleDownload = () => {
    if (!draft) return;
    const text = `${draft.title}\n\n${editedBody}`;
    downloadStringAsFile(text, `draft-${doc.id}.txt`);
  };

  return (
    <Card className="mb-7 p-6 border border-[var(--color-border)] shadow-lg" id="draft-section">
      <div className="mb-6 flex items-center justify-between">
        <div className="font-mono text-[13px] uppercase tracking-wider text-[var(--color-gold-bright)] flex items-center gap-2 before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
          Draft Generator
        </div>
      </div>

      {!draft && !isGenerating && (
        <div className="bg-black/20 border border-[var(--color-border)] rounded-md p-6 text-center">
          <p className="text-sm text-gray-300 mb-4">Select a draft type to automatically generate a formal response using this document's context.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <select
              value={draftType}
              onChange={(e) => setDraftType(e.target.value)}
              className="bg-[#1A1A1A] border border-[#333] text-sm text-white rounded px-4 py-2 focus:outline-none focus:border-[var(--color-gold-bright)]"
            >
              {DRAFT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            <button
              onClick={handleGenerate}
              className="px-6 py-2 bg-[var(--color-primary)] text-white rounded font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Generate Draft
            </button>
          </div>
        </div>
      )}

      {isGenerating && (
        <div className="py-12 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--color-gold-bright)] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-gray-400">Drafting {draftType}...</p>
        </div>
      )}

      {draft && !isGenerating && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">{draft.title}</h3>
            <div className="flex gap-2">
              <button onClick={handleGenerate} className="px-3 py-1.5 text-xs border border-gray-600 rounded text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                Regenerate
              </button>
              <button onClick={handleCopy} className="px-3 py-1.5 text-xs border border-[var(--color-gold-bright)] text-[var(--color-gold-bright)] rounded hover:bg-[var(--color-gold-bright)] hover:text-white transition-colors">
                Copy
              </button>
              <button onClick={handleDownload} className="px-3 py-1.5 text-xs bg-white/10 text-white rounded hover:bg-white/20 transition-colors">
                Download TXT
              </button>
            </div>
          </div>
          
          <div className="bg-[#1A1A1A] border border-[var(--color-border)] rounded overflow-hidden">
            <textarea
              ref={textareaRef}
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              className="w-full min-h-[200px] bg-transparent p-4 text-sm leading-relaxed text-[#E0E0E0] focus:outline-none resize-none font-sans"
            />
          </div>
          
          {draft.placeholders.length > 0 && (
            <div className="text-xs text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 p-3 rounded">
              <strong>Notice:</strong> Please review and replace the following placeholders before using this draft: {draft.placeholders.join(', ')}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
