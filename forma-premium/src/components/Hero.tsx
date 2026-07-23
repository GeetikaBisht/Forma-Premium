import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroBadge from './HeroBadge'
import BottomLeftCard from './BottomLeftCard'
import BottomRightCorner from './BottomRightCorner'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 1.04])
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, 60])

  return (
    <div
      ref={ref}
      className="sticky top-0 w-full h-screen flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0] z-0"
    >
      <motion.section
        style={{ scale }}
        className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center group"
      >
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/15 to-black/60" />
        {/* Radial vignette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.35) 100%)' }}
        />

        {/* Content Layer */}
        <motion.div style={{ opacity }} className="relative z-10 w-full h-full flex flex-col items-center">

          {/* Hero Text */}
          <motion.div
            style={{ y: textY }}
            className="w-full flex flex-col items-center pt-12 md:pt-20 px-6 text-center max-w-4xl"
          >
            <HeroBadge />

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-light text-white mb-4 tracking-tight leading-[1.02]"
            >
              Crafted for
              <br />
              <em className="not-italic text-[#C4A97D]">Living.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-lg font-light tracking-wide"
            >
              Scandinavian furniture of extraordinary quality. Each piece designed to last a lifetime and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-8"
            >
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-white text-[#1E325A] rounded-full px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-[#f0f0f0] transition-colors font-medium group shadow-lg"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/collections">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-white/20 transition-colors font-light"
                >
                  View Collections
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <BottomLeftCard />
          <BottomRightCorner />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/40 font-light">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </motion.section>
    </div>
  )
}
