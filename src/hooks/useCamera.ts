import { useState, useRef } from 'react'
import { CameraService } from '@/lib/services/CameraService'

export function useCamera(onCaptureSuccess: (file: File) => void, onError: (error: string) => void) {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const mobileInputRef = useRef<HTMLInputElement>(null)

  const openCamera = () => {
    // Basic user agent check to determine if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      // Use native capture via hidden input
      mobileInputRef.current?.click()
    } else {
      // Use CameraModal
      setIsCameraOpen(true)
    }
  }

  const closeCamera = () => {
    setIsCameraOpen(false)
  }

  const handleMobileCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onCaptureSuccess(file)
    }
    if (mobileInputRef.current) {
      mobileInputRef.current.value = ''
    }
  }

  return {
    isCameraOpen,
    openCamera,
    closeCamera,
    mobileInputRef,
    handleMobileCapture
  }
}
