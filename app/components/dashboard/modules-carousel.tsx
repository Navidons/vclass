'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Folder } from "lucide-react"

const modules = [
  { id: 1, name: "Introduction to Computer Science", code: "CS101" },
  { id: 2, name: "Web Development", code: "CS201" },
  { id: 3, name: "Database Systems", code: "CS301" },
]

export function ModulesCarousel() {
  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 3,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4 flex justify-between">
          {modules.map((module) => (
            <CarouselItem key={module.id} className="pl-2 md:pl-4 flex-[0_0_31%]">
              <Card 
                className="text-white border-none cursor-pointer"
                style={{
                  backgroundColor: 'var(--vu-red)',
                  height: '150px',
                  width: '100%',
                  borderRadius: '5px',
                  padding: '20px',
                  margin: '10px',
                  textAlign: 'left'
                }}
              >
                <CardContent className="flex flex-col h-full p-0">
                  <Folder className="h-8 w-8 mb-4" />
                  <div className="space-y-2 flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-lg leading-tight text-white">
                      {module.name}
                    </h3>
                    <p className="text-white/90">
                      ({module.code})
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
