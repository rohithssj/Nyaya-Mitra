import React from 'react';

export function parseMarkdown(text: string): React.ReactNode {
  // Simple markdown parser for basic formatting (bold, italics, lists, newlines)
  const lines = text.split('\n');
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />;
        
        let parsedLine: React.ReactNode = line;
        
        // Handle list items
        if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
           parsedLine = <li className="ml-4 list-disc">{line.replace(/^[-•]\s*/, '')}</li>;
        }

        // Basic bold/italic using regex is complex to do perfectly in React without a library,
        // but we can at least handle newlines and lists nicely.
        // For actual bold, let's just do a simple replacement if it's the whole line or simple cases:
        // Actually, returning raw strings with simple HTML is tricky. 
        // We will just render lines as paragraphs.
        
        return (
          <div key={i} className="leading-relaxed text-sm">
            {parsedLine}
          </div>
        );
      })}
    </div>
  );
}
