"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Leaf, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"
  const { login, signup } = useAuth()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [signupError, setSignupError] = useState<string | null>(null)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", phone: "" })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setIsLoading(true)
    const result = await login(loginData.email, loginData.password)
    setIsLoading(false)

    if (result.success) {
      toast({ title: "Welcome back!", description: "You have successfully logged in." })
      router.push(redirect)
    } else {
      const errorMsg = result.error || "Please check your credentials."
      setLoginError(errorMsg)
      toast({ title: "Login failed", description: errorMsg, variant: "destructive" })
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError(null)
    setIsLoading(true)
    const result = await signup(signupData.name, signupData.email, signupData.password, signupData.phone)
    setIsLoading(false)

    if (result.success) {
      toast({ title: "Account created!", description: "Welcome to FoodieSpot." })
      router.push(redirect)
    } else {
      const errorMsg = result.error || "Please try again."
      setSignupError(errorMsg)
      toast({ title: "Signup failed", description: errorMsg, variant: "destructive" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">FoodieSpot</span>
          </Link>
        </div>

        <Card>
          <Tabs defaultValue="login">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <CardDescription>Enter your credentials to access your account.</CardDescription>
                  {loginError && (
                    <div className="p-3 bg-red-100 text-red-700 rounded text-sm">{loginError}</div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="john@example.com"
                      value={loginData.email}
                      onChange={(e) => {
                        setLoginData((prev) => ({ ...prev, email: e.target.value }))
                        setLoginError(null)
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => {
                        setLoginData((prev) => ({ ...prev, password: e.target.value }))
                        setLoginError(null)
                      }}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <CardDescription>Create an account to start ordering delicious food.</CardDescription>
                  {signupError && (
                    <div className="p-3 bg-red-100 text-red-700 rounded text-sm">{signupError}</div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signupData.name}
                      onChange={(e) => {
                        setSignupData((prev) => ({ ...prev, name: e.target.value }))
                        setSignupError(null)
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="john@example.com"
                      value={signupData.email}
                      onChange={(e) => {
                        setSignupData((prev) => ({ ...prev, email: e.target.value }))
                        setSignupError(null)
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={signupData.phone}
                      onChange={(e) => {
                        setSignupData((prev) => ({ ...prev, phone: e.target.value }))
                        setSignupError(null)
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupData.password}
                      onChange={(e) => {
                        setSignupData((prev) => ({ ...prev, password: e.target.value }))
                        setSignupError(null)
                      }}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
