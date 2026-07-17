export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export class ValidationService {
  static readonly ALLOWED_TYPES = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ];
  
  static readonly MAX_SIZE_MB = 20;
  static readonly MAX_SIZE_BYTES = ValidationService.MAX_SIZE_MB * 1024 * 1024;

  static validateFile(file: File): ValidationResult {
    if (!file) {
      return { isValid: false, error: 'File is empty or corrupted.' };
    }

    if (file.size === 0) {
      return { isValid: false, error: 'The uploaded file is empty.' };
    }

    if (file.size > this.MAX_SIZE_BYTES) {
      return { isValid: false, error: `File exceeds the maximum size of ${this.MAX_SIZE_MB}MB.` };
    }

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return { isValid: false, error: 'Unsupported format. Please upload PDF, PNG, JPG, or WEBP.' };
    }

    return { isValid: true };
  }

  static validateFiles(files: FileList | File[]): ValidationResult {
    if (!files || files.length === 0) {
      return { isValid: false, error: 'No file selected.' };
    }

    if (files.length > 1) {
      return { isValid: false, error: 'Please upload only one document at a time.' };
    }

    return this.validateFile(files[0] as File);
  }
}
