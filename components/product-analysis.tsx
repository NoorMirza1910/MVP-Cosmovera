"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Info, Shield, AlertTriangle, ChevronDown, ChevronUp, Star, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (isLoading) {
    return (
      <Card className="w-full border-2 border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="animate-spin mr-2">
              <div className="h-4 w-4 rounded-full border-2 border-rose-500 border-t-transparent"></div>
            </div>
            <span className="text-slate-900">Analyzing Product...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const extractedIngredients = analysis.ingredients || []

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

  const initialContent = analysis.analysis.substring(0, 300) + "..."
  const displayContent = mounted ? (expanded ? analysis.analysis : initialContent) : initialContent

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="w-full border-2 border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-rose-100 p-2 mr-3">
                <Sparkles className="h-5 w-5 text-rose-500" />
              </div>
              <span className="text-slate-900">Product Analysis</span>
            </div>
            {analysis.safety && (
              <Badge className={`${safetyColor} flex items-center px-3 py-1 rounded-full shadow-sm`}>
                {safetyIcon}
                <span className="ml-1">{analysis.safety}</span>
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Main analysis */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center text-slate-800">
                <Shield className="h-5 w-5 mr-2 text-rose-500" />
                Analysis Summary
              </h3>
              <div className="text-gray-700 whitespace-pre-line bg-slate-50 rounded-lg p-4">
                {displayContent}
                {mounted && analysis.analysis.length > 300 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center text-rose-600 hover:text-rose-800 font-medium mt-2"
                  >
                    {expanded ? (
                      <>
                        Show Less <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show More <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>

            {/* Ingredients */}
            {extractedIngredients.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center text-slate-800">
                  <Star className="h-5 w-5 mr-2 text-amber-500" />
                  Key Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {extractedIngredients.map((ingredient, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-white border-rose-100 text-slate-700 hover:bg-rose-50 transition-colors"
                    >
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Concerns */}
            {analysis.concerns && analysis.concerns.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center text-slate-800">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Potential Concerns
                </h3>
                <ul className="space-y-2">
                  {analysis.concerns.map((concern, index) => (
                    <li 
                      key={index}
                      className="flex items-start bg-amber-50 rounded-lg p-3"
                    >
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-amber-800">{concern}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center text-slate-800">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li 
                      key={index}
                      className="flex items-start bg-green-50 rounded-lg p-3"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-green-800">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

