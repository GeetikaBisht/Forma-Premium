import { useState } from 'react'
import { motion } from 'motion/react'
import { SlidersHorizontal } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

const categories = ['All', 'Seating', 'Tables', 'Bedroom', 'Storage', 'Lighting']
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Rated']

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Featured')
  const [showFilters, setShowFilters] = useState(false)

  let filtered = products.filter(p => activeCategory === 'All' || p.category === activeCategory)
  if (sortBy === 'Price: Low to High') filtered = [...filtered].sort((a,b) => a.price - b.price)
  if (sortBy === 'Price: High to Low') filtered = [...filtered].sort((a,b) => b.price - a.price)
  if (sortBy === 'Best Rated') filtered = [...filtered].sort((a,b) => b.rating - a.rating)

  return (
    <div className="page-enter">
      <div className="min-h-screen bg-[#f0f0f0] pt-20 md:pt-24">
        {/* Page Header */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-12 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-light block mb-3">
              {filtered.length} pieces
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-light text-[#1E325A] leading-none">
              Shop All
            </h1>
          </motion.div>
        </div>

        {/* Filters Bar */}
        <div className="sticky top-16 md:top-20 z-40 bg-[#f0f0f0]/90 backdrop-blur-xl border-b border-[rgba(30,50,90,0.08)] px-5 md:px-10 py-4">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileTap={{ scale: 0.95 }}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#1E325A] text-white shadow-md'
                      : 'bg-white/60 text-[rgba(30,50,90,0.6)] hover:bg-white'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3 shrink-0">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="hidden md:block bg-white/60 border-none text-xs text-[rgba(30,50,90,0.7)] px-4 py-2 rounded-full outline-none cursor-pointer tracking-wide"
              >
                {sortOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white/60 text-[rgba(30,50,90,0.7)] px-4 py-2 rounded-full text-xs tracking-widest uppercase hover:bg-white transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden md:block">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-[rgba(30,50,90,0.4)] font-display text-3xl font-light">
              No products found
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16,1,0.3,1] } }
                  }}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
