"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { CartItem as CartItemType } from "@/lib/types"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-4 border-b last:border-0">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{item.name}</h3>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right shrink-0">
        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </div>
  )
}
