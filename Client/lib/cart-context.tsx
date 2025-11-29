"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { CartItem, MenuItem } from "./types"

interface CartContextType {
  items: CartItem[]
  restaurantId: string | null
  restaurantName: string | null
  addItem: (item: MenuItem, restaurantName: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [restaurantId, setRestaurantId] = useState<string | null>(null)
  const [restaurantName, setRestaurantName] = useState<string | null>(null)

  const addItem = useCallback(
    (item: MenuItem, restName: string) => {
      setItems((prev) => {
        // If cart has items from different restaurant, clear it first
        if (restaurantId && restaurantId !== item.restaurantId) {
          setRestaurantId(item.restaurantId)
          setRestaurantName(restName)
          return [{ ...item, quantity: 1 }]
        }

        if (!restaurantId) {
          setRestaurantId(item.restaurantId)
          setRestaurantName(restName)
        }

        const existingItem = prev.find((i) => i.id === item.id)
        if (existingItem) {
          return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
        }
        return [...prev, { ...item, quantity: 1 }]
      })
    },
    [restaurantId],
  )

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => {
      const newItems = prev.filter((i) => i.id !== itemId)
      if (newItems.length === 0) {
        setRestaurantId(null)
        setRestaurantName(null)
      }
      return newItems
    })
  }, [])

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(itemId)
        return
      }
      setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)))
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    setItems([])
    setRestaurantId(null)
    setRestaurantName(null)
  }, [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        restaurantId,
        restaurantName,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
