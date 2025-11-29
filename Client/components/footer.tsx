import Link from "next/link"
import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">FoodieSpot</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your destination for the finest vegetarian cuisine. We connect you with the best meat-free restaurants in
              your area.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/restaurants" className="hover:text-foreground transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-foreground transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-foreground transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FoodieSpot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
