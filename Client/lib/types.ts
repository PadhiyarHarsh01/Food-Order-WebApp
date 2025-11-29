export interface Restaurant {
  id: string
  name: string
  image: string
  cuisine: string[]
  rating: number
  deliveryTime: string
  deliveryFee: number
  minOrder: number
  isOpen: boolean
  address: string
  description: string
}

export interface MenuItem {
  id: string
  restaurantId: string
  name: string
  description: string
  price: number
  image: string
  category: string
  cuisine: string
  isVeg: true
  isPopular?: boolean
  isSpicy?: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Order {
  id: string
  userId: string
  restaurantId: string
  restaurantName: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: "pending" | "confirmed" | "preparing" | "out-for-delivery" | "delivered"
  createdAt: string
  deliveryAddress: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  addresses: string[]
}
