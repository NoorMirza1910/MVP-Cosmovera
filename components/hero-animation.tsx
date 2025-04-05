"use client"
import { motion } from "framer-motion"
import { Sparkles, Scan, ShieldCheck, Zap } from "lucide-react"

export default function HeroAnimation() {
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
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                y: [null, Math.random() * 200 - 100],
                opacity: [null, Math.random() * 0.3 + 0.1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
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

