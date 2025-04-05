"use client"
import { motion } from "framer-motion"
import { Sparkles, Scan, ShieldCheck, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export default function HeroAnimation() {
  // Use state to track if component is mounted
  const [isMounted, setIsMounted] = useState(false)
  
  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Predefined particle positions to avoid random values during hydration
  const particles = [
    { x: -198.21, y: -24.82, scale: 0.82, opacity: 0.75 },
    { x: -139.48, y: -131.01, scale: 0.50, opacity: 0.32 },
    { x: -194.11, y: 31.65, scale: 0.94, opacity: 0.51 },
    { x: 134.82, y: 178.06, scale: 0.85, opacity: 0.78 },
    { x: -198.44, y: -6.21, scale: 0.51, opacity: 0.64 },
    { x: -45.14, y: -175.31, scale: 0.56, opacity: 0.64 },
    { x: 189.25, y: 100.92, scale: 0.78, opacity: 0.79 },
    { x: 105.70, y: 187.30, scale: 0.62, opacity: 0.49 },
    { x: 198.02, y: -95.10, scale: 0.99, opacity: 0.35 },
    { x: -52.92, y: -194.82, scale: 0.82, opacity: 0.80 },
    { x: -76.29, y: 148.35, scale: 0.80, opacity: 0.40 },
    { x: -50.98, y: 183.11, scale: 0.70, opacity: 0.65 },
    { x: 126.20, y: -141.64, scale: 0.71, opacity: 0.45 },
    { x: 164.08, y: 77.80, scale: 0.65, opacity: 0.31 },
    { x: -35.30, y: -104.69, scale: 0.54, opacity: 0.45 },
    { x: -191.26, y: -88.79, scale: 0.62, opacity: 0.45 },
    { x: -95.74, y: -53.13, scale: 0.74, opacity: 0.54 },
    { x: -143.43, y: -19.03, scale: 0.59, opacity: 0.53 },
    { x: -151.99, y: -77.90, scale: 0.64, opacity: 0.61 },
    { x: -98.97, y: -48.23, scale: 0.64, opacity: 0.56 }
  ]

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-sky-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-rose-500 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-purple-500 blur-3xl"></div>
      </div>

      {/* 3D Product Showcase */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto"
        >
          {/* Main product bottle */}
          <div className="relative w-[220px] h-[350px] mx-auto">
            {/* Bottle body - glass effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg overflow-hidden">
              {/* Bottle contents */}
              <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-rose-500 to-purple-500 rounded-b-xl"></div>

              {/* Bottle shine effects */}
              <div className="absolute top-5 right-5 w-20 h-[60%] bg-white/10 rounded-full blur-sm transform rotate-12"></div>
              <div className="absolute top-10 left-5 w-10 h-[40%] bg-white/10 rounded-full blur-sm transform -rotate-12"></div>
            </div>

            {/* Bottle cap */}
            <div className="absolute top-[-25px] left-[60px] right-[60px] h-[40px] rounded-t-lg bg-gradient-to-r from-slate-700 to-slate-800 border-b border-white/10"></div>

            {/* AI scan effect */}
            <motion.div
              initial={{ top: "10%" }}
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[2px] bg-sky-400 shadow-[0_0_10px_2px_rgba(56,189,248,0.7)]"
            ></motion.div>

            {/* Product label */}
            <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[80px] rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs text-white/70">Premium</div>
                <div className="text-sm font-bold text-white">COSMOVERA</div>
                <div className="text-[10px] text-white/70 mt-1">Advanced Formula</div>
              </div>
            </div>
          </div>

          {/* AI Analysis overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-5 right-[-80px] w-[180px] bg-slate-800/80 backdrop-blur-md rounded-lg border border-white/10 p-3 shadow-lg"
          >
            <div className="text-xs font-semibold text-white mb-2 flex items-center">
              <Sparkles className="h-3 w-3 mr-1 text-rose-400" /> Vera Analysis
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Safety</span>
                <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "95%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="h-full bg-green-500"
                  ></motion.div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Match</span>
                <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "88%" }}
                    transition={{ delay: 1, duration: 1 }}
                    className="h-full bg-sky-500"
                  ></motion.div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Efficacy</span>
                <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="h-full bg-purple-500"
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ingredient tags */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute bottom-10 left-[-60px] space-y-2"
          >
            <div className="bg-white/10 backdrop-blur-sm text-xs text-white px-3 py-1 rounded-full border border-white/10 shadow-lg">
              Hyaluronic Acid
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-xs text-white px-3 py-1 rounded-full border border-white/10 shadow-lg">
              Niacinamide
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-xs text-white px-3 py-1 rounded-full border border-white/10 shadow-lg">
              Peptides
            </div>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              initial={{
                x: particle.x,
                y: particle.y,
                scale: particle.scale,
                opacity: particle.opacity,
              }}
              animate={isMounted ? {
                y: [particle.y, particle.y + (Math.random() * 200 - 100)],
                opacity: [particle.opacity, particle.opacity * 0.7],
              } : {}}
              transition={{
                duration: 5 + (i % 5),
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      {/* App functionality graphics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 right-10 left-10 flex justify-center"
      >
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col items-center"
          >
            <div className="rounded-full bg-rose-500/20 p-2 mb-2">
              <Scan className="h-5 w-5 text-rose-400" />
            </div>
            <span className="text-xs text-white font-medium">Product Scanner</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col items-center"
          >
            <div className="rounded-full bg-sky-500/20 p-2 mb-2">
              <ShieldCheck className="h-5 w-5 text-sky-400" />
            </div>
            <span className="text-xs text-white font-medium">Safety Analysis</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col items-center"
          >
            <div className="rounded-full bg-purple-500/20 p-2 mb-2">
              <Zap className="h-5 w-5 text-purple-400" />
            </div>
            <span className="text-xs text-white font-medium">Vera Assistant</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated circles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full border border-white/10"
          style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full border border-white/5"
          style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
      </div>
    </div>
  )
}

