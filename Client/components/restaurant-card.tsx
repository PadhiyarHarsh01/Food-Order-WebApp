import Link from "next/link"
import Image from "next/image"
import { Star, Clock, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Restaurant } from "@/lib/types"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-lg font-semibold text-muted-foreground">Currently Closed</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground gap-1">
              <Leaf className="h-3 w-3" />
              Pure Veg
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{restaurant.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{restaurant.cuisine.join(" • ")}</p>
            </div>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md shrink-0">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <span>•</span>
            <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
