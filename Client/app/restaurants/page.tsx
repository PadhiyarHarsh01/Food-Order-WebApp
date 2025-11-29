"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { RestaurantCard } from "@/components/restaurant-card"
import { CuisineFilter } from "@/components/cuisine-filter"
import { restaurantsAPI } from "@/lib/api"

interface Restaurant {
  _id: string
  id?: string
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

export default function RestaurantsPage() {
  const [search, setSearch] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch restaurants from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true)
        const data = await restaurantsAPI.getAll()
        setRestaurants(data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch restaurants:", err)
        setError("Failed to load restaurants. Please try again later.")
        setRestaurants([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.cuisines.some((c) => c.toLowerCase().includes(search.toLowerCase()))

      const matchesCuisine =
        selectedCuisine === "All" ||
        restaurant.cuisines.some((c) => c.toLowerCase().includes(selectedCuisine.toLowerCase()))

      return matchesSearch && matchesCuisine
    })
  }, [search, selectedCuisine, restaurants])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Restaurants</h1>
        <p className="text-muted-foreground">Discover restaurants and cuisines near you</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants or cuisines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="mb-6">
        <CuisineFilter selected={selectedCuisine} onSelect={setSelectedCuisine} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-muted-foreground">Loading restaurants...</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive mb-2">{error}</p>
          <p className="text-muted-foreground">Please try refreshing the page.</p>
        </div>
      ) : filteredRestaurants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No restaurants found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard 
              key={restaurant._id || restaurant.id} 
              restaurant={{
                ...restaurant,
                id: restaurant._id || restaurant.id || "",
                cuisine: restaurant.cuisines || []
              }} 
            />
          ))}
        </div>
      )}
    </div>
  )
}
