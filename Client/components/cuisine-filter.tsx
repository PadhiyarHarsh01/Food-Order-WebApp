"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cuisineTypes } from "@/lib/mock-data"

interface CuisineFilterProps {
  selected: string
  onSelect: (cuisine: string) => void
}

export function CuisineFilter({ selected, onSelect }: CuisineFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        {cuisineTypes.map((cuisine) => (
          <Button
            key={cuisine}
            variant={selected === cuisine ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(cuisine)}
            className="rounded-full"
          >
            {cuisine}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
