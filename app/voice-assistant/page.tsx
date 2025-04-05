"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bot, Sparkles, ShieldCheck, Lightbulb, ChevronDown, MessageSquare, Zap, Star, Mic } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [pulseText, setPulseText] = useState("Click to talk with Vera")

  // Toggle listening state
  const toggleListening = () => {
    setIsListening(!isListening)

    // If we're starting to listen, set a timeout to automatically stop after 5 seconds
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false)
      }, 5000)
    }
  }

  // Cycle through different prompt texts
  useEffect(() => {
    const texts = [
      "Click to talk with Vera",
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
                  <div className="rounded-full bg-blue-500/20 p-2 mr-3">
                    <ShieldCheck className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="text-white text-sm">Get personalized advice</div>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="rounded-full bg-purple-500/20 p-2 mr-3">
                    <Zap className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="text-white text-sm">Instant product analysis</div>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="rounded-full bg-amber-500/20 p-2 mr-3">
                    <Star className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="text-white text-sm">Expert recommendations</div>
                </div>
              </div>
            </motion.div>

            {/* Custom Voice Assistant Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-10 flex flex-col items-center justify-center"
            >
              {/* Animated circles */}
              <div className="relative">
                <AnimatePresence>
                  {isListening && (
                    <>
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                          ease: "easeOut",
                        }}
                        className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rose-400/30"
                      />
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                          delay: 0.5,
                          ease: "easeOut",
                        }}
                        className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rose-400/30"
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Main button */}
                <motion.button
                  onClick={toggleListening}
                  className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center ${
                    isListening
                      ? "bg-gradient-to-br from-rose-500 to-purple-600 shadow-lg shadow-rose-500/30"
                      : "bg-gradient-to-br from-slate-700 to-slate-900 hover:from-rose-500 hover:to-purple-600"
                  } transition-colors duration-300 border border-white/20`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Microphone icon with animation */}
                  <motion.div
                    animate={
                      isListening
                        ? {
                            scale: [1, 1.2, 1],
                            transition: {
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 1.5,
                            },
                          }
                        : {}
                    }
                    className={`rounded-full p-4 ${isListening ? "bg-white/20" : "bg-rose-500/20"}`}
                  >
                    <Mic className={`h-8 w-8 ${isListening ? "text-white" : "text-rose-400"}`} />
                  </motion.div>

                  <span className={`mt-2 font-medium ${isListening ? "text-white" : "text-white/80"}`}>
                    {isListening ? "Listening..." : "Ask Vera"}
                  </span>
                </motion.button>

                {/* Vera avatar */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 p-0.5"
                >
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                    <Bot className="h-8 w-8 text-rose-400" />
                  </div>
                </motion.div>
              </div>

              {/* Pulsing text below */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={pulseText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/70 mt-8 text-center"
                >
                  {pulseText}
                </motion.p>
              </AnimatePresence>

              {/* Voice waves animation when listening */}
              {isListening && (
                <div className="mt-6 flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-rose-400"
                      animate={{
                        height: [15, 30, 15],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1,
                        delay: i * 0.1,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Scroll hint */}
          {showScrollHint && (
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              onClick={scrollToContent}
            >
              <p className="text-white/50 text-sm mb-2">Learn more</p>
              <ChevronDown className="h-6 w-6 text-white/50" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Content section below */}
      <section id="content-section" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-rose-100 text-rose-800">
              AI-Powered Beauty Expertise
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Personal Beauty Expert</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vera combines advanced AI with extensive beauty knowledge to provide personalized advice, product
              recommendations, and skincare guidance tailored to your unique needs.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 border-slate-100 hover:border-rose-200 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-rose-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Personalized Advice</h3>
                <p className="text-gray-600">
                  Get customized recommendations based on your skin type, concerns, and beauty goals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-100 hover:border-rose-200 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-sky-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Ingredient Analysis</h3>
                <p className="text-gray-600">
                  Understand product ingredients, their benefits, and potential concerns for your skin.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-100 hover:border-rose-200 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-purple-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Beauty Education</h3>
                <p className="text-gray-600">
                  Learn about skincare science, beauty techniques, and the latest industry trends.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How to use */}
          <div className="bg-gradient-to-r from-slate-50 to-rose-50 rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">How to Use Vera</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold mb-4">
                  1
                </div>
                <h4 className="font-semibold mb-2 text-slate-900">Click the Microphone</h4>
                <p className="text-gray-600">Click the microphone button to activate Vera's voice recognition.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold mb-4">
                  2
                </div>
                <h4 className="font-semibold mb-2 text-slate-900">Ask Your Question</h4>
                <p className="text-gray-600">Speak clearly and ask any beauty or skincare related question.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold mb-4">
                  3
                </div>
                <h4 className="font-semibold mb-2 text-slate-900">Get Expert Advice</h4>
                <p className="text-gray-600">Vera will respond with personalized advice and recommendations.</p>
              </div>
            </div>
          </div>

          {/* Premium callout */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-2xl font-bold mb-2">Upgrade to Premium</h3>
                <p className="text-white/70 max-w-xl">
                  Get unlimited access to Vera with advanced features, detailed analysis, priority support, and
                  exclusive content.
                </p>
              </div>
              <Link href="/premium">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 text-lg">Go Premium</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

