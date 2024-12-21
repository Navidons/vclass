import { AlertCircle } from 'lucide-react'

export function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <AlertCircle className="w-16 h-16 text-[#2a6fb5] mb-4" />
      <h1 className="text-3xl font-bold text-[#2a6fb5] mb-2">Coming Soon!</h1>
      <p className="text-muted-foreground text-center max-w-md">
        This feature is currently under development. Check back later for updates!
      </p>
    </div>
  )
}
