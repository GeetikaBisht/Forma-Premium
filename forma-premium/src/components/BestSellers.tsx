import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from './ProductCard'

export default function BestSellers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const featured = products.slice(0, 4)

  return (
    <section className="py-16 md:py-24 px-5 md:px-10 max-w-[1400px] mx-auto">
      <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-light block mb-3"
          >
            Most Loved
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-light text-[#1E325A] leading-none"
          >
            Bestsellers
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/shop" className="flex items-center gap-2 text-sm tracking-widest uppercase text-[rgba(30,50,90,0.6)] hover:text-[#8B7355] transition-colors group">
            View all products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {featured.map((product, i) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <ProductCard product={product} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
