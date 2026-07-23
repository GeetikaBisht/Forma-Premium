import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { collections } from '../data/products'
import Footer from '../components/Footer'

export default function CollectionsPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <>
      <div className="page-enter min-h-screen bg-[#f0f0f0] pt-20 md:pt-24">
        <div ref={ref} className="max-w-[1400px] mx-auto px-5 md:px-10 pt-12 pb-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-light block mb-3">
              Curated Worlds
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-light text-[#1E325A] leading-none">
              Collections
            </h1>
          </motion.div>

          {/* Collections */}
          <div className="space-y-6">
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-4xl h-[60vh] cursor-pointer"
              >
                <Link to="/shop">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                  
                  <div className="absolute left-10 md:left-16 top-1/2 -translate-y-1/2">
                    <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 block mb-3">{col.count} pieces</span>
                    <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-4 leading-tight">{col.name}</h2>
                    <p className="text-white/60 font-light text-sm md:text-base max-w-sm mb-8 hidden md:block">{col.description}</p>
                    <div className="flex items-center gap-3 text-[#C4A97D] group-hover:gap-4 transition-all duration-300">
                      <span className="text-xs tracking-[0.3em] uppercase">Explore Collection</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Count badge */}
                  <div className="absolute right-8 bottom-8 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/20 hidden md:block">
                    <span className="font-display text-3xl font-light text-white block">{col.count}</span>
                    <span className="text-xs text-white/50 tracking-widest uppercase">pieces</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
