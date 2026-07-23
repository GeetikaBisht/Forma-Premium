import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export default function Newsletter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubmitted(true) }
  }

  return (
    <section className="py-8 md:py-12 px-5 md:px-10 max-w-[1400px] mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-4xl bg-[#1E325A] px-8 md:px-16 py-16 md:py-20 text-center"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#8B7355]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C4A97D]/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

        <div className="relative">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C4A97D] font-light block mb-4">Join the Community</span>
          <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-4">
            Melt Rigid Spaces<br />
            <em className="not-italic text-[#C4A97D]">Into Living Art.</em>
          </h2>
          <p className="text-white/50 font-light text-sm md:text-base max-w-md mx-auto mb-10">
            Subscribe for exclusive access to new collections, design inspiration, and members-only offers.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-[#C4A97D] transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-[#8B7355] hover:bg-[#C4A97D] text-white rounded-full px-7 py-3.5 text-sm tracking-widest uppercase transition-colors group"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[#C4A97D] font-display text-2xl font-light"
            >
              Thank you for joining ✦
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
