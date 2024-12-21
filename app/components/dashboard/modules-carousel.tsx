'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const modules = [
  { id: 1, name: "Introduction to Computer Science", code: "CS101" },
  { id: 2, name: "Web Development", code: "CS202" },
  { id: 3, name: "Database Systems", code: "CS303" },
  { id: 4, name: "Software Engineering", code: "CS404" },
]

export function ModulesCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {modules.map((module) => (
          <CarouselItem key={module.id} className="sm:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="h-[150px]">
                <CardHeader>
                  <CardTitle className="text-lg">{module.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-gray-500">Code: {module.code}</p>
                    <p className="text-sm text-gray-500">Next Class: Tomorrow</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
