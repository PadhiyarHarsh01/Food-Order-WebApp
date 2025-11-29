"use client"

import Link from "next/link"
import { ShoppingCart, User, Leaf, Menu, X, LayoutDashboard } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const { itemCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">FoodieSpot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link
            href="/restaurants"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Restaurants
          </Link>
          {isAuthenticated && (
            <Link
              href="/orders"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              My Orders
            </Link>
          )}
          <Link
            href="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto flex flex-col gap-2 p-4">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/restaurants"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Restaurants
            </Link>
            {isAuthenticated && (
              <Link
                href="/orders"
                className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Orders
              </Link>
            )}
            <Link
              href="/admin"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
