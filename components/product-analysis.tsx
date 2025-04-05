"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Info, Shield, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

interface ProductAnalysisProps {
  analysis: {
    analysis: string
    ingredients?: string[]
    safety?: string
    recommendations?: string[]
    concerns?: string[]
    timestamp?: string
  }
  isLoading?: boolean
}

export default function ProductAnalysis({ analysis, isLoading = false }: ProductAnalysisProps) {
  const [expanded, setExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Use useEffect to set mounted state after initial render
  useEffect(() => {
    setMounted(true)
  }, [])

  if (isLoading) {
    return (
      <Card className="w-full border-2 border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="animate-spin mr-2">
              <div className="h-4 w-4 rounded-full border-2 border-slate-900 border-t-transparent"></div>
            </div>
            Analyzing Product...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Extract ingredients from the analysis text if not provided
  const extractedIngredients = analysis.ingredients || []

  // Determine safety level and color
  let safetyColor = "bg-gray-100 text-gray-800"
  let safetyIcon = <Info className="h-4 w-4 mr-1" />

  if (analysis.safety) {
    const safety = analysis.safety.toLowerCase()
    if (safety.includes("safe") || safety.includes("good") || safety.includes("excellent")) {
      safetyColor = "bg-green-100 text-green-800"
      safetyIcon = <CheckCircle className="h-4 w-4 mr-1" />
    } else if (safety.includes("caution") || safety.includes("moderate")) {
      safetyColor = "bg-yellow-100 text-yellow-800"
      safetyIcon = <AlertTriangle className="h-4 w-4 mr-1" />
    } else if (safety.includes("unsafe") || safety.includes("poor") || safety.includes("avoid")) {
      safetyColor = "bg-red-100 text-red-800"
      safetyIcon = <AlertCircle className="h-4 w-4 mr-1" />
    }
  }

  // Always show truncated content on server-side render
  const initialContent = analysis.analysis.substring(0, 300) + "..."
  
  // Only use expanded state on client-side
  const displayContent = mounted 
    ? (expanded ? analysis.analysis : initialContent)
    : initialContent

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full border-2 border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Product Analysis</span>
            {analysis.safety && (
              <Badge className={`${safetyColor} flex items-center`}>
                {safetyIcon}
                {analysis.safety}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Main analysis */}
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-slate-700" />
                Analysis Summary
              </h3>
              <div className="text-gray-700 whitespace-pre-line">
                {displayContent}
                {mounted && analysis.analysis.length > 300 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-rose-600 hover:text-rose-800 font-medium ml-2"
                  >
                    {expanded ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            </div>

            {/* Ingredients */}
            {extractedIngredients.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {extractedIngredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-50">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Concerns */}
            {analysis.concerns && analysis.concerns.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Potential Concerns
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {analysis.concerns.map((concern, index) => (
                    <li key={index}>{concern}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

