import { motion, AnimatePresence } from 'motion/react'
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <>
      <div className="min-h-screen bg-[#f0f0f0] pt-20 md:pt-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-12 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/shop" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#8B7355] hover:text-[#1E325A] transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Shop
            </Link>
            <div className="flex items-center gap-4 mb-2">
              <Heart className="w-8 h-8 text-[#1E325A]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-light">{items.length} saved pieces</span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-light text-[#1E325A] leading-none">Wishlist</h1>
          </motion.div>
        </div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-10 pb-20">
          {items.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 gap-6">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Heart className="w-10 h-10 text-[rgba(30,50,90,0.2)]" />
              </div>
              <p className="font-display text-3xl font-light text-[rgba(30,50,90,0.4)]">Your wishlist is empty</p>
              <p className="text-sm text-[rgba(30,50,90,0.4)] font-light">Save pieces you love to come back to them later.</p>
              <Link to="/shop" className="mt-2 px-8 py-3 rounded-full bg-[#1E325A] text-white text-xs tracking-widest uppercase font-light hover:bg-[#152548] transition-colors">
                Explore Collection
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              <AnimatePresence>
                {items.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group relative"
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#E8E0D0] aspect-[3/4] mb-4">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        {product.badge && (
                          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] tracking-widest uppercase font-medium ${product.badge === 'Sale' ? 'bg-[#1E325A] text-white' : product.badge === 'New' ? 'bg-[#8B7355] text-white' : 'bg-white text-[#1E325A]'}`}>
                            {product.badge}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <motion.button whileTap={{ scale: 0.97 }} onClick={(e) => { e.preventDefault(); addToCart(product) }} className="w-full flex items-center justify-center gap-2 bg-white text-[#1E325A] rounded-xl py-3 text-sm tracking-wider uppercase font-medium hover:bg-[#f0f0f0] transition-colors">
                            <ShoppingBag className="w-4 h-4" /> Add to Cart
                          </motion.button>
                        </div>
                        <motion.button whileTap={{ scale: 0.85 }} onClick={(e) => { e.preventDefault(); removeFromWishlist(product.id) }} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </motion.button>
                      </div>
                    </Link>
                    <div className="space-y-1.5 px-1">
                      <h3 className="font-display text-[17px] md:text-xl font-light text-[#1E325A] leading-tight tracking-wide">{product.name}</h3>
                      <p className="text-xs text-[rgba(30,50,90,0.5)] tracking-wider uppercase">{product.material}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#1E325A] font-medium text-base">${product.price.toLocaleString()}</span>
                        {product.originalPrice && (<span className="text-[rgba(30,50,90,0.35)] text-sm line-through">${product.originalPrice.toLocaleString()}</span>)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
