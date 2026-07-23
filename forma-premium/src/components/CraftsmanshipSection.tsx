import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'

const features = [
  { number: '01', title: 'Sustainably Sourced', desc: 'We work exclusively with certified forests and ethical suppliers across Scandinavia and Europe.' },
  { number: '02', title: 'Handcrafted Quality', desc: 'Every joint, seam, and finish is inspected by our master craftspeople before leaving the workshop.' },
  { number: '03', title: '25-Year Guarantee', desc: 'We stand behind every piece we make. Our furniture is built to be passed down through generations.' },
]

export default function CraftsmanshipSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-[#1E325A] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left: Image with parallax */}
          <div ref={ref} className="relative">
            <motion.div
              style={{ y }}
              className="relative rounded-3xl overflow-hidden aspect-[4/5]"
            >
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E325A]/40 to-transparent" />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -right-5 md:-right-10 bottom-12 bg-[#f0f0f0] rounded-2xl p-6 shadow-2xl"
            >
              <span className="font-display text-5xl font-light text-[#1E325A] block">30+</span>
              <span className="text-xs text-[rgba(30,50,90,0.5)] tracking-widest uppercase mt-1 block">Years of craft</span>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.3em] uppercase text-[#C4A97D] font-light block mb-4"
            >
              Our Promise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl font-light text-white leading-tight mb-10"
            >
              Architected for
              <br />
              <em className="not-italic text-[#C4A97D]">Generations</em>
            </motion.h2>

            <div className="space-y-8">
              {features.map((f, i) => (
                <motion.div
                  key={f.number}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
                  className="flex gap-6 group"
                >
                  <span className="font-display text-[#C4A97D]/30 text-3xl font-light leading-none mt-1 shrink-0">{f.number}</span>
                  <div>
                    <h3 className="text-white font-light text-lg mb-1.5 tracking-wide">{f.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed font-light">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
