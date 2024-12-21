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
import { Progress } from "../../../components/ui/progress"
import { Gauge } from "../../../components/ui/gauge"
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"

const attendanceData = [
  { day: "Mon", value: 100, status: "Present" },
  { day: "Tue", value: 100, status: "Present" },
  { day: "Wed", value: 0, status: "Absent" },
  { day: "Thu", value: 100, status: "Present" },
  { day: "Fri", value: 50, status: "Late" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Present":
      return "text-green-600"
    case "Late":
      return "text-yellow-600"
    case "Absent":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Present":
      return <CheckCircle2 className="h-3 w-3 text-green-600" />
    case "Late":
      return <AlertCircle className="h-3 w-3 text-yellow-600" />
    case "Absent":
      return <XCircle className="h-3 w-3 text-red-600" />
    default:
      return null
  }
}

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
          <div className="text-3xl font-bold text-[#2a6fb5] mb-0.5 tabular-nums">{value}%</div>
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
  const averageAttendance = attendanceData.reduce((acc, curr) => acc + curr.value, 0) / attendanceData.length

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left side - Weekly Overview */}
      <div className="space-y-2.5">
        {attendanceData.map((day, index) => (
          <div key={day.day} className="space-y-0.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                {getStatusIcon(day.status)}
                <span className="font-medium">{day.day}</span>
              </div>
              <span className={`${getStatusColor(day.status)} text-[10px]`}>{day.status}</span>
            </div>
            <Progress value={day.value} className="h-1" />
          </div>
        ))}
        
        {/* Overall Stats */}
        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t">
          <div>
            <div className="text-lg font-bold text-green-600">3</div>
            <div className="text-[10px] text-muted-foreground">Present</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">1</div>
            <div className="text-[10px] text-muted-foreground">Late</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">1</div>
            <div className="text-[10px] text-muted-foreground">Absent</div>
          </div>
        </div>
      </div>

      {/* Right side - Gauge */}
      <div className="flex flex-col items-center justify-between">
        <Gauge value={Math.round(averageAttendance)} size="sm" />
        <div className="w-full space-y-0.5 text-center">
          <div className="text-[10px] text-muted-foreground">
            Required: 75%
          </div>
          <Progress value={75} className="h-1 bg-green-100">
            <div className="h-full bg-green-600 transition-all" style={{ width: '75%' }} />
          </Progress>
        </div>
      </div>
    </div>
  )
}

export function AttendanceChartCompact() {
  const averageAttendance = attendanceData.reduce((acc, curr) => acc + curr.value, 0) / attendanceData.length

  return (
    <div className="space-y-4">
      {/* Weekly Overview */}
      <div className="space-y-2.5">
        {attendanceData.map((day, index) => (
          <div key={day.day} className="space-y-0.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                {getStatusIcon(day.status)}
                <span className="font-medium">{day.day}</span>
              </div>
              <span className={`${getStatusColor(day.status)} text-[10px]`}>{day.status}</span>
            </div>
            <Progress value={day.value} className="h-1" />
          </div>
        ))}
      </div>

      {/* Overall Stats */}
      <div className="border-t pt-3">
        <div className="grid grid-cols-3 gap-2 text-center mb-3">
          <div>
            <div className="text-lg font-bold text-green-600">3</div>
            <div className="text-[10px] text-muted-foreground">Present</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">1</div>
            <div className="text-[10px] text-muted-foreground">Late</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">1</div>
            <div className="text-[10px] text-muted-foreground">Absent</div>
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Overall</span>
            <span className="font-medium">{Math.round(averageAttendance)}%</span>
          </div>
          <Progress value={averageAttendance} className="h-1" />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Required: 75%</span>
            <span>Current: {Math.round(averageAttendance)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
