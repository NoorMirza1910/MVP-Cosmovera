"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Filter, ShoppingCart, Shield, AlertTriangle } from "lucide-react"

// Sample product data - in a real app, this would come from an API
const sampleProducts = [
  {
    id: 1,
    name: "Hydrating Facial Cleanser",
    brand: "CeraVe",
    category: "Cleansers",
    rating: 4.8,
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
    safetyScore: 95,
    match: 98,
    ingredients: ["Ceramides", "Hyaluronic Acid", "Glycerin"],
    concerns: [],
    benefits: ["Hydrating", "Non-comedogenic", "Fragrance-free"],
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    brand: "Timeless",
    category: "Serums",
    rating: 4.6,
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    safetyScore: 90,
    match: 95,
    ingredients: ["Vitamin C (L-Ascorbic Acid)", "Vitamin E", "Ferulic Acid"],
    concerns: ["May cause sensitivity in some users"],
    benefits: ["Brightening", "Antioxidant protection", "Evens skin tone"],
  },
  {
    id: 3,
    name: "Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    category: "Serums",
    rating: 4.5,
    price: 5.9,
    image: "/placeholder.svg?height=200&width=200",
    safetyScore: 98,
    match: 92,
    ingredients: ["Niacinamide", "Zinc PCA", "Glycerin"],
    concerns: [],
    benefits: ["Reduces pores", "Controls sebum", "Improves texture"],
  },
  {
    id: 4,
    name: "Moisturizing Cream",
    brand: "La Roche-Posay",
    category: "Moisturizers",
    rating: 4.7,
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
    safetyScore: 92,
    match: 90,
    ingredients: ["Ceramide-3", "Niacinamide", "Glycerin", "Shea Butter"],
    concerns: ["Contains fragrance"],
    benefits: ["Deeply moisturizing", "Restores skin barrier", "Non-greasy"],
  },
  {
    id: 5,
    name: "Mineral Sunscreen SPF 50",
    brand: "EltaMD",
    category: "Sunscreens",
    rating: 4.9,
    price: 36.0,
    image: "/placeholder.svg?height=200&width=200",
    safetyScore: 97,
    match: 96,
    ingredients: ["Zinc Oxide", "Vitamin E", "Hyaluronic Acid"],
    concerns: [],
    benefits: ["Broad spectrum protection", "Reef-safe", "Good for sensitive skin"],
  },
  {
    id: 6,
    name: "Retinol Serum",
    brand: "Paula's Choice",
    category: "Treatments",
    rating: 4.7,
    price: 42.0,
    image: "/placeholder.svg?height=200&width=200",
    safetyScore: 85,
    match: 88,
    ingredients: ["Retinol", "Peptides", "Vitamin C"],
    concerns: ["May cause irritation for beginners", "Not for use during pregnancy"],
    benefits: ["Anti-aging", "Improves texture", "Reduces fine lines"],
  },
]

export default function RecommendationsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("match")

  const filteredProducts =
    activeCategory === "all"
      ? sampleProducts
      : sampleProducts.filter((product) => product.category.toLowerCase() === activeCategory.toLowerCase())

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "match") return b.match - a.match
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "safety") return b.safetyScore - a.safetyScore
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0A1A3D] mb-6">Your Personalized Recommendations</h1>
        <p className="text-gray-600 mb-8">
          Based on your skin profile, we've curated a selection of products that match your skin type, concerns, and
          goals. Each product has been analyzed for safety and effectiveness.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList className="grid grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
                All
              </TabsTrigger>
              <TabsTrigger value="cleansers" onClick={() => setActiveCategory("cleansers")}>
                Cleansers
              </TabsTrigger>
              <TabsTrigger value="serums" onClick={() => setActiveCategory("serums")}>
                Serums
              </TabsTrigger>
              <TabsTrigger value="moisturizers" onClick={() => setActiveCategory("moisturizers")}>
                Moisturizers
              </TabsTrigger>
              <TabsTrigger value="sunscreens" onClick={() => setActiveCategory("sunscreens")}>
                Sunscreens
              </TabsTrigger>
              <TabsTrigger value="treatments" onClick={() => setActiveCategory("treatments")}>
                Treatments
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              className="border rounded-md px-3 py-1 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="match">Best Match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="safety">Safety Score</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="border-2 border-gray-100 hover:border-[#D4AF37] transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge
                    className={`${
                      product.match >= 95
                        ? "bg-green-100 text-green-800"
                        : product.match >= 90
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product.match}% Match
                  </Badge>
                  <Badge
                    className={`${
                      product.safetyScore >= 95
                        ? "bg-green-100 text-green-800"
                        : product.safetyScore >= 90
                          ? "bg-blue-100 text-blue-800"
                          : product.safetyScore >= 85
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    {product.safetyScore}/100
                  </Badge>
                </div>

                <div className="flex justify-center mb-4">
                  <div className="relative h-40 w-40 bg-gray-50 rounded-md overflow-hidden">
                    {/* Product image with product name overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-2">
                        <div className="text-sm font-medium text-gray-700">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.brand}</div>
                      </div>
                    </div>

                    {/* Placeholder image */}
                    <div
                      className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${product.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>

                    {/* Category badge */}
                    <div className="absolute bottom-0 right-0 bg-gray-800/70 text-white text-xs px-2 py-1 rounded-tl-md">
                      {product.category}
                    </div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <h3 className="font-semibold text-lg text-[#0A1A3D]">{product.name}</h3>
                  <div className="flex items-center justify-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                  </div>
                  <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">Key Ingredients:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.ingredients.map((ingredient, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">Benefits:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50 text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {product.concerns.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                        <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                        Potential Concerns:
                      </h4>
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                        {product.concerns.map((concern, idx) => (
                          <li key={idx}>{concern}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="px-6 py-4 border-t border-gray-100">
                <Button className="w-full bg-[#0A1A3D] hover:bg-[#152A5C]">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Product
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No products found in this category. Try another category or update your profile.
            </p>
          </div>
        )}

        <div className="bg-gray-50 p-6 rounded-lg mt-12">
          <h3 className="text-lg font-semibold text-[#0A1A3D] mb-2">How We Match Products</h3>
          <p className="text-gray-600">
            Our AI analyzes thousands of products and ingredients to find the best matches for your skin profile. We
            consider your skin type, concerns, sensitivities, and goals to provide personalized recommendations. Premium
            members receive more detailed analyses and can filter by specific ingredients.
          </p>
        </div>
      </div>
    </div>
  )
}

