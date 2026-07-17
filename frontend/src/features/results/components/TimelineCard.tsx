import { Card } from '@/components/common/Card'
import type { TimelineResult } from '@/lib/services/DocumentStore'

export function TimelineCard({ timeline }: { timeline?: TimelineResult }) {
  return (
    <Card className="mb-7 p-[26px]" id="timeline-section">
      <div className="mb-6 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
        📅 Legal Timeline
      </div>
      
      {timeline && timeline.events.length > 0 ? (
        <div className="relative ml-3 border-l border-[var(--color-border)] pl-6 space-y-8">
          {timeline.events.map((event, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-[2px] border-[var(--color-surface)] bg-[var(--color-gold-bright)]"></div>
              
              {event.date && (
                <div className="mb-1 font-mono text-[11.5px] uppercase tracking-wider text-[var(--color-gold-bright)]">
                  {event.date}
                </div>
              )}
              <h3 className="mb-1.5 font-sans text-[16px] font-semibold text-[#F5F5F5]">
                {event.title}
              </h3>
              <p className="font-sans text-[14.5px] leading-relaxed text-[#C9C0B4]">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="italic text-[var(--color-text-secondary)]">
          No timeline available for this document.
        </div>
      )}
    </Card>
  )
}
