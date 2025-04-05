"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("admin@school1.com")
  const [password, setPassword] = useState("password123")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setDebugInfo(null)

    try {
      console.log("Attempting to sign in with:", { email })

      // First, check if the database is seeded
      const seedCheckResponse = await fetch("/api/seed/check")
      const seedCheckData = await seedCheckResponse.json()

      if (!seedCheckData.success || seedCheckData.users === 0) {
        setError("Database not properly seeded. Please visit /api/seed first.")
        setIsLoading(false)
        return
      }

      setDebugInfo({ seedCheck: seedCheckData })

      // Attempt to sign in
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      console.log("Sign in result:", result)
      setDebugInfo((prev: Record<string, any> | null) => ({ ...prev, signInResult: result }))

      if (result?.error) {
        setError(`Authentication failed: ${result.error}`)
        setIsLoading(false)
        return
      }

      router.push("/admin")
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please check the console for details.")
      setDebugInfo((prev: Record<string, any> | null) => ({ ...prev, error: (error as Error).message }))
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in to manage your school profile</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@school1.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Make sure to seed the database first by visiting:</p>
              <Link href="/api/seed" className="text-primary hover:underline">
                /api/seed
              </Link>
            </div>

            {debugInfo && (
              <div className="mt-4 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

