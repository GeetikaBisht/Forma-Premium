import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { collections } from '../data/products'

export default function FeaturedCollections() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 md:py-32 px-5 md:px-10 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-light block mb-3"
          >
            Curated for You
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-[#1E325A] leading-none tracking-tight"
          >
            Our Collections
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/collections" className="flex items-center gap-2 text-sm tracking-widest uppercase text-[rgba(30,50,90,0.6)] hover:text-[#8B7355] transition-colors group">
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Collection Bento Grid — 5 collections, fully filled */}
      {/* Layout: col[0] spans 2 rows left | col[1]+col[2] top | col[3]+col[4] bottom */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        style={{ gridTemplateRows: 'repeat(2, 320px)' }}
      >
        {collections.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.12 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden rounded-3xl cursor-pointer ${i === 0 ? 'md:row-span-2' : ''}`}
          >
            <Link to="/collections" className="block w-full h-full">
              {/* Image */}
              <img
                src={col.image}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f3c]/85 via-[#0d1f3c]/25 to-transparent" />
              {/* Hover tint */}
              <div className="absolute inset-0 bg-[#1E325A]/0 group-hover:bg-[#1E325A]/10 transition-colors duration-500" />

              {/* Top badge */}
              <div className="absolute top-5 left-5">
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/70 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
                  {col.count} pieces
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                <h3 className={`font-display font-light text-white tracking-wide mb-2 ${i === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                  {col.name}
                </h3>
                <p className={`text-white/55 font-light leading-relaxed mb-4 ${i === 0 ? 'text-sm' : 'text-xs'} ${i !== 0 ? 'hidden md:block' : ''}`}>
                  {col.description}
                </p>
                <div className="flex items-center gap-2 text-[#C4A97D] group-hover:gap-3 transition-all duration-300">
                  <span className="tracking-widest uppercase text-[10px] font-light">Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Gold accent line on hover */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C4A97D] to-transparent origin-center"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
