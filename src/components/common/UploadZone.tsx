import * as React from 'react'
import { cn } from '@/lib/utils'

export interface UploadZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onUploadClick?: () => void;
  isDragging?: boolean;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  previewUrl?: string | null;
  selectedFile?: File | null;
}

export const UploadZone = React.forwardRef<HTMLDivElement, UploadZoneProps>(
  ({ className, onUploadClick, isDragging, previewUrl, selectedFile, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onUploadClick}
        className={cn(
          "group relative flex w-full max-w-[440px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-[1.5px] border-dashed border-[var(--color-primary-hover)] bg-[var(--color-surface)] px-7 py-12 text-center transition-all duration-200 ease-in-out",
          isDragging ? "border-[var(--color-gold)] bg-[#1C1716] scale-[1.02]" : "hover:border-[var(--color-gold)] hover:bg-[#1C1716]",
          previewUrl && "p-0 border-solid",
          className
        )}
        {...props}
      >
        {previewUrl ? (
          <div className="relative w-full h-full min-h-[220px]">
            <img src={previewUrl} alt="Document preview" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <div className="truncate font-mono text-[13px] font-medium text-[var(--color-gold-bright)]">{selectedFile?.name}</div>
              <div className="text-[12px] text-[#C9C0B4]">Click to change</div>
            </div>
          </div>
        ) : selectedFile?.type === 'application/pdf' ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)] bg-[rgba(184,134,11,0.1)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[22px] w-[22px] stroke-[var(--color-gold-bright)]">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/>
              </svg>
            </div>
            <div className="max-w-[280px] truncate font-mono text-[13px] font-medium text-[var(--color-gold-bright)]">{selectedFile.name}</div>
            <div className="text-[12px] text-[#C9C0B4]">Click to change</div>
          </div>
        ) : (
          <>
            <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px] stroke-[var(--color-gold-bright)] transition-transform group-hover:-translate-y-1">
                <path d="M12 3v13M7 9l5-5 5 5"/>
                <path d="M5 21h14"/>
              </svg>
            </div>
            <div className="mb-1.5 text-[16.5px] font-medium text-[var(--color-text-primary)]">
              {isDragging ? "Drop document here" : "Tap to upload"}
            </div>
            <div className="text-[13px] text-[var(--color-text-secondary)]">or drag a photo here</div>
          </>
        )}
      </div>
    )
  }
)
UploadZone.displayName = "UploadZone"
