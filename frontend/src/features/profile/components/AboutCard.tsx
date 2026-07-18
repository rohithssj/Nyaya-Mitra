import { Card } from '@/components/common/Card'

export function AboutCard() {
  return (
    <section>
      <h2 className="mb-5 font-heading text-[18px] font-medium text-[var(--color-ivory)]">About Nyaya Mitra</h2>
      <Card className="p-[26px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
              <span className="text-[14px] text-[var(--color-text-secondary)]">Version</span>
              <span className="text-[14px] text-[var(--color-ivory)]">1.0.0</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
              <span className="text-[14px] text-[var(--color-text-secondary)]">Build Number</span>
              <span className="text-[14px] text-[var(--color-ivory)]">2026.07.18</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
              <span className="text-[14px] text-[var(--color-text-secondary)]">Last Updated</span>
              <span className="text-[14px] text-[var(--color-ivory)]">July 18, 2026</span>
            </div>
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
              <span className="text-[14px] text-[var(--color-text-secondary)]">AI Engine</span>
              <span className="text-[14px] text-[var(--color-gold-bright)]">Gemini Multi-Modal</span>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[12px] uppercase text-[var(--color-text-secondary)] mb-4">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['React 19', 'TypeScript', 'Node.js', 'Express', 'TailwindCSS v4', 'Framer Motion', 'Vite'].map(tech => (
                <span key={tech} className="px-3 py-1 bg-black/40 border border-[var(--color-border)] rounded text-xs text-[#E0E0E0]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </Card>
    </section>
  )
}
