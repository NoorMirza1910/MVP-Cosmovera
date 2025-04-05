"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, MessageSquare, Zap, Star, Mic, MicOff, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Script from "next/script"

export default function VoiceAssistantPage() {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [pulseText, setPulseText] = useState("Talk to Vera")
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle widget load
  useEffect(() => {
    const handleWidgetLoad = () => {
      setIsWidgetLoaded(true)
    }

    window.addEventListener('elevenlabs-widget-loaded', handleWidgetLoad)
    
    return () => {
      window.removeEventListener('elevenlabs-widget-loaded', handleWidgetLoad)
    }
  }, [])

  // Cycle through different prompt texts
  useEffect(() => {
    const texts = [
      "Talk to Vera",
      "Ask about skincare routines",
      "Get product recommendations",
      "Learn about ingredients",
    ]

    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % texts.length
      setPulseText(texts[index])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Scroll to content below
  const scrollToContent = () => {
    const contentSection = document.getElementById("content-section")
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" })
      setShowScrollHint(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero section with centered voice button */}
      <section className="relative py-16 w-full px-4 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-rose-500/20 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] opacity-5 bg-repeat"></div>

          {/* Title and intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-white/10 text-white/80 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 inline-block mr-1 text-rose-400" /> AI-Powered Beauty Assistant
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Meet <span className="text-rose-400">Vera</span>, Your Beauty AI
              </h1>
              <p className="text-white/80 text-lg mb-6 max-w-lg">
                Your personal beauty AI assistant for skincare advice, product recommendations, and beauty expertise -
                all through natural conversation.
              </p>

              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="rounded-full bg-rose-500/20 p-2 mr-3">
                    <MessageSquare className="h-4 w-4 text-rose-400" />
                  </div>
                  <div className="text-white text-sm">Ask any beauty question</div>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="rounded-full bg-sky-500/20 p-2 mr-3">
                    <Zap className="h-4 w-4 text-sky-400" />
                  </div>
                  <div className="text-white text-sm">Get personalized advice</div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={scrollToContent}
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                >
                  Start Chatting
                </Button>
                <Link href="/scanner">
                  <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Try Product Scanner
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Vera avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-10 flex justify-center"
            >
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 opacity-20 blur-xl"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500/30 to-purple-600/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">✨</div>
                    <div className="text-white font-medium">Vera</div>
                    <div className="text-white/70 text-sm">Your Beauty AI</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm flex flex-col items-center cursor-pointer"
              onClick={scrollToContent}
            >
              <div className="mb-1">Scroll to chat</div>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="w-1 h-1 bg-white/70 rounded-full mt-2"
                ></motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Content section */}
      <section id="content-section" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Chat with Vera</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Ask Vera about skincare routines, product recommendations, ingredient safety, or any beauty-related questions.
              She's here to help with personalized advice based on your skin type and concerns.
            </p>
          </div>

          {/* ElevenLabs Convai Widget */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <div className="flex justify-center mb-6">
              <div className="inline-block px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4 inline-block mr-1" /> Powered by ElevenLabs
              </div>
            </div>
            
            <div className="flex justify-center">
              {isMounted && (
                <div className="w-full max-w-2xl">
                  <elevenlabs-convai agent-id="8rDteNOETBub5RLKCMEN"></elevenlabs-convai>
                </div>
              )}
            </div>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="border-2 border-slate-100 hover:border-rose-200 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="rounded-full bg-rose-500/20 p-2 mr-3">
                    <MessageSquare className="h-5 w-5 text-rose-500" />
                  </div>
                  Personalized Advice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Get tailored skincare and beauty recommendations based on your specific skin type, concerns, and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-100 hover:border-sky-200 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="rounded-full bg-sky-500/20 p-2 mr-3">
                    <Zap className="h-5 w-5 text-sky-500" />
                  </div>
                  Product Knowledge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Learn about ingredients, product formulations, and how different products work for various skin types.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-100 hover:border-purple-200 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="rounded-full bg-purple-500/20 p-2 mr-3">
                    <Star className="h-5 w-5 text-purple-500" />
                  </div>
                  Beauty Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Expand your beauty knowledge with expert insights on skincare routines, makeup techniques, and beauty trends.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials */}
          <div className="bg-slate-50 rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">What Users Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold mr-4">
                    A
                  </div>
                  <div>
                    <div className="font-medium">Alexandra</div>
                    <div className="text-slate-500 text-sm">Combination Skin</div>
                  </div>
                </div>
                <p className="text-slate-600">
                  "Vera helped me find the perfect moisturizer for my combination skin. Her recommendations were spot-on, and my skin has never looked better!"
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 font-bold mr-4">
                    M
                  </div>
                  <div>
                    <div className="font-medium">Michael</div>
                    <div className="text-slate-500 text-sm">Sensitive Skin</div>
                  </div>
                </div>
                <p className="text-slate-600">
                  "As someone with sensitive skin, I was always hesitant to try new products. Vera's ingredient analysis has been a game-changer for my skincare routine."
                </p>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Beauty Routine?</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Start chatting with Vera now and discover personalized beauty advice tailored to your unique needs.
            </p>
            <Button
              onClick={scrollToContent}
              className="bg-white text-rose-600 hover:bg-white/90"
            >
              Chat with Vera
            </Button>
          </div>
        </div>
      </section>

      {/* Load ElevenLabs Convai Widget Script */}
      <Script 
        src="https://elevenlabs.io/convai-widget/index.js" 
        async 
        type="text/javascript"
        onLoad={() => setIsWidgetLoaded(true)}
      />
    </div>
  )
}

