"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // Here you would typically make an API call to verify credentials
      // For now, we'll just simulate it
      if (userId && password) {
        // TODO: Add actual authentication logic
        router.push("/profile")
      } else {
        setError("Please fill in all fields")
      }
    } catch (err) {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in to Cosmovera</CardTitle>
          <CardDescription>
            Enter your credentials to access your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="userId">
                User ID
              </label>
              <Input
                id="userId"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-500">{error}</div>
            )}
            <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
              Sign In
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-rose-600 hover:text-rose-700 font-medium">
                Register here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 