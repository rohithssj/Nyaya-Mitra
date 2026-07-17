import * as React from 'react'
import { cn } from '@/lib/utils'
import type { UploadState } from '@/hooks/useFileUpload'

export interface UploadZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onUploadClick?: () => void;
  isDragging?: boolean;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  previewUrl?: string | null;
  selectedFile?: File | null;
  uploadState?: UploadState;
  onReset?: () => void;
}

export const UploadZone = React.forwardRef<HTMLDivElement, UploadZoneProps>(
  ({ className, onUploadClick, isDragging, previewUrl, selectedFile, uploadState = 'idle', onReset, ...props }, ref) => {
    
    const formatSize = (bytes: number) => {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    }

    if (selectedFile) {
      return (
        <div className={cn("relative w-full max-w-[440px] overflow-hidden rounded-lg border-[1.5px] border-solid border-[var(--color-gold)] bg-[var(--color-surface)]", className)}>
          {previewUrl ? (
            <div className="relative w-full h-full min-h-[220px]">
              <img src={previewUrl} alt="Document preview" className="absolute inset-0 h-full w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
            </div>
          ) : (
            <div className="flex h-[220px] w-full flex-col items-center justify-center gap-3 bg-[var(--color-bg-elevated)] p-6">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)] bg-[rgba(184,134,11,0.1)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[22px] w-[22px] stroke-[var(--color-gold-bright)]">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/>
                </svg>
              </div>
            </div>
          )}

          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
            <div className="truncate font-mono text-[13px] font-medium text-[var(--color-gold-bright)]">{selectedFile.name}</div>
            <div className="text-[12px] text-[#C9C0B4]">{formatSize(selectedFile.size)}</div>
          </div>

          {/* Action Overlay */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onUploadClick?.(); }}
              disabled={uploadState === 'uploading' || uploadState === 'completed'}
              className="flex items-center gap-1.5 rounded bg-black/60 px-3 py-1.5 text-[12px] text-white backdrop-blur-md transition-colors hover:bg-black/80 disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              Replace
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onReset?.(); }}
              disabled={uploadState === 'uploading' || uploadState === 'completed'}
              className="flex items-center gap-1.5 rounded bg-red-900/60 px-3 py-1.5 text-[12px] text-white backdrop-blur-md transition-colors hover:bg-red-900/80 disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Remove
            </button>
          </div>

          {/* Uploading Status Overlay */}
          {(uploadState === 'uploading' || uploadState === 'completed') && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                {uploadState === 'uploading' ? (
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-gold-bright)] border-t-transparent"></div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold-bright)] text-black">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-5 w-5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}
                <span className="font-mono text-[13px] text-white">
                  {uploadState === 'uploading' ? 'Analyzing Document...' : 'Upload Complete!'}
                </span>
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        onClick={onUploadClick}
        className={cn(
          "group relative flex w-full max-w-[440px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-[1.5px] border-dashed border-[var(--color-primary-hover)] bg-[var(--color-surface)] px-7 py-12 text-center transition-all duration-200 ease-in-out",
          isDragging ? "border-[var(--color-gold)] bg-[#1C1716] scale-[1.02]" : "hover:border-[var(--color-gold)] hover:bg-[#1C1716]",
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
        <div className="mb-1.5 text-[16.5px] font-medium text-[var(--color-text-primary)]">
          {isDragging ? "Drop document here" : "Tap to upload"}
        </div>
        <div className="text-[13px] text-[var(--color-text-secondary)]">or drag a photo here</div>
      </div>
    )
  }
)
UploadZone.displayName = "UploadZone"
