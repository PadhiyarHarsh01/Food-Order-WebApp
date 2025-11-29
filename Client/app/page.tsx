import { HeroSection } from "@/components/hero-section"
import { RestaurantCard } from "@/components/restaurant-card"
import { restaurants } from "@/lib/mock-data"

export default function HomePage() {
  const featuredRestaurants = restaurants.filter((r) => r.isOpen).slice(0, 4)

  return (
    <div>
      <HeroSection />

      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Restaurants</h2>
            <p className="text-muted-foreground mt-1">Top-rated vegetarian spots near you</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Why Choose FoodieSpot?</h2>
            <p className="text-muted-foreground">The best vegetarian food delivery experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🥗</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Curated Restaurants</h3>
              <p className="text-sm text-muted-foreground">
                Hand-picked vegetarian restaurants with verified quality standards
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Quick and reliable delivery to your doorstep in minutes</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Safe and secure checkout with multiple payment options</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
