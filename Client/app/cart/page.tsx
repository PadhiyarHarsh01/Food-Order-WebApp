"use client"

import Link from "next/link"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/components/cart-item"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { restaurants } from "@/lib/mock-data"

export default function CartPage() {
  const { items, restaurantId, restaurantName, subtotal, clearCart } = useCart()
  const { isAuthenticated } = useAuth()

  const restaurant = restaurants.find((r) => r.id === restaurantId)
  const deliveryFee = restaurant?.deliveryFee || 0
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added any items to your cart yet.</p>
          <Button asChild>
            <Link href="/restaurants">Browse Restaurants</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href={restaurantId ? `/restaurant/${restaurantId}` : "/restaurants"}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Cart</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">From {restaurantName}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={clearCart}>
                Clear Cart
              </Button>
            </CardHeader>
            <CardContent>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              {isAuthenticated ? (
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              ) : (
                <Button className="w-full" size="lg" asChild>
                  <Link href="/login?redirect=/checkout">Sign in to Checkout</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
