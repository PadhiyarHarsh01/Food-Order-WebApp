"use client"

import type React from "react"

import { useState } from "react"
import { Package, Clock, CheckCircle2, Truck, ChefHat, DollarSign, TrendingUp, Store } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Order } from "@/lib/types"

// Mock orders for admin dashboard
const initialOrders: Order[] = [
  {
    id: "ord-101",
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
      {
        id: "item-5",
        restaurantId: "rest-1",
        name: "Samosa (2 pcs)",
        description: "",
        price: 5.99,
        image: "",
        category: "",
        cuisine: "Indian",
        isVeg: true,
        quantity: 2,
      },
    ],
    subtotal: 54.95,
    deliveryFee: 2.99,
    total: 57.94,
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
  },
  {
    id: "ord-102",
    userId: "user-2",
    restaurantId: "rest-1",
    restaurantName: "Spice Garden",
    items: [
      {
        id: "item-3",
        restaurantId: "rest-1",
        name: "Masala Dosa",
        description: "",
        price: 10.99,
        image: "",
        category: "",
        cuisine: "South Indian",
        isVeg: true,
        quantity: 2,
      },
      {
        id: "item-4",
        restaurantId: "rest-1",
        name: "Dal Makhani",
        description: "",
        price: 11.99,
        image: "",
        category: "",
        cuisine: "Indian",
        isVeg: true,
        quantity: 1,
      },
    ],
    subtotal: 33.97,
    deliveryFee: 2.99,
    total: 36.96,
    status: "confirmed",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    deliveryAddress: "456 Oak Avenue, Suite 200, Brooklyn, NY 11201",
  },
  {
    id: "ord-103",
    userId: "user-3",
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
        quantity: 1,
      },
    ],
    subtotal: 14.99,
    deliveryFee: 2.99,
    total: 17.98,
    status: "preparing",
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    deliveryAddress: "789 Pine Street, Floor 3, Queens, NY 11375",
  },
  {
    id: "ord-104",
    userId: "user-4",
    restaurantId: "rest-1",
    restaurantName: "Spice Garden",
    items: [
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
        quantity: 3,
      },
    ],
    subtotal: 38.97,
    deliveryFee: 2.99,
    total: 41.96,
    status: "out-for-delivery",
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    deliveryAddress: "321 Elm Road, Apt 12C, Manhattan, NY 10016",
  },
  {
    id: "ord-105",
    userId: "user-5",
    restaurantId: "rest-1",
    restaurantName: "Spice Garden",
    items: [
      {
        id: "item-4",
        restaurantId: "rest-1",
        name: "Dal Makhani",
        description: "",
        price: 11.99,
        image: "",
        category: "",
        cuisine: "Indian",
        isVeg: true,
        quantity: 2,
      },
      {
        id: "item-5",
        restaurantId: "rest-1",
        name: "Samosa (2 pcs)",
        description: "",
        price: 5.99,
        image: "",
        category: "",
        cuisine: "Indian",
        isVeg: true,
        quantity: 3,
      },
    ],
    subtotal: 41.95,
    deliveryFee: 2.99,
    total: 44.94,
    status: "delivered",
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
    deliveryAddress: "555 Broadway, Unit 8, Bronx, NY 10451",
  },
]

const statusConfig: Record<Order["status"], { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-600 border-yellow-200", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-500/10 text-blue-600 border-blue-200", icon: CheckCircle2 },
  preparing: { label: "Preparing", color: "bg-orange-500/10 text-orange-600 border-orange-200", icon: ChefHat },
  "out-for-delivery": {
    label: "Out for Delivery",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
    icon: Truck,
  },
  delivered: { label: "Delivered", color: "bg-green-500/10 text-green-600 border-green-200", icon: CheckCircle2 },
}

const nextStatus: Record<Order["status"], Order["status"] | null> = {
  pending: "confirmed",
  confirmed: "preparing",
  preparing: "out-for-delivery",
  "out-for-delivery": "delivered",
  delivered: null,
}

function getTimeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    toast({
      title: "Order updated",
      description: `Order #${orderId.slice(-3)} is now ${statusConfig[newStatus].label.toLowerCase()}.`,
    })
  }

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return !["delivered"].includes(order.status)
    return order.status === activeTab
  })

  // Stats calculations
  const todayOrders = orders.length
  const activeOrders = orders.filter((o) => o.status !== "delivered").length
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const avgOrderValue = totalRevenue / todayOrders

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <Store className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Spice Garden</h1>
                <p className="text-sm text-muted-foreground">Order Management</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
              Restaurant Open
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today&apos;s Orders</p>
                  <p className="text-2xl font-bold">{todayOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Orders</p>
                  <p className="text-2xl font-bold">{activeOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today&apos;s Revenue</p>
                  <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Order Value</p>
                  <p className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="preparing">Preparing</TabsTrigger>
                <TabsTrigger value="delivered">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">No orders in this category</div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => {
                      const StatusIcon = statusConfig[order.status].icon
                      const canAdvance = nextStatus[order.status] !== null

                      return (
                        <div key={order.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                            {/* Order Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold">Order #{order.id.slice(-3)}</span>
                                <Badge className={statusConfig[order.status].color}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {statusConfig[order.status].label}
                                </Badge>
                                <span className="text-sm text-muted-foreground">{getTimeAgo(order.createdAt)}</span>
                              </div>

                              {/* Items */}
                              <div className="text-sm text-muted-foreground mb-2">
                                {order.items.map((item, i) => (
                                  <span key={item.id}>
                                    {item.quantity}x {item.name}
                                    {i < order.items.length - 1 ? ", " : ""}
                                  </span>
                                ))}
                              </div>

                              {/* Address */}
                              <p className="text-sm text-muted-foreground truncate">
                                <span className="font-medium text-foreground">Deliver to:</span> {order.deliveryAddress}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <p className="font-semibold">${order.total.toFixed(2)}</p>
                                <p className="text-xs text-muted-foreground">
                                  {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                                </p>
                              </div>

                              {canAdvance ? (
                                <Select
                                  value={order.status}
                                  onValueChange={(value) => updateOrderStatus(order.id, value as Order["status"])}
                                >
                                  <SelectTrigger className="w-[160px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="preparing">Preparing</SelectItem>
                                    <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Button variant="outline" disabled>
                                  Completed
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
