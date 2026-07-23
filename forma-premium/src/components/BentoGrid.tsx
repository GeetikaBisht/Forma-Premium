import { motion, useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { ArrowUpRight, Zap, Globe, Star, Shield, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

function useCounter(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

const barData = [
  { h: 40, color: '#6B9FD4' },
  { h: 65, color: '#1E325A' },
  { h: 45, color: '#8BBFE8' },
  { h: 80, color: '#1E325A' },
  { h: 55, color: '#C4A97D' },
  { h: 90, color: '#1E325A' },
  { h: 70, color: '#6B9FD4' },
  { h: 85, color: '#C4A97D' },
  { h: 60, color: '#8BBFE8' },
  { h: 95, color: '#1E325A' },
]

export default function BentoGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState<number | null>(null)

  const pieces = useCounter(2400, 1800, inView)
  const rating = useCounter(49, 1600, inView)
  const collections = useCounter(12, 1400, inView)

  const cardBase = "relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"

  return (
    <section ref={ref} className="py-24 md:py-32 px-5 md:px-10 max-w-[1400px] mx-auto">
      {/* Section header */}
      <div className="mb-12">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-light block mb-3"
        >
          Why Forma
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-[#1E325A] leading-none tracking-tight"
        >
          Crafted to last
          <br />
          <em className="not-italic text-[#8B7355]">a lifetime.</em>
        </motion.h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-3" style={{ gridTemplateRows: 'auto' }}>

        {/* CARD 1 — Left tall hero: Live Inventory with colored graph */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          onHoverStart={() => setHovered(1)}
          onHoverEnd={() => setHovered(null)}
          className={`${cardBase} md:row-span-2 flex flex-col justify-between`}
          style={{
            minHeight: 420,
            background: 'linear-gradient(145deg, #1E325A 0%, #243d6e 60%, #1a2d50 100%)',
          }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#C4A97D]/10 pointer-events-none" />

          {/* Top section */}
          <div className="p-7 pb-0 relative">
            <div className="flex items-start justify-between mb-6">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C4A97D] font-light bg-[#C4A97D]/15 px-3 py-1.5 rounded-full border border-[#C4A97D]/20">
                01 — Live Inventory
              </span>
              <motion.div
                className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center"
                animate={hovered === 1 ? { rotate: 45 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
              </motion.div>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-light text-white leading-tight mb-3">
              Heirloom-quality furniture
            </h3>
            <p className="text-white/45 text-sm font-light leading-relaxed">
              Each piece hand-finished by master craftspeople. Built to outlast trends and be passed down through generations.
            </p>
          </div>

          {/* Colorful Live Inventory Card */}
          <div className="px-7 py-6 relative">
            <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-light flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  Live Inventory
                </span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="font-display text-3xl font-light text-white">{pieces.toLocaleString()}</span>
                <span className="text-xs text-white/40 font-light">pieces available</span>
              </div>
              {/* Colored mini bar chart */}
              <div className="flex items-end gap-1 h-10">
                {barData.map((bar, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{ backgroundColor: bar.color, alignSelf: 'flex-end' }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${bar.h}%` } : { height: 0 }}
                    transition={{ delay: 0.6 + i * 0.06, duration: 0.5, ease: 'easeOut' }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[9px] text-white/30 font-light">Jan</span>
                <span className="text-[9px] text-white/30 font-light">Oct</span>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C4A97D] to-transparent"
            initial={{ scaleX: 0 }}
            animate={hovered === 1 ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* CARD 2 — Top center: Real-Time Yields with gradient bg */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onHoverStart={() => setHovered(2)}
          onHoverEnd={() => setHovered(null)}
          className={`${cardBase} border border-[rgba(30,50,90,0.08)] shadow-[0_2px_20px_rgba(30,50,90,0.06)]`}
          style={{ minHeight: 200, background: 'linear-gradient(135deg, #ffffff 0%, #f0f5ff 100%)' }}
        >
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8B7355] font-light block mb-2">02 — Browse Live</span>
                <h3 className="font-display text-xl text-[#1E325A] font-light leading-tight">Instantly updated catalogue</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#1E325A]/08 border border-[#1E325A]/12 flex items-center justify-center flex-shrink-0">
                <Zap className="w-3 h-3 text-[#1E325A]/50" />
              </div>
            </div>
            <div>
              <p className="text-[#1E325A]/45 text-sm font-light leading-relaxed mt-2 mb-3">
                Browse our curated collection. Updated instantly as pieces sell.
              </p>
              {/* Mini progress bar */}
              <div className="h-1 rounded-full bg-[#1E325A]/08 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#1E325A] to-[#C4A97D]"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '78%' } : { width: 0 }}
                  transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-[#1E325A]/30 font-light">78% in stock</span>
                <span className="text-[9px] text-[#8B7355] font-light">↑ 12% this week</span>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C4A97D] to-transparent"
            initial={{ scaleX: 0 }}
            animate={hovered === 2 ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* CARD 3 — Top right: Sustainability — dark navy */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onHoverStart={() => setHovered(3)}
          onHoverEnd={() => setHovered(null)}
          className={`${cardBase}`}
          style={{
            minHeight: 200,
            background: 'linear-gradient(135deg, #1E325A 0%, #2a4a80 100%)',
          }}
        >
          {/* Decorative circle */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 translate-x-8 -translate-y-8 pointer-events-none" />
          <div className="p-6 h-full flex flex-col justify-between relative">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C4A97D]/80 font-light block mb-2">03 — Sustainability</span>
                <h3 className="font-display text-xl font-light leading-tight text-white">Responsibly Sourced</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <Globe className="w-3.5 h-3.5 text-white/60" />
              </div>
            </div>
            <div>
              <p className="text-white/45 text-sm font-light leading-relaxed mb-3">
                FSC-certified woods. Carbon-neutral delivery. Zero-waste packaging.
              </p>
              {/* Sustainability badges */}
              <div className="flex gap-2 flex-wrap">
                {['FSC Certified', 'Carbon Neutral', 'Zero Waste'].map((tag) => (
                  <span key={tag} className="text-[9px] tracking-wide text-[#C4A97D] border border-[#C4A97D]/30 bg-[#C4A97D]/10 px-2.5 py-1 rounded-full font-light">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 4 — Bottom center: Top-Rated with gold accent */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onHoverStart={() => setHovered(4)}
          onHoverEnd={() => setHovered(null)}
          className={`${cardBase} border border-[rgba(196,169,125,0.2)] shadow-[0_2px_20px_rgba(30,50,90,0.06)]`}
          style={{ minHeight: 200, background: 'linear-gradient(135deg, #fdfaf6 0%, #f7f2ea 100%)' }}
        >
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8B7355] font-light block mb-2">04 — Award Winning</span>
                <h3 className="font-display text-xl text-[#1E325A] font-light">Top-Rated Furniture</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#C4A97D]/15 border border-[#C4A97D]/25 flex items-center justify-center flex-shrink-0">
                <Shield className="w-3.5 h-3.5 text-[#8B7355]" />
              </div>
            </div>

            <div>
              {/* Star row */}
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C4A97D] text-[#C4A97D]" />
                ))}
                <span className="text-xs text-[#1E325A]/50 ml-1 font-light">4.9 · 2,400+ reviews</span>
              </div>
              <motion.button
                className="text-xs text-[#8B7355] tracking-widest uppercase font-light hover:text-[#1E325A] transition-colors flex items-center gap-1"
                animate={hovered === 4 ? { x: 3 } : { x: 0 }}
              >
                Read Reviews →
              </motion.button>
            </div>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C4A97D] to-transparent"
            initial={{ scaleX: 0 }}
            animate={hovered === 4 ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* CARD 5 — Bottom right: Collections with photo */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onHoverStart={() => setHovered(5)}
          onHoverEnd={() => setHovered(null)}
          className={`${cardBase} overflow-hidden`}
          style={{ minHeight: 200 }}
        >
          {/* Background image */}
          <div className="absolute inset-0 bg-[#8B7355]">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80"
              alt="Collections"
              className="w-full h-full object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E325A]/90 via-[#1E325A]/40 to-[#1E325A]/10" />
          </div>

          <div className="relative p-6 h-full flex flex-col justify-between" style={{ minHeight: 200 }}>
            <div className="flex items-start justify-between">
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 font-light">05 — Explore</span>
              <motion.div
                className="w-8 h-8 rounded-full border border-white/25 bg-white/10 flex items-center justify-center"
                animate={hovered === 5 ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </motion.div>
            </div>

            <motion.div animate={hovered === 5 ? { y: -4 } : { y: 0 }} transition={{ duration: 0.3 }}>
              <h3 className="font-display text-2xl text-white font-light mb-1">
                {collections} Collections
              </h3>
              <p className="text-white/45 text-sm font-light">
                Discover pieces crafted for every aesthetic.
              </p>
            </motion.div>
          </div>

          <Link to="/collections" className="absolute inset-0" />
        </motion.div>

      </div>

      {/* Bottom stat row */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-3 rounded-2xl border border-[rgba(30,50,90,0.08)] shadow-[0_2px_20px_rgba(30,50,90,0.05)] p-6 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f5f8ff 100%)' }}
      >
        {/* Decorative accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C4A97D] to-[#1E325A]" />
        <div className="flex items-center gap-3 pl-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.55 + i * 0.06 }}>
                <Star className="w-4 h-4 fill-[#C4A97D] text-[#C4A97D]" />
              </motion.div>
            ))}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-light text-[#1E325A]">{(rating / 10).toFixed(1)}</span>
            <span className="text-sm text-[#1E325A]/40 font-light">/ 5.0 · 2,400+ reviews</span>
          </div>
        </div>
        <div className="hidden md:block h-8 w-px bg-[rgba(30,50,90,0.08)]" />
        <div className="text-center md:text-left">
          <span className="text-xs tracking-[0.25em] uppercase text-[#8B7355] font-light block mb-0.5">Customer Reviews</span>
          <span className="font-display text-lg text-[#1E325A] font-light">Top-Rated Furniture</span>
        </div>
        <div className="hidden md:block h-8 w-px bg-[rgba(30,50,90,0.08)]" />
        <Link to="/shop">
          <motion.div
            whileHover={{ x: 3 }}
            className="flex items-center gap-2 text-[#1E325A] text-xs tracking-widest uppercase font-light"
          >
            View All Reviews <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}

