import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const values = [
  { title: 'Sustainability', desc: 'Every material is responsibly sourced. We offset 100% of our carbon footprint and plant a tree for every order.' },
  { title: 'Longevity', desc: 'We design against obsolescence. FORMA pieces are built to be repaired, not replaced.' },
  { title: 'Craft Heritage', desc: 'Trained under master craftspeople in Scandinavia, our makers carry forward centuries of joinery tradition.' },
  { title: 'Honest Materials', desc: 'Solid wood, genuine stone, real metal. We never compromise on materiality.' },
]

const stats = [
  { value: '1994', label: 'Founded' },
  { value: '30+', label: 'Years of craft' },
  { value: '140K+', label: 'Homes furnished' },
  { value: '25yr', label: 'Guarantee' },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const ref2 = useRef(null)
  const inView2 = useInView(ref2, { once: true, margin: '-80px' })
  const ref3 = useRef(null)
  const inView3 = useInView(ref3, { once: true, margin: '-80px' })

  return (
    <>
      <div className="min-h-screen bg-[#f0f0f0]">
        {/* Hero */}
        <div ref={heroRef} className="relative h-[80vh] overflow-hidden">
          <motion.img
            style={{ y: imgY }}
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=85"
            alt="FORMA Workshop"
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E325A]/70 via-[#1E325A]/30 to-[#f0f0f0]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs tracking-[0.3em] uppercase text-[#C4A97D] font-light block mb-5 mt-20"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-8xl font-light text-white leading-none"
            >
              Form Meets
              <br />
              <em className="not-italic text-[#C4A97D]">Function</em>
            </motion.h1>
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-24 md:py-32">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display text-3xl md:text-5xl font-light text-[#1E325A] leading-snug"
            >
              "We believe that the objects we live with shape who we become. Every FORMA piece is made with the intention that it will outlast trends, outlast fashions—perhaps even outlast us."
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-[rgba(30,50,90,0.5)] text-sm font-light tracking-wide"
            >
              — Henrik Larsson, Founder
            </motion.p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#1E325A] py-20 px-5 md:px-10" ref={ref2}>
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-center"
              >
                <span className="font-display text-5xl md:text-7xl font-light text-white block">{stat.value}</span>
                <span className="text-xs tracking-[0.3em] uppercase text-[rgba(255,255,255,0.4)] mt-2 block">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div ref={ref3} className="max-w-[1400px] mx-auto px-5 md:px-10 py-24 md:py-32">
          <div className="mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-light block mb-4">What We Stand For</span>
            <h2 className="font-display text-5xl md:text-6xl font-light text-[#1E325A]">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/60 rounded-3xl p-8 border border-white/80 hover:bg-white/80 transition-colors duration-300"
              >
                <span className="text-[#C4A97D] font-display text-5xl font-light">0{i+1}</span>
                <h3 className="font-display text-2xl font-light text-[#1E325A] mt-4 mb-3">{v.title}</h3>
                <p className="text-[rgba(30,50,90,0.6)] text-sm leading-relaxed font-light">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-[#1E325A] text-white rounded-full px-10 py-4 text-sm tracking-widest uppercase group"
              >
                Explore Our Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
