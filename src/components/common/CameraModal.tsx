import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'
import { CameraService } from '@/lib/services/CameraService'

interface CameraModalProps {
  isOpen: boolean
  onClose: () => void
  onCapture: (file: File) => void
}

export function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [stream, setStream] = React.useState<MediaStream | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
    }
    return () => stopCamera()
  }, [isOpen])

  const startCamera = async () => {
    setError(null)
    try {
      const mediaStream = await CameraService.requestAccess()
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err: any) {
      setError(err.message || 'Camera access denied or unavailable.')
    }
  }

  const stopCamera = () => {
    if (stream) {
      CameraService.stopStream(stream)
      setStream(null)
    }
  }

  const handleCapture = async () => {
    if (!videoRef.current) return
    
    try {
      const file = await CameraService.captureImage(videoRef.current)
      onCapture(file)
      onClose()
    } catch (err) {
      setError('Failed to capture image.')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <div className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <h3 className="font-heading text-[18px] font-medium text-[var(--color-ivory)]">Take a Photo</h3>
              <button onClick={onClose} className="text-[var(--color-text-secondary)] hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="relative aspect-video w-full bg-black">
              {error ? (
                <div className="flex h-full items-center justify-center text-[14px] text-red-400">
                  {error}
                </div>
              ) : (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="flex items-center justify-center p-6">
              <Button 
                onClick={handleCapture}
                disabled={!!error || !stream}
                className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--color-surface)] bg-[var(--color-primary)] outline outline-2 outline-[var(--color-primary-hover)] transition-transform hover:scale-105 active:scale-95"
              >
                <div className="h-8 w-8 rounded-full border-2 border-white/50"></div>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
