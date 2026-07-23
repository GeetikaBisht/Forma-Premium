import { motion } from 'motion/react'
import { Star } from 'lucide-react'

export default function BottomLeftCard() {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="absolute bottom-28 right-4 left-auto md:left-6 md:right-auto md:bottom-6 lg:bottom-10 lg:left-10 p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] bg-white/25 backdrop-blur-xl border border-white/30 flex flex-col gap-3 min-w-[150px] md:min-w-[180px] w-fit"
    >
      <div className="flex flex-col gap-1">
        <span className="text-2xl md:text-3xl font-display font-light text-white tracking-tight">
          4.9/5
        </span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-[#C4A97D] text-[#C4A97D]" />
          ))}
        </div>
        <span className="text-[10px] md:text-[11px] font-light text-white/70 uppercase tracking-widest">
          2,400+ Reviews
        </span>
      </div>

      {/* <div className="flex -space-x-2">
        {[0,1,2,3].map((_x, i) => (
          <div key={i} className="w-7 h-7 rounded-full bg-[#C4A97D]/30 border-2 border-white/40 overflow-hidden flex items-center justify-center">
            <span className="text-xs text-white/60 font-light">✦</span>
          </div>
        ))}
      </div> */}
    </motion.div>
  )
}
