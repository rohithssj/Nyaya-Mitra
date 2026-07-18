import { Card } from '@/components/common/Card'

export function SupportCard() {
  return (
    <section>
      <h2 className="mb-5 font-heading text-[18px] font-medium text-[var(--color-ivory)]">Support & Resources</h2>
      <Card className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-[26px]">
        
        <a href="#" className="flex flex-col gap-3 p-4 bg-black/20 border border-[var(--color-border)] rounded hover:border-[var(--color-gold)] transition-colors group">
          <span className="text-xl group-hover:scale-110 transition-transform">🐛</span>
          <span className="text-sm font-medium text-white">Report Bug</span>
          <span className="text-xs text-[var(--color-text-secondary)]">Found an issue? Let us know.</span>
        </a>

        <a href="#" className="flex flex-col gap-3 p-4 bg-black/20 border border-[var(--color-border)] rounded hover:border-[var(--color-gold)] transition-colors group">
          <span className="text-xl group-hover:scale-110 transition-transform">💡</span>
          <span className="text-sm font-medium text-white">Send Feedback</span>
          <span className="text-xs text-[var(--color-text-secondary)]">Help us improve the app.</span>
        </a>

        <a href="#" className="flex flex-col gap-3 p-4 bg-black/20 border border-[var(--color-border)] rounded hover:border-[var(--color-gold)] transition-colors group">
          <span className="text-xl group-hover:scale-110 transition-transform">📚</span>
          <span className="text-sm font-medium text-white">Documentation</span>
          <span className="text-xs text-[var(--color-text-secondary)]">Read the technical docs.</span>
        </a>

        <a href="#" className="flex flex-col gap-3 p-4 bg-black/20 border border-[var(--color-border)] rounded hover:border-[var(--color-gold)] transition-colors group">
          <span className="text-xl group-hover:scale-110 transition-transform">⭐</span>
          <span className="text-sm font-medium text-white">GitHub Repo</span>
          <span className="text-xs text-[var(--color-text-secondary)]">Star the open-source project.</span>
        </a>

      </Card>
    </section>
  )
}
