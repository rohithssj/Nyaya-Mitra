import * as React from 'react'
import { cn } from '@/lib/utils'

export interface UploadZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onUpload?: () => void;
}

export const UploadZone = React.forwardRef<HTMLDivElement, UploadZoneProps>(
  ({ className, onUpload, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onUpload}
        className={cn(
          "group w-full max-w-[440px] cursor-pointer rounded-lg border-[1.5px] border-dashed border-[var(--color-primary-hover)] bg-[var(--color-surface)] px-7 py-12 text-center transition-all duration-150 ease-in-out hover:border-[var(--color-gold)] hover:bg-[#1C1716]",
          className
        )}
        {...props}
      >
        <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px] stroke-[var(--color-gold-bright)] transition-transform group-hover:-translate-y-1">
            <path d="M12 3v13M7 9l5-5 5 5"/>
            <path d="M5 21h14"/>
          </svg>
        </div>
        <div className="mb-1.5 text-[16.5px] font-medium text-[var(--color-text-primary)]">Tap to upload</div>
        <div className="text-[13px] text-[var(--color-text-secondary)]">or drag a photo here</div>
      </div>
    )
  }
)
UploadZone.displayName = "UploadZone"
