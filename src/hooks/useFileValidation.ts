import { useState } from 'react'
import { ValidationService, type ValidationResult } from '@/lib/services/ValidationService'

export function useFileValidation() {
  const [error, setError] = useState<string | null>(null)

  const validate = (files: FileList | File[] | File | null): ValidationResult => {
    setError(null)
    
    if (!files) {
      const result = { isValid: false, error: 'No file provided.' }
      setError(result.error)
      return result
    }

    let result: ValidationResult
    if (files instanceof File) {
      result = ValidationService.validateFile(files)
    } else {
      result = ValidationService.validateFiles(files)
    }

    if (!result.isValid && result.error) {
      setError(result.error)
    }

    return result
  }

  const clearError = () => setError(null)

  return { error, validate, clearError }
}
