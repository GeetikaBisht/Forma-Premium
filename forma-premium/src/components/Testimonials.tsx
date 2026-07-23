import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '../data/products'

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 md:py-32 px-5 md:px-10 max-w-[1400px] mx-auto" ref={ref}>
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-light block mb-4"
        >
          What Our Customers Say
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl font-light text-[#1E325A]"
        >
          Loved by Many
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/80 flex flex-col gap-5 hover:bg-white/80 transition-all duration-300 card-tilt"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#8B7355] text-[#8B7355]" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-[#8B7355]/20 rotate-180" />
            </div>
            <p className="text-[#1E325A]/70 text-sm leading-relaxed font-light flex-1">"{t.text}"</p>
            <div className="pt-4 border-t border-[rgba(30,50,90,0.08)]">
              <span className="block text-[#1E325A] font-light text-sm">{t.name}</span>
              <span className="text-xs text-[rgba(30,50,90,0.4)] tracking-wide">{t.location}</span>
              <span className="text-xs text-[#8B7355] block mt-1 tracking-wide">{t.product}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
