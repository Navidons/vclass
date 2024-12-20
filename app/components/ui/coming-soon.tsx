import { AlertCircle } from 'lucide-react'

export function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <AlertCircle className="w-16 h-16 text-blue-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Coming Soon!</h1>
      <p className="text-gray-600 text-center max-w-md">
        This feature is currently under development. We're working hard to bring you an amazing experience!
      </p>
    </div>
  )
}
