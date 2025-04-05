import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check, X, ArrowRight } from "lucide-react"

export default function PremiumPage() {
  const features = [
    {
      name: "Product Scans",
      free: "5 per month",
      premium: "Unlimited",
    },
    {
      name: "Voice Assistant",
      free: "Basic queries",
      premium: "Unlimited detailed consultations",
    },
    {
      name: "Myth-Buster",
      free: "10 queries per month",
      premium: "Unlimited with scientific references",
    },
    {
      name: "Ingredient Analysis",
      free: "Basic",
      premium: "Detailed with research citations",
    },
    {
      name: "Product Recommendations",
      free: "Limited selection",
      premium: "Full personalized catalog",
    },
    {
      name: "Routine Builder",
      free: <X className="h-4 w-4 text-red-500 mx-auto" />,
      premium: <Check className="h-4 w-4 text-green-500 mx-auto" />,
    },
    {
      name: "Skin Diary Tracking",
      free: <X className="h-4 w-4 text-red-500 mx-auto" />,
      premium: <Check className="h-4 w-4 text-green-500 mx-auto" />,
    },
    {
      name: "Priority Support",
      free: <X className="h-4 w-4 text-red-500 mx-auto" />,
      premium: <Check className="h-4 w-4 text-green-500 mx-auto" />,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#0A1A3D] mb-4">Upgrade to Premium</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of our AI beauty assistant with unlimited access to all features and exclusive
            premium benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-gray-100">
            <CardHeader className="text-center pb-2">
              <h2 className="text-2xl font-bold text-[#0A1A3D]">Free</h2>
              <p className="text-gray-500">Basic features</p>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <p className="text-4xl font-bold text-[#0A1A3D]">$0</p>
              <p className="text-gray-500">Forever</p>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button variant="outline" className="w-full mb-6">
                Current Plan
              </Button>

              <div className="space-y-4 w-full">
                {features.map((feature, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">{feature.name}</span>
                    <span className="text-gray-500">
                      {typeof feature.free === "string" ? feature.free : feature.free}
                    </span>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>

          <Card className="border-2 border-[#D4AF37] relative">
            <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#0A1A3D] px-4 py-1 text-sm font-semibold rounded-bl-lg">
              RECOMMENDED
            </div>
            <CardHeader className="text-center pb-2">
              <h2 className="text-2xl font-bold text-[#0A1A3D]">Premium</h2>
              <p className="text-gray-500">All features included</p>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <p className="text-4xl font-bold text-[#0A1A3D]">$9.99</p>
              <p className="text-gray-500">per month</p>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full mb-6 bg-[#D4AF37] hover:bg-[#C09C2C] text-[#0A1A3D]">
                Upgrade Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="space-y-4 w-full">
                {features.map((feature, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">{feature.name}</span>
                    <span className="font-medium text-[#0A1A3D]">
                      {typeof feature.premium === "string" ? feature.premium : feature.premium}
                    </span>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-xl font-semibold text-[#0A1A3D] mb-4">Premium Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="rounded-full bg-[#D4AF37] p-2 mr-4">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#0A1A3D]">Unlimited Product Scans</h4>
                <p className="text-gray-600">
                  Scan as many products as you want to check their safety and compatibility with your skin.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="rounded-full bg-[#D4AF37] p-2 mr-4">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#0A1A3D]">Advanced AI Consultations</h4>
                <p className="text-gray-600">
                  Get detailed advice and recommendations from our advanced AI beauty assistant.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="rounded-full bg-[#D4AF37] p-2 mr-4">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#0A1A3D]">Personalized Routine Builder</h4>
                <p className="text-gray-600">
                  Create and track custom skincare routines tailored to your specific needs.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="rounded-full bg-[#D4AF37] p-2 mr-4">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#0A1A3D]">Priority Support</h4>
                <p className="text-gray-600">Get priority access to our support team for any questions or concerns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

