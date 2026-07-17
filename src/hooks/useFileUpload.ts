import { useState, useRef } from 'react'
import { UploadService, type UploadedFile } from '@/lib/services/UploadService'
import { ValidationService } from '@/lib/services/ValidationService'
import { useFileValidation } from './useFileValidation'
import { useDragDrop } from './useDragDrop'

export type UploadState = 'idle' | 'selecting' | 'uploading' | 'completed' | 'failed' | 'cancelled'

interface UseFileUploadOptions {
  onSuccess?: (fileRecord: UploadedFile) => void
  onError?: (error: string) => void
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const { onSuccess, onError } = options
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [uploadedRecord, setUploadedRecord] = useState<UploadedFile | null>(null)
  
  const { error: validationError, validate, clearError } = useFileValidation()

  const handleProcessFile = async (file: File) => {
    try {
      clearError()
      setUploadState('uploading')

      const validation = validate(file)
      if (!validation.isValid) {
        setUploadState('failed')
        if (onError && validation.error) onError(validation.error)
        return
      }

      const record = await UploadService.storeFile(file)
      setUploadedRecord(record)
      setUploadState('completed')
      
      if (onSuccess) onSuccess(record)
      
    } catch (err: any) {
      setUploadState('failed')
      if (onError) onError(err.message || 'Upload failed')
    }
  }

  const { isDragging, onDragOver, onDragLeave, onDrop } = useDragDrop((files) => {
    if (files && files.length > 0) {
      handleProcessFile(files[0])
    }
  })

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleProcessFile(file)
    } else {
      setUploadState('cancelled')
    }
    // reset input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerUpload = () => {
    setUploadState('selecting')
    fileInputRef.current?.click()
  }

  const resetUpload = () => {
    if (uploadedRecord) {
      UploadService.removeFile(uploadedRecord.id)
    }
    setUploadedRecord(null)
    setUploadState('idle')
    clearError()
  }

  return {
    fileInputRef,
    isDragging,
    uploadState,
    uploadedRecord,
    validationError,
    triggerUpload,
    onFileChange,
    onDragOver,
    onDragLeave,
    onDrop,
    resetUpload,
    handleProcessFile, // Expose for camera capture
    accept: ValidationService.ALLOWED_TYPES.join(', ')
  }
}
