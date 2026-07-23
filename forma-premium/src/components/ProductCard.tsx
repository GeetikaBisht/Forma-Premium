import { motion } from 'motion/react'
import { ShoppingBag, Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative card-tilt"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#E8E0D0] aspect-[3/4] mb-4">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {product.badge && (
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] tracking-widest uppercase font-medium ${product.badge === 'Sale' ? 'bg-[#1E325A] text-white' : product.badge === 'New' ? 'bg-[#8B7355] text-white pulse-glow' : 'bg-white text-[#1E325A]'}`}>
              {product.badge}
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <motion.button whileTap={{ scale: 0.97 }} onClick={(e) => { e.preventDefault(); addToCart(product) }} className="w-full flex items-center justify-center gap-2 bg-white text-[#1E325A] rounded-xl py-3 text-sm tracking-wider uppercase font-medium hover:bg-[#f0f0f0] transition-colors">
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </motion.button>
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
            className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${wishlisted ? 'bg-red-50 opacity-100' : 'bg-white/80 opacity-0 group-hover:opacity-100 hover:bg-white'}`}
          >
            <Heart className={`w-4 h-4 transition-colors duration-200 ${wishlisted ? 'fill-red-400 text-red-400' : 'text-[#1E325A]'}`} />
          </motion.button>
        </div>
      </Link>
      <div className="space-y-1.5 px-1">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-[#8B7355] text-[#8B7355]" />
          <span className="text-xs text-[rgba(30,50,90,0.5)] font-light">{product.rating} ({product.reviews})</span>
        </div>
        <h3 className="font-display text-[17px] md:text-xl font-light text-[#1E325A] leading-tight tracking-wide shimmer-hover">{product.name}</h3>
        <p className="text-xs text-[rgba(30,50,90,0.5)] tracking-wider uppercase">{product.material}</p>
        <div className="flex items-center gap-2">
          <span className="text-[#1E325A] font-medium text-base">${product.price.toLocaleString()}</span>
          {product.originalPrice && (<span className="text-[rgba(30,50,90,0.35)] text-sm line-through">${product.originalPrice.toLocaleString()}</span>)}
        </div>
      </div>
    </motion.div>
  )
}
