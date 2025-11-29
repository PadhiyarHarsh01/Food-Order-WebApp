"use client"

import Image from "next/image"
import { Plus, Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { MenuItem } from "@/lib/types"

interface MenuItemCardProps {
  item: MenuItem
  restaurantName: string
}

export function MenuItemCard({ item, restaurantName }: MenuItemCardProps) {
  const { addItem, restaurantId } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (restaurantId && restaurantId !== item.restaurantId) {
      toast({
        title: "Cart cleared",
        description: "Items from the previous restaurant have been removed.",
      })
    }
    addItem(item, restaurantName)
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{item.name}</h3>
              {item.isSpicy && <Flame className="h-4 w-4 text-destructive shrink-0" />}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary">${item.price.toFixed(2)}</span>
              {item.isPopular && (
                <Badge variant="secondary" className="text-xs">
                  Popular
                </Badge>
              )}
            </div>
          </div>
          <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            <Button
              size="icon"
              className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow-lg"
              onClick={handleAddToCart}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
