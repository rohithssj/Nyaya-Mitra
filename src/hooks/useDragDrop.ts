import { useState, useCallback } from 'react'

export function useDragDrop(onDropCallback: (files: FileList) => void) {
  const [isDragging, setIsDragging] = useState(false)

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDropCallback(e.dataTransfer.files)
    }
  }, [onDropCallback])

  return { isDragging, onDragOver, onDragLeave, onDrop }
}
