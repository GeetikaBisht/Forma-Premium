import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart()

  return (
    <>
      <div className="min-h-screen bg-[#f0f0f0] pt-20 md:pt-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-light block mb-3">
              {items.length} items
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-light text-[#1E325A] leading-none">
              Your Cart
            </h1>
          </motion.div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <ShoppingBag className="w-16 h-16 text-[rgba(30,50,90,0.15)] mb-6" />
              <h2 className="font-display text-4xl font-light text-[#1E325A] mb-4">Your cart is empty</h2>
              <p className="text-[rgba(30,50,90,0.5)] font-light mb-8">Discover our beautiful furniture collections</p>
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-[#1E325A] text-white rounded-full px-8 py-3.5 text-sm tracking-widest uppercase"
                >
                  Start Shopping
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10 md:gap-16">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, i) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5 md:gap-7 bg-white rounded-3xl p-5 md:p-6"
                  >
                    <Link to={`/product/${item.product.id}`}>
                      <img src={item.product.image} alt={item.product.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl flex-shrink-0" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link to={`/product/${item.product.id}`}>
                            <h3 className="font-display text-xl md:text-2xl font-light text-[#1E325A] leading-tight hover:text-[#8B7355] transition-colors">{item.product.name}</h3>
                          </Link>
                          <p className="text-xs text-[rgba(30,50,90,0.4)] tracking-wide mt-1">{item.product.material}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-[rgba(30,50,90,0.25)] hover:text-red-400 transition-colors shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4 md:mt-6">
                        <div className="flex items-center gap-3 bg-[#f0f0f0] rounded-full px-4 py-2">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-[#1E325A] hover:text-[#8B7355] transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-display text-lg font-light text-[#1E325A] w-5 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-[#1E325A] hover:text-[#8B7355] transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="font-display text-2xl font-light text-[#1E325A]">${(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="flex items-center justify-between pt-2">
                  <Link to="/shop" className="flex items-center gap-2 text-sm text-[rgba(30,50,90,0.5)] hover:text-[#8B7355] transition-colors tracking-wide">
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Link>
                  <button onClick={clearCart} className="text-xs text-[rgba(30,50,90,0.4)] hover:text-red-400 transition-colors tracking-widest uppercase">
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white rounded-4xl p-7 md:p-9 h-fit"
              >
                <h2 className="font-display text-2xl font-light text-[#1E325A] mb-7">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[rgba(30,50,90,0.6)] font-light">Subtotal</span>
                    <span className="text-[#1E325A]">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[rgba(30,50,90,0.6)] font-light">Shipping</span>
                    <span className="text-[#8B7355]">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[rgba(30,50,90,0.6)] font-light">White Glove Delivery</span>
                    <span className="text-[#8B7355]">Included</span>
                  </div>
                  <div className="border-t border-[rgba(30,50,90,0.08)] pt-4 flex justify-between">
                    <span className="text-[#1E325A] font-medium">Total</span>
                    <span className="font-display text-3xl font-light text-[#1E325A]">${total.toLocaleString()}</span>
                  </div>
                </div>

                <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#1E325A] text-white rounded-2xl py-4 text-sm tracking-widest uppercase hover:bg-[#2a4370] transition-colors mb-3 flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
                </Link>
                <button className="w-full border border-[rgba(30,50,90,0.15)] text-[rgba(30,50,90,0.6)] rounded-2xl py-4 text-sm tracking-widest uppercase hover:border-[#8B7355] hover:text-[#8B7355] transition-colors">
                  Continue Shopping
                </button>

                <div className="mt-6 pt-6 border-t border-[rgba(30,50,90,0.08)]">
                  <p className="text-xs text-[rgba(30,50,90,0.4)] text-center font-light leading-relaxed">
                    ✦ Complimentary white-glove delivery<br />
                    ✦ 30-day hassle-free returns<br />
                    ✦ 25-year craftsmanship guarantee
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
