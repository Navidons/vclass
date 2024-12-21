'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const modules = [
  { id: 1, name: "Introduction to Computer Science", code: "CS101" },
  { id: 2, name: "Web Development", code: "CS202" },
  { id: 3, name: "Database Systems", code: "CS303" },
  { id: 4, name: "Software Engineering", code: "CS404" },
]

export function ModulesCarousel() {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-semibold text-[#2a6fb5]">My Modules</h2>
      <Carousel>
        <CarouselContent>
          {modules.map((module) => (
            <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#2a6fb5]">{module.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <p className="text-sm text-gray-500">Code: {module.code}</p>
                  </CardDescription>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
