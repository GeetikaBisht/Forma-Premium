import { useParams, Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowLeft, ShoppingBag, Heart, Star, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const related = products.filter(p => p.id !== id && p.category === product?.category).slice(0, 4)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl font-light text-[#1E325A] mb-4">Product not found</p>
          <Link to="/shop" className="text-[#8B7355] text-sm tracking-widest uppercase">Back to Shop</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <>
      <div className="min-h-screen bg-[#f0f0f0] pt-20 md:pt-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-8">
          {/* Back */}
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-[rgba(30,50,90,0.5)] hover:text-[#8B7355] transition-colors mb-10 tracking-wide">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-24">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="aspect-square rounded-4xl overflow-hidden bg-[#E8E0D0]">
                <img
                  src={product.images[activeImg] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#8B7355]' : 'border-transparent'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-7 md:pt-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {product.badge && (
                    <span className={`px-3 py-1 rounded-full text-[11px] tracking-widest uppercase font-medium ${product.badge === 'Sale' ? 'bg-[#1E325A] text-white' : 'bg-[#8B7355] text-white'}`}>
                      {product.badge}
                    </span>
                  )}
                  <span className="text-xs tracking-widest uppercase text-[rgba(30,50,90,0.4)]">{product.category}</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light text-[#1E325A] leading-tight mb-2">{product.name}</h1>
                <p className="text-xs text-[rgba(30,50,90,0.4)] tracking-widest uppercase">{product.material}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-[#8B7355] text-[#8B7355]' : 'text-[rgba(30,50,90,0.15)]'}`} />
                  ))}
                </div>
                <span className="text-sm text-[rgba(30,50,90,0.5)]">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-light text-[#1E325A]">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-[rgba(30,50,90,0.3)] line-through">${product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-[rgba(30,50,90,0.65)] text-sm leading-relaxed font-light">{product.description}</p>

              <div className="bg-white/50 rounded-2xl px-5 py-4 space-y-1">
                <p className="text-xs tracking-widest uppercase text-[rgba(30,50,90,0.4)] mb-2">Dimensions</p>
                <p className="text-sm text-[#1E325A] font-light">{product.dimensions}</p>
              </div>

              {/* Quantity + Add */}
              <div className="flex gap-3">
                <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#1E325A] hover:text-[#8B7355] transition-colors">
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  <span className="font-display text-xl font-light text-[#1E325A] w-6 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-[#1E325A] hover:text-[#8B7355] transition-colors">
                    <ChevronUp className="w-5 h-5" />
                  </button>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-3 rounded-2xl py-3 text-sm tracking-widest uppercase transition-all duration-300 font-medium ${
                    added ? 'bg-green-600 text-white' : 'bg-[#1E325A] text-white hover:bg-[#2a4370]'
                  }`}
                >
                  {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  {added ? 'Added!' : 'Add to Cart'}
                </motion.button>

                <button className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[rgba(30,50,90,0.5)] hover:text-[#8B7355] hover:bg-[#E8E0D0] transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Product Details toggle */}
              <div className="border-t border-[rgba(30,50,90,0.1)] pt-4">
                <button
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="flex items-center justify-between w-full text-sm tracking-widest uppercase text-[#1E325A] py-2"
                >
                  Product Details
                  {detailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {detailsOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 space-y-2"
                  >
                    {product.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[rgba(30,50,90,0.6)] font-light">
                        <span className="text-[#8B7355] mt-1">✦</span> {d}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div ref={ref}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="mb-10"
              >
                <span className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-light block mb-3">You May Also Like</span>
                <h2 className="font-display text-4xl font-light text-[#1E325A]">Related Pieces</h2>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
