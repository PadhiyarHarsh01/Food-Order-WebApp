"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { User } from "./types"
import { authAPI, usersAPI } from "./api"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, email: string, password: string, phone: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const profile = await usersAPI.getProfile()
          setUser(profile)
        } catch (error) {
          console.error("Failed to restore user session:", error)
          localStorage.removeItem("token")
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' }
      }
      const response = await authAPI.login({ email, password })
      if (response.token) {
        localStorage.setItem("token", response.token)
        setUser(response.user)
        return { success: true }
      }
      return { success: false, error: 'Login failed' }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      console.error("Login error:", error)
      return { success: false, error: errorMessage }
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string, phone: string) => {
    try {
      if (!name || !email || !password || !phone) {
        return { success: false, error: 'All fields are required' }
      }
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' }
      }
      const response = await authAPI.register({ name, email, password, phone })
      if (response.token) {
        localStorage.setItem("token", response.token)
        setUser(response.user)
        return { success: true }
      }
      return { success: false, error: 'Signup failed' }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed'
      console.error("Signup error:", error)
      return { success: false, error: errorMessage }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
