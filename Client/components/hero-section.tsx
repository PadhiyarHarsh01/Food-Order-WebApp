import Link from "next/link"
import { Search, Leaf, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="h-4 w-4" />
            100% Vegetarian Platform
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Delicious Vegetarian Food, <span className="text-primary">Delivered Fresh</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Explore the finest vegetarian restaurants in your area. From Indian curries to Italian pasta, discover
            cuisines that celebrate the art of meat-free cooking.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search restaurants or cuisines..." className="pl-10 h-12" />
            </div>
            <Button size="lg" className="h-12" asChild>
              <Link href="/restaurants">Browse Restaurants</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <span>Pure Veg Only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
