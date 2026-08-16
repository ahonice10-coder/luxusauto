import { createContext, useCallback, useContext, useMemo } from 'react'
import { toast as sonnerToast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const toast = useCallback((message, type = 'info') => {
    if (type === 'success') sonnerToast.success(message)
    else if (type === 'danger') sonnerToast.error(message)
    else sonnerToast(message)
  }, [])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster position="bottom-right" />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
