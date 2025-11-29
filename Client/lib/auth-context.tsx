"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { User } from "./types"
import { authAPI, usersAPI } from "./api"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
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
      const response = await authAPI.login({ email, password })
      if (response.token) {
        localStorage.setItem("token", response.token)
        setUser(response.user)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    try {
      const response = await authAPI.register({ name, email, password })
      if (response.token) {
        localStorage.setItem("token", response.token)
        setUser(response.user)
        return true
      }
      return false
    } catch (error) {
      console.error("Signup error:", error)
      return false
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
