"use client"

import { use, useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Clock, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuItemCard } from "@/components/menu-item-card"
import { restaurantsAPI, menuAPI } from "@/lib/api"
import { useCart } from "@/lib/cart-context"

interface Restaurant {
  _id: string
  name: string
  description: string
  image: string
  address: string
  city: string
  cuisines: string[]
  rating: number
  deliveryTime: number
  minimumOrder: number
}

interface MenuItem {
  _id: string
  name: string
  price: number
  description: string
  image: string
  category: string
  cuisine: string
  isVegetarian: boolean
  isAvailable: boolean
  restaurant: string
}

export default function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { itemCount, subtotal, restaurantId } = useCart()

  // Fetch restaurant and menu data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [restaurantData, menuData] = await Promise.all([
          restaurantsAPI.getById(id),
          menuAPI.getByRestaurant(id),
        ])
        setRestaurant(restaurantData)
        setMenuItems(menuData)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch restaurant data:", err)
        setError("Failed to load restaurant. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  const categories = useMemo(() => {
    const cats = [...new Set(menuItems.map((item) => item.category))]
    return ["All", ...cats]
  }, [menuItems])

  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return menuItems
    return menuItems.filter((item) => item.category === selectedCategory)
  }, [menuItems, selectedCategory])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
        <p className="text-muted-foreground">Loading restaurant...</p>
      </div>
    )
  }

  if (error || !restaurant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{error || "Restaurant not found"}</h1>
        <Button asChild>
          <Link href="/restaurants">Back to Restaurants</Link>
        </Button>
      </div>
    )
  }

  const showCartBar = restaurantId === id && itemCount > 0

  return (
    <div className="pb-24">
      {/* Header Image */}
      <div className="relative h-64 md:h-80">
        <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <Button variant="secondary" size="icon" className="absolute top-4 left-4" asChild>
          <Link href="/restaurants">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Restaurant Info */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-card rounded-xl p-6 shadow-lg border">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {restaurant.cuisines?.some((c) => c.toLowerCase().includes("vegetarian")) && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
                    🌱 Vegetarian
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-muted-foreground mb-3">{restaurant.cuisines?.join(" • ") || "Cuisine"}</p>
              <p className="text-sm text-muted-foreground max-w-xl">{restaurant.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-lg">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-semibold text-lg">{restaurant.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime} mins</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{restaurant.address}</span>
            </div>
            <div className="text-muted-foreground">
              Min order: <span className="font-medium text-foreground">${restaurant.minimumOrder.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-xl font-bold mb-4">Menu</h2>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap mb-6">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="whitespace-nowrap">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <MenuItemCard 
                  key={item._id} 
                  item={{
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    image: item.image,
                    category: item.category,
                    restaurantId: id,
                    isVegetarian: item.isVegetarian,
                  }} 
                  restaurantName={restaurant.name} 
                />
              ))}
            </div>
            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No items available in this category.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Sticky Cart Bar */}
      {showCartBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {itemCount} item{itemCount > 1 ? "s" : ""}
                </p>
                <p className="text-sm text-muted-foreground">Subtotal: ${subtotal.toFixed(2)}</p>
              </div>
              <Button asChild>
                <Link href="/cart">View Cart</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
