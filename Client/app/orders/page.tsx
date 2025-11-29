"use client"

import Link from "next/link"
import { Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import type { Order } from "@/lib/types"

// Mock orders for demo
const mockOrders: Order[] = [
  {
    id: "ord-1",
    userId: "user-1",
    restaurantId: "rest-1",
    restaurantName: "Spice Garden",
    items: [
      {
        id: "item-1",
        restaurantId: "rest-1",
        name: "Paneer Tikka Masala",
        description: "",
        price: 14.99,
        image: "",
        category: "",
        cuisine: "Indian",
        isVeg: true,
        quantity: 2,
      },
      {
        id: "item-2",
        restaurantId: "rest-1",
        name: "Vegetable Biryani",
        description: "",
        price: 12.99,
        image: "",
        category: "",
        cuisine: "Indian",
        isVeg: true,
        quantity: 1,
      },
    ],
    subtotal: 42.97,
    deliveryFee: 2.99,
    total: 45.96,
    status: "delivered",
    createdAt: "2024-01-15T10:30:00Z",
    deliveryAddress: "123 Main St, Apt 4B",
  },
  {
    id: "ord-2",
    userId: "user-1",
    restaurantId: "rest-2",
    restaurantName: "Pasta Paradise",
    items: [
      {
        id: "item-6",
        restaurantId: "rest-2",
        name: "Margherita Pizza",
        description: "",
        price: 15.99,
        image: "",
        category: "",
        cuisine: "Italian",
        isVeg: true,
        quantity: 1,
      },
      {
        id: "item-8",
        restaurantId: "rest-2",
        name: "Mushroom Risotto",
        description: "",
        price: 16.99,
        image: "",
        category: "",
        cuisine: "Italian",
        isVeg: true,
        quantity: 1,
      },
    ],
    subtotal: 32.98,
    deliveryFee: 3.49,
    total: 36.47,
    status: "preparing",
    createdAt: "2024-01-20T14:15:00Z",
    deliveryAddress: "123 Main St, Apt 4B",
  },
]

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-500/10 text-yellow-600",
  confirmed: "bg-blue-500/10 text-blue-600",
  preparing: "bg-orange-500/10 text-orange-600",
  "out-for-delivery": "bg-purple-500/10 text-purple-600",
  delivered: "bg-green-500/10 text-green-600",
}

const statusLabels: Record<Order["status"], string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  "out-for-delivery": "Out for Delivery",
  delivered: "Delivered",
}

export default function OrdersPage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Sign in to view orders</h1>
          <p className="text-muted-foreground mb-6">Please sign in to view your order history.</p>
          <Button asChild>
            <Link href="/login?redirect=/orders">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>

      {mockOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">Start exploring restaurants and place your first order!</p>
          <Button asChild>
            <Link href="/restaurants">Browse Restaurants</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg">{order.restaurantName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Badge className={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-sm text-muted-foreground">Total: </span>
                    <span className="font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/restaurant/${order.restaurantId}`}>
                      Reorder
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
