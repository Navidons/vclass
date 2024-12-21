'use client'

import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  CartesianGrid,
  ReferenceLine 
} from "recharts"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"

const data = [
  { day: 'Mon', attendance: 85 },
  { day: 'Tue', attendance: 90 },
  { day: 'Wed', attendance: 95 },
  { day: 'Thu', attendance: 88 },
  { day: 'Fri', attendance: 92 },
  { day: 'Sat', attendance: 87 },
  { day: 'Sun', attendance: 91 },
]

// Calculate average attendance
const averageAttendance = Math.round(
  data.reduce((acc, curr) => acc + curr.attendance, 0) / data.length
)

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const value = payload[0].value
    const status = value >= 75 ? 'Good' : value >= 60 ? 'Warning' : 'Poor'
    const color = value >= 75 ? 'text-green-600' : value >= 60 ? 'text-yellow-600' : 'text-red-600'
    
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border">
        <p className="text-sm font-medium mb-1">{payload[0].payload.day}</p>
        <p className="text-sm text-gray-600">{value}% Attendance</p>
        <p className={`text-sm font-medium mt-1 ${color}`}>{status}</p>
      </div>
    )
  }
  return null
}

function SpeedometerGauge({ value }: { value: number }) {
  // Convert percentage to angle (0% = -90deg, 100% = 90deg)
  const angle = -90 + (180 * value) / 100
  const isGood = value >= 75
  const isWarning = value >= 60 && value < 75
  const isDanger = value < 60

  // Get status color
  const getStatusColor = () => {
    if (isGood) return 'text-green-600'
    if (isWarning) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Get status text
  const getStatusText = () => {
    if (isGood) return 'Excellent'
    if (isWarning) return 'Need Improvement'
    return 'Critical'
  }

  return (
    <div className="relative w-72 h-48">
      {/* Gauge Container */}
      <div className="absolute inset-0">
        {/* Gauge Background */}
        <div className="relative w-full h-36 overflow-hidden">
          {/* Colored Background Arc */}
          <div 
            className="absolute w-full h-72 bottom-0 rounded-tl-full rounded-tr-full"
            style={{ 
              background: 'linear-gradient(90deg, #dc2626 0%, #ca8a04 50%, #16a34a 100%)',
              clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)',
              opacity: 0.15
            }}
          />

          {/* Active Arc */}
          <div 
            className="absolute w-full h-72 bottom-0 rounded-tl-full rounded-tr-full transition-all duration-1000"
            style={{ 
              background: 'linear-gradient(90deg, #dc2626 0%, #ca8a04 50%, #16a34a 100%)',
              clipPath: `polygon(0 50%, ${value}% 50%, ${value}% 100%, 0% 100%)`,
            }}
          />

          {/* Tick Marks */}
          <div className="absolute bottom-0 w-full h-36">
            {[...Array(21)].map((_, i) => {
              const isMajor = i % 2 === 0
              return (
                <div
                  key={i}
                  className={`absolute bottom-0 transform -translate-x-1/2 ${
                    isMajor ? 'w-1 h-4 bg-gray-600' : 'w-0.5 h-2 bg-gray-400'
                  }`}
                  style={{
                    left: `${i * 5}%`,
                    transform: `translateX(-50%) rotate(${ -90 + i * 9}deg)`,
                    transformOrigin: 'bottom'
                  }}
                />
              )
            })}
          </div>

          {/* Needle */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-transform duration-1000"
            style={{ 
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: 'bottom center',
            }}
          >
            <div className="relative h-32 flex flex-col items-center">
              <div className="w-[2px] h-32 bg-gray-800" />
              <div className="absolute top-0 w-4 h-4 -mt-2 -ml-2 rounded-full bg-gray-800 shadow-lg" />
            </div>
          </div>

          {/* Center Circle */}
          <div className="absolute bottom-0 left-1/2 w-8 h-8 bg-white border-4 border-gray-800 rounded-full transform -translate-x-1/2 translate-y-1/2 shadow-lg" />
        </div>

        {/* Value Display */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-center bg-white rounded-lg px-4 py-1 shadow-sm border">
          <div className="text-3xl font-bold text-gray-900 mb-0.5 tabular-nums">{value}%</div>
          <div className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-10 w-full flex justify-between px-4 text-xs font-medium">
          <span className="text-red-600">0%</span>
          <div className="space-x-12">
            <span className="text-yellow-600">50%</span>
            <span className="text-yellow-600">75%</span>
          </div>
          <span className="text-green-600">100%</span>
        </div>
      </div>
    </div>
  )
}

export function AttendanceChart() {
  return (
    <div className="h-full w-full">
      <Carousel className="h-full">
        <CarouselContent className="h-full">
          {/* Area Chart */}
          <CarouselItem className="h-full">
            <div className="h-full w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Weekly Attendance</h3>
                  <p className="text-sm text-gray-500 mt-1">Last 7 days performance</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 opacity-20"></div>
                    <span className="text-sm text-gray-600">Range</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Attendance</span>
                  </div>
                </div>
              </div>
              
              <div className="h-[calc(100%-5rem)]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine 
                      y={75} 
                      stroke="#22c55e" 
                      strokeDasharray="3 3" 
                      label={{ 
                        value: "Required (75%)", 
                        position: "right",
                        fill: "#22c55e",
                        fontSize: 12
                      }} 
                    />
                    <Area
                      type="monotone"
                      dataKey="attendance"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#colorAttendance)"
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#2563eb' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CarouselItem>

          {/* Speedometer Gauge */}
          <CarouselItem className="h-full">
            <div className="h-full w-full flex flex-col items-center justify-center p-4">
              <div className="mb-4 text-base font-medium text-gray-600">Overall Attendance</div>
              <SpeedometerGauge value={averageAttendance} />
              <div className="mt-6 space-y-2 w-full max-w-xs">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Classes Attended</span>
                  <span className="font-medium">{Math.round(averageAttendance * 0.42)}/42</span>
                </div>
                <Progress value={averageAttendance} className="h-2" />
                <div className="text-xs text-gray-500 text-center mt-1">
                  Minimum Required: 75%
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  )
}
