import { useState, useEffect } from 'react'

export function DashboardSidebar() {
  const [activeSection, setActiveSection] = useState('overview-section');

  const links = [
    { id: 'overview-section', label: 'Overview' },
    { id: 'summary-section', label: 'Summary' },
    { id: 'timeline-section', label: 'Timeline' },
    { id: 'rights-section', label: 'Rights' },
    { id: 'extraction-section', label: 'Extraction' },
    { id: 'analysis-section', label: 'Legal Analysis' },
    { id: 'ocr-section', label: 'OCR Text' },
    { id: 'export-section', label: 'Export' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(l => document.getElementById(l.id)).filter(Boolean);
      let current = activeSection;
      
      for (const section of sections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, links]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[40px] hidden md:block w-[180px] shrink-0">
      <nav className="flex flex-col gap-2 border-l border-[var(--color-border)] pl-4">
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className={`text-left text-[12px] font-mono uppercase tracking-wider transition-colors ${
              activeSection === link.id 
                ? 'text-[var(--color-gold-bright)]' 
                : 'text-[var(--color-text-secondary)] hover:text-[#F5F5F5]'
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
