import * as React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { OCRService } from '@/lib/services/OCRService'

export function ProcessingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const state = location.state as { documentId?: string } | null
  const documentId = state?.documentId

  const [currentStep, setCurrentStep] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)

  const steps = [
    "Uploading...",
    "Extracting Text...",
    "Reading Pages...",
    "Detecting Language...",
    "Saving OCR...",
    "Done"
  ]

  React.useEffect(() => {
    if (!documentId) {
      navigate('/upload')
      return
    }

    let isMounted = true

    // Step animation logic
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1
        return prev
      })
    }, 800)

    // Process OCR
    const processDocument = async () => {
      try {
        await OCRService.processDocument(documentId)
        if (isMounted) {
          clearInterval(stepInterval)
          navigate(`/results/${documentId}`)
        }
      } catch (err: any) {
        if (isMounted) {
          clearInterval(stepInterval)
          setError(err.message || 'Failed to process document.')
        }
      }
    }

    processDocument()

    return () => {
      isMounted = false
      clearInterval(stepInterval)
    }
  }, [documentId, navigate])

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-[42px] flex h-[100px] w-[100px] items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-line)" strokeWidth="1.5" />
          <motion.circle 
            cx="50" cy="50" r="46" fill="none" stroke="var(--color-gold-bright)" strokeWidth="1.5" 
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 300" }}
            animate={{ strokeDasharray: "289 300" }}
            transition={{ duration: 4, ease: "linear" }}
          />
        </svg>
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.4px] border-[var(--color-gold)] bg-[var(--color-background)]">
          <div className="absolute inset-[3px] rounded-full border border-dashed border-[var(--color-primary-hover)] opacity-50 animate-spin-slow"></div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px] stroke-[var(--color-gold-bright)]">
            <path d="M12 3v13M7 9l5-5 5 5"/>
            <path d="M5 21h14"/>
          </svg>
        </div>
      </div>

      {error ? (
        <div className="flex flex-col items-center">
          <h2 className="mb-2 font-heading text-[24px] font-[560] text-red-400">Processing Failed</h2>
          <p className="text-[14.5px] text-[#C9C0B4]">{error}</p>
          <button onClick={() => navigate('/upload')} className="mt-6 font-mono text-[13px] text-[var(--color-gold-bright)] hover:underline">Try Again</button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="mb-3 font-heading text-[26px] font-[560] text-[var(--color-ivory)]">
            Analyzing Document
          </h2>
          <div className="relative h-6 w-full max-w-[200px] overflow-hidden">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: currentStep === index ? 1 : 0, 
                  y: currentStep === index ? 0 : -10 
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center text-[14.5px] tracking-wide text-[#C9C0B4]"
              >
                {step}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
