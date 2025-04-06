"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Scan, Mic, BookOpen, User, Star, ShieldCheck, Sparkles, Zap } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import HeroAnimation from "@/components/hero-animation"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const scrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-slate-900 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-white/10 text-white/80 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 inline-block mr-1 text-rose-400" /> AI-Powered Beauty Analysis
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Meet <span className="text-rose-500">Cosmovera</span>, Your Beauty AI
                </h1>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  Vera, our AI assistant, analyzes thousands of products to find the safest, most effective options for
                  your unique skin profile.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link href="/auth/sign-in">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                  onClick={scrollToHowItWorks}
                >
                  Learn More
                </Button>
              </div>

              {/* App features highlight */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-rose-500/20 p-1 mr-2">
                      <Scan className="h-3 w-3 text-rose-400" />
                    </div>
                    <span className="text-xs font-medium text-white">Scan Products</span>
                  </div>
                  <p className="text-[10px] text-white/70">Analyze ingredients with our AI scanner</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-sky-500/20 p-1 mr-2">
                      <ShieldCheck className="h-3 w-3 text-sky-400" />
                    </div>
                    <span className="text-xs font-medium text-white">Safety Check</span>
                  </div>
                  <p className="text-[10px] text-white/70">Identify allergens and irritants</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-purple-500/20 p-1 mr-2">
                      <Mic className="h-3 w-3 text-purple-400" />
                    </div>
                    <span className="text-xs font-medium text-white">Ask Vera</span>
                  </div>
                  <p className="text-[10px] text-white/70">Get personalized beauty advice</p>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-medium"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-white/70">
                  Trusted by <span className="font-semibold text-white">10,000+</span> beauty enthusiasts
                </div>
              </div>
            </div>
            <div className="lg:flex justify-center">
              <HeroAnimation />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-rose-500/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl"></div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-16 bg-white scroll-mt-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block px-3 py-1 mb-2 text-sm font-medium rounded-full bg-rose-100 text-rose-800">
              How Cosmovera Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">
              Your Beauty Journey with Vera
            </h2>
            <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed">
              Discover how our AI assistant helps you make smarter beauty choices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-slate-100 rounded-xl p-6 h-full">
                <div className="rounded-full bg-rose-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Scan className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Scan Products</h3>
                <p className="text-slate-500">
                  Use your camera to scan product labels or upload images. Vera instantly recognizes ingredients.
                </p>
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                  1
                </div>
              </div>
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight className="h-8 w-8 text-slate-300" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-100 rounded-xl p-6 h-full">
                <div className="rounded-full bg-sky-100 w-12 h-12 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Get Analysis</h3>
                <p className="text-slate-500">
                  Vera analyzes ingredients for safety, efficacy, and compatibility with your unique skin profile.
                </p>
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                  2
                </div>
              </div>
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight className="h-8 w-8 text-slate-300" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-100 rounded-xl p-6 h-full">
                <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Make Smart Choices</h3>
                <p className="text-slate-500">
                  Receive personalized recommendations and build a safer, more effective beauty routine.
                </p>
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block px-3 py-1 mb-2 text-sm font-medium rounded-full bg-slate-200 text-slate-800">
              Premium Features
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                Smart Beauty Tools
              </h2>
              <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our AI-powered tools designed to help you make informed decisions about your beauty products.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <FeatureCard
              icon={<Scan className="h-10 w-10 text-rose-500" />}
              title="AI Product Scanner"
              description="Scan product labels to analyze ingredient safety and identify potential allergens or irritants."
              href="/scanner"
            />
            <FeatureCard
              icon={<Mic className="h-10 w-10 text-sky-500" />}
              title="Vera Voice Assistant"
              description="Ask Vera questions about products, get personalized recommendations, and beauty advice through voice commands."
              href="/voice-assistant"
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-purple-500" />}
              title="Beauty Myth-Buster"
              description="Get scientifically backed answers to common beauty myths and misconceptions."
              href="/myth-buster"
            />
            <FeatureCard
              icon={<User className="h-10 w-10 text-rose-500" />}
              title="Personalized Profile"
              description="Create your skin profile to receive tailored product recommendations based on your unique needs."
              href="/profile"
            />
            <FeatureCard
              icon={<Star className="h-10 w-10 text-sky-500" />}
              title="Product Recommendations"
              description="Discover products that match your skin profile with detailed safety ratings and purchase links."
              href="/recommendations"
            />
            <FeatureCard
              icon={<ArrowRight className="h-10 w-10 text-purple-500" />}
              title="Premium Upgrade"
              description="Unlock unlimited access to all features with our premium subscription plan."
              href="/premium"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-rose-500/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Transform Your Beauty Routine?
              </h2>
              <p className="max-w-[700px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users who have discovered safer, more effective beauty products with Vera, your AI
                beauty assistant.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="/auth/sign-in">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                  Create Your Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

