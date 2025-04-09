"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, AlertTriangle } from "lucide-react"
import { bustMyth } from "../actions/bust-myth"
import { motion } from "framer-motion"

export default function MythBusterPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ myth: string; truth: string; explanation: string } | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const commonMyths = [
    "Does expensive skincare always work better?",
    "Is natural always better for your skin?",
    "Do you need a separate eye cream?",
    "Does makeup cause acne?",
    "Is SPF in makeup enough sun protection?",
    "Do pores open and close with hot and cold water?",
  ]

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    setApiError(null)

    try {
      const response = await bustMyth(query)

      if (response.success) {
        setResult(response.result)
      } else {
        setApiError(response.error || "Failed to analyze this myth")
      }
    } catch (error) {
      console.error("Error analyzing myth:", error)
      setApiError("An error occurred while processing your request. This may be due to server-side restrictions.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Beauty Myth Buster</h1>
        <p className="text-gray-600 mb-8">
          Separate fact from fiction with our AI-powered beauty myth buster. Get scientifically-backed answers to common
          beauty misconceptions and questions from Vera.
        </p>

        <Card className="border-2 border-gray-100 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Input
                placeholder="Enter a beauty myth or question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
              />
              <Button
                onClick={handleSearch}
                className="bg-slate-900 hover:bg-slate-800"
                disabled={!query.trim() || isLoading}
              >
                <Search className="mr-2 h-4 w-4" />
                Analyze
              </Button>
            </div>

            {apiError && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{apiError}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="flex space-x-2">
                  <div
                    className="w-3 h-3 bg-rose-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-rose-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-rose-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}

            {result && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border-2 border-gray-100 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">Myth Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">MYTH:</h4>
                    <p className="text-gray-800">{result.myth}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">EXPLANATION:</h4>
                    <p className="text-gray-800">{result.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Common Beauty Myths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonMyths.map((myth, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto py-3 border-gray-200 hover:border-rose-400 hover:bg-gray-50"
                onClick={() => {
                  setQuery(myth)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                <BookOpen className="mr-2 h-4 w-4 text-purple-600" />
                {myth}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">About Our Myth Buster</h3>
          <p className="text-gray-600">
            Vera analyzes beauty myths and questions using scientific research and dermatological knowledge. Premium
            members get access to unlimited myth-busting queries and detailed scientific explanations.
          </p>
        </div>
      </div>
    </div>
  )
}

