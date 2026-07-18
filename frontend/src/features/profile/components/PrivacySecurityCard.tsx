import { Card } from '@/components/common/Card'

export function PrivacySecurityCard() {
  return (
    <section>
      <h2 className="mb-5 font-heading text-[18px] font-medium text-[var(--color-ivory)]">Privacy & Security</h2>
      <Card className="p-[26px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div>
              <h3 className="font-mono text-[12px] uppercase text-[var(--color-text-secondary)] mb-2">Data Processing</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Documents uploaded to Nyaya Mitra are securely transmitted and processed by our AI analysis engines. They are stored strictly in your local device cache and are not persisted permanently on our servers unless you enable Cloud Sync (Coming Soon).
              </p>
            </div>
            
            <div>
              <h3 className="font-mono text-[12px] uppercase text-[var(--color-text-secondary)] mb-2">Document Retention</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Your analyzed documents and chat histories remain strictly on your local browser. If you clear your browser data or use the Data Management tools above, this data will be permanently erased.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1a1510] border border-[var(--color-gold-bright)]/30 p-4 rounded text-[var(--color-gold-bright)]">
              <h3 className="font-mono text-[12px] uppercase mb-2 flex items-center gap-2">
                <span className="text-lg">⚖️</span> AI Disclaimer
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-ivory)]/90">
                Nyaya Mitra utilizes advanced Generative AI to parse and summarize legal documents. However, AI responses may occasionally contain inaccuracies, hallucinations, or misinterpretations of the law. 
                <br/><br/>
                <strong className="text-[var(--color-gold-bright)]">Nyaya Mitra is not a law firm.</strong> You must always consult a qualified legal professional for definitive legal advice and before taking any formal action.
              </p>
            </div>
          </div>

        </div>
      </Card>
    </section>
  )
}
