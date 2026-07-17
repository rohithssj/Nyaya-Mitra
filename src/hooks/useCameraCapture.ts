import { useRef, useState } from 'react'

export function useCameraCapture({ onCapture }: { onCapture?: (file: File, url: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const triggerCamera = () => {
    // Wait for the next tick to ensure any previous interactions are settled
    setTimeout(() => {
      fileInputRef.current?.click()
    }, 0)
  }

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onCapture?.(file, url)
    }
  }

  return {
    cameraInputRef: fileInputRef,
    triggerCamera,
    handleCapture
  }
}
