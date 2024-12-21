'use client'

interface GaugeProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
}

export function Gauge({ value, size = 'md', showValue = true }: GaugeProps) {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return 120
      case 'lg':
        return 200
      default:
        return 160
    }
  }

  const radius = getSize() / 2
  const strokeWidth = size === 'sm' ? 8 : 12
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (value / 100) * circumference

  const getColor = () => {
    if (value >= 75) return '#16a34a' // green-600
    if (value >= 50) return '#ca8a04' // yellow-600
    return '#dc2626' // red-600
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        height={getSize()}
        width={getSize()}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="text-muted opacity-20"
        />
        {/* Foreground circle */}
        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: getColor() }}>
            {value}%
          </span>
          <span className="text-xs text-muted-foreground mt-1">Attendance</span>
        </div>
      )}
    </div>
  )
}
