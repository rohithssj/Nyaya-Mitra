export class CameraService {
  static async requestAccess(): Promise<MediaStream> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Camera access is not supported by your browser.')
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      return stream
    } catch (error) {
      console.error('CameraService Error:', error)
      throw new Error('Camera access denied or unavailable. Please check permissions.')
    }
  }

  static captureImage(videoElement: HTMLVideoElement): Promise<File> {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = videoElement.videoWidth
        canvas.height = videoElement.videoHeight
        
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          throw new Error('Failed to create canvas context')
        }
        
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' })
            resolve(file)
          } else {
            reject(new Error('Failed to generate image blob'))
          }
        }, 'image/jpeg', 0.9)
      } catch (error) {
        reject(error)
      }
    })
  }

  static stopStream(stream: MediaStream) {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
  }
}
