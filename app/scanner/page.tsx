"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scan, Camera, Upload, X, AlertTriangle } from "lucide-react"
import { analyzeProduct } from "../actions/analyze-product"
import ProductAnalysis from "@/components/product-analysis"
import { motion } from "framer-motion"

export default function ScannerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      setAnalysisResult(null)
      setError(null)
    }
  }

  const handleCameraCapture = async () => {
    // This is a placeholder for camera functionality
    // In a real implementation, you would use the Web Camera API
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setAnalysisResult(null)
    setError(null)
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  const handleAnalyzeProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedImage) {
      setError("Please select an image first")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await analyzeProduct(formData)

      if (result.success) {
        setAnalysisResult(result.analysis)
      } else {
        setError(result.error || "Failed to analyze product")
      }
    } catch (err) {
      setError("An error occurred during analysis. This may be due to server-side restrictions.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">AI Product Safety Scanner</h1>
        <p className="text-gray-600 mb-8">
          Scan product labels or upload images to analyze ingredient safety. Vera will highlight potential allergens,
          irritants, or harmful substances based on your skin profile.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-2 border-gray-100 hover:border-rose-200 transition-all h-full">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <Camera className="h-12 w-12 text-rose-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Take a Photo</h3>
              <p className="text-gray-500 mb-4">Use your camera to scan the product label or barcode</p>
              <Button className="bg-slate-900 hover:bg-slate-800" onClick={handleCameraCapture}>
                Open Camera
                <Scan className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-100 hover:border-rose-200 transition-all h-full">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <Upload className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload an Image</h3>
              <p className="text-gray-500 mb-4">Upload an existing photo of the product label</p>
              <form ref={formRef} onSubmit={handleAnalyzeProduct} className="w-full flex flex-col items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  className="bg-slate-900 hover:bg-slate-800 mb-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Image
                  <Upload className="ml-2 h-4 w-4" />
                </Button>

                {selectedImage && (
                  <div className="mt-4 relative w-full">
                    <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Selected product"
                        className="w-full h-auto max-h-[300px] object-contain"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                      >
                        <X className="h-4 w-4 text-gray-700" />
                      </button>
                    </div>
                    <Button type="submit" className="bg-rose-600 hover:bg-rose-700 mt-4 w-full" disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze with Vera
                          <Scan className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-8"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {isAnalyzing && (
          <div className="mb-8">
            <ProductAnalysis analysis={{ analysis: "" }} isLoading={true} />
          </div>
        )}

        {analysisResult && !isAnalyzing && (
          <div className="mb-8">
            <ProductAnalysis analysis={analysisResult} />
          </div>
        )}

        <Card className="border-2 border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">How It Works</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-600">
            <li>Take a clear photo of the product ingredient list or barcode</li>
            <li>Vera analyzes the ingredients against safety databases</li>
            <li>Receive a detailed safety report highlighting potential concerns</li>
            <li>Get personalized recommendations based on your skin profile</li>
          </ol>
        </Card>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Pro Tip</h3>
          <p className="text-gray-600">
            For best results, ensure good lighting and a clear view of the entire ingredient list. Premium members get
            unlimited scans and detailed ingredient analysis.
          </p>
        </div>
      </div>
    </div>
  )
}

