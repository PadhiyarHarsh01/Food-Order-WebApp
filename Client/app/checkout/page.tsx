"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, CreditCard, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { restaurants } from "@/lib/mock-data"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, restaurantId, restaurantName, subtotal, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const [isProcessing, setIsProcessing] = useState(false)
  const [address, setAddress] = useState(user?.addresses[0] || "")

  const restaurant = restaurants.find((r) => r.id === restaurantId)
  const deliveryFee = restaurant?.deliveryFee || 0
  const total = subtotal + deliveryFee

  if (!isAuthenticated) {
    router.push("/login?redirect=/checkout")
    return null
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast({ title: "Address required", description: "Please enter your delivery address.", variant: "destructive" })
      return
    }

    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In production, this would call Stripe and your order API
    clearCart()
    toast({ title: "Order placed!", description: "Your order has been confirmed." })
    router.push("/orders")

    setIsProcessing(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/cart">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>
      </Button>

      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete delivery address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Stripe integration will process your payment securely. Connect Stripe to enable real payments.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="4242 4242 4242 4242" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input id="card-name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <p className="text-sm text-muted-foreground">From {restaurantName}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator />
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
              <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={isProcessing}>
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
