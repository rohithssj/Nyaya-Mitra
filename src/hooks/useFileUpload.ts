import { useState, useRef } from 'react'

interface UseFileUploadOptions {
  accept?: string
  maxSizeMB?: number
  onUploadSuccess?: (file: File, previewUrl?: string) => void
  onUploadError?: (error: string) => void
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const { accept = 'image/jpeg, image/png, image/webp, application/pdf', maxSizeMB = 10, onUploadSuccess, onUploadError } = options
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFile = (file: File) => {
    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      onUploadError?.(`File exceeds maximum size of ${maxSizeMB}MB`)
      return
    }

    // Generate preview if image
    let url: string | undefined
    if (file.type.startsWith('image/')) {
      url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }

    setSelectedFile(file)
    onUploadSuccess?.(file, url)
  }

  const triggerUpload = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return {
    fileInputRef,
    isDragging,
    selectedFile,
    previewUrl,
    triggerUpload,
    onFileChange,
    onDragOver,
    onDragLeave,
    onDrop,
    accept
  }
}
