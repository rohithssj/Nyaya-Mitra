import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { parseMarkdown } from '@/lib/utils/markdown';
import type { Document } from '@/lib/services/DocumentStore';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export function ChatAssistant({ doc }: { doc: Document }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cache, setCache] = useState<Record<string, string>>({});
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const SUGGESTED_QUESTIONS = [
    "What does this notice mean?",
    "Can I ignore this?",
    "What happens next?",
    "What should I do today?"
  ];

  // Auto scroll
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isTyping) return;

    // Optimistic UI update
    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Check cache
    if (cache[trimmed]) {
      setMessages([...newMessages, { role: 'ai', content: cache[trimmed] }]);
      setIsTyping(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: doc.id,
          message: trimmed,
          history: messages.slice(-5) // Send only last 5 messages
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to chat');
      }

      const reply = data.text;
      setMessages([...newMessages, { role: 'ai', content: reply }]);
      setCache(prev => ({ ...prev, [trimmed]: reply }));
      
    } catch (error: any) {
      setMessages([...newMessages, { role: 'ai', content: `Error: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <Card className="flex flex-col h-[500px] md:h-[600px] border border-[var(--color-border)] shadow-lg" id="chat-section">
      <div className="p-4 border-b border-[var(--color-border)] bg-black/40">
        <h3 className="font-mono text-[13px] uppercase tracking-wider text-[var(--color-gold-bright)] flex items-center gap-2 before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
          AI Legal Assistant
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="text-[var(--color-text-secondary)]">
              <p className="text-lg font-medium text-white mb-2">Ask anything about your legal document.</p>
              <p className="text-sm">I'll use the extracted context to help you understand your rights, deadlines, and next steps.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-sm">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-black/30 text-xs text-[#C9C0B4] hover:border-[var(--color-gold-bright)] hover:text-white transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user' 
                  ? 'bg-[var(--color-primary)] text-white rounded-tr-sm' 
                  : 'bg-[#2A2A2A] text-[#E0E0E0] rounded-tl-sm border border-[var(--color-border)]'
              }`}>
                {msg.role === 'user' ? (
                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                ) : (
                  parseMarkdown(msg.content)
                )}
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#2A2A2A] rounded-2xl rounded-tl-sm px-4 py-3 border border-[var(--color-border)]">
              <div className="flex gap-1 items-center h-5">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-4 border-t border-[var(--color-border)] bg-black/20">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            placeholder="Type your question... (Shift+Enter for new line)"
            className="w-full resize-none rounded bg-[#1A1A1A] border border-[#333] pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-gold-bright)] disabled:opacity-50"
            rows={1}
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 bottom-2 p-2 text-[var(--color-gold-bright)] disabled:opacity-30 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-500 mt-2">
          This is AI-generated legal information and should not replace professional legal advice.
        </p>
      </div>
    </Card>
  );
}
