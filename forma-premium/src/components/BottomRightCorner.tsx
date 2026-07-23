import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

export default function BottomRightCorner() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-5 right-5 md:bottom-8 md:right-8 z-20"
    >
      <Link to="/collections">
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 md:gap-4 bg-[#f0f0f0]/95 backdrop-blur-xl rounded-2xl md:rounded-3xl px-4 py-3 md:px-6 md:py-4 shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-white/60 cursor-pointer group"
        >
          <motion.div
            className="bg-[#1E325A]/08 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-[#1E325A]/12 group-hover:bg-[#1E325A] group-hover:border-[#1E325A] transition-all duration-300"
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-[#1E325A] group-hover:text-white transition-colors duration-300" />
          </motion.div>

          <div className="flex flex-col">
            <span className="text-[15px] md:text-[18px] font-display font-light text-[#1E325A] tracking-wide leading-tight">
              Shop Collection
            </span>
            <div className="flex items-center gap-1 text-[#8B7355] group-hover:gap-2 transition-all duration-300">
              <span className="text-[11px] md:text-[13px] font-light tracking-wide">Explore now</span>
              <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
