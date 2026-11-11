import { cn } from '@/lib/utils'

export type FormMessageValue = { type: 'success' | 'error'; text: string } | null

// Inline success/error message for forms (replaces alert()).
export function FormMessage({ message, className }: { message: FormMessageValue; className?: string }) {
  if (!message) return null
  const isError = message.type === 'error'
  return (
    <p
      role={isError ? 'alert' : 'status'}
      className={cn(
        'mb-4 rounded-md border px-3 py-2 text-sm',
        isError ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700',
        className
      )}
    >
      {message.text}
    </p>
  )
}
