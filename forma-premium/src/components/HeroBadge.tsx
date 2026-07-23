import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

export default function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mx-auto mb-4 w-fit"
    >
      <Sparkles className="w-3.5 h-3.5 text-[#C4A97D]" />
      <span className="text-[13px] font-light tracking-[0.2em] uppercase text-white/90">2026 Collection</span>
    </motion.div>
  )
}
