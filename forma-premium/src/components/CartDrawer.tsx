import { motion, AnimatePresence } from 'motion/react'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeFromCart, total, itemCount } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] bg-[#f0f0f0] z-[201] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-[rgba(30,50,90,0.08)]">
              <div>
                <h2 className="font-display text-2xl font-light text-[#1E325A]">Your Cart</h2>
                <span className="text-xs text-[rgba(30,50,90,0.5)] tracking-wide">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#E8E0D0] transition-colors">
                <X className="w-5 h-5 text-[#1E325A]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag className="w-12 h-12 text-[rgba(30,50,90,0.2)]" />
                  <p className="text-[rgba(30,50,90,0.5)] font-light">Your cart is empty</p>
                  <Link to="/shop" onClick={() => setIsOpen(false)}>
                    <button className="text-sm tracking-widest uppercase text-[#8B7355] border border-[#8B7355] rounded-full px-6 py-2 hover:bg-[#8B7355] hover:text-white transition-colors">
                      Shop Now
                    </button>
                  </Link>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 bg-white rounded-2xl p-4"
                  >
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-base font-light text-[#1E325A] leading-tight truncate">{item.product.name}</h4>
                      <p className="text-xs text-[rgba(30,50,90,0.4)] mb-2">{item.product.material}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-[#f0f0f0] rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-5 h-5 flex items-center justify-center text-[#1E325A] hover:text-[#8B7355]">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium text-[#1E325A] w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-5 h-5 flex items-center justify-center text-[#1E325A] hover:text-[#8B7355]">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium text-[#1E325A]">${(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-[rgba(30,50,90,0.3)] hover:text-red-400 transition-colors self-start mt-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-7 py-6 border-t border-[rgba(30,50,90,0.08)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[rgba(30,50,90,0.6)]">Subtotal</span>
                  <span className="font-display text-2xl font-light text-[#1E325A]">${total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-[rgba(30,50,90,0.4)] font-light">Shipping and taxes calculated at checkout.</p>
                <Link to="/cart" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#1E325A] text-white rounded-2xl py-4 text-sm tracking-widest uppercase hover:bg-[#2a4370] transition-colors"
                  >
                    View Cart & Checkout
                  </motion.button>
                </Link>
                <Link to="/checkout" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-2 bg-[#C4A97D] text-white rounded-2xl py-4 text-sm tracking-widest uppercase hover:bg-[#b8985e] transition-colors shadow-[0_4px_16px_rgba(196,169,125,0.35)]"
                  >
                    Quick Checkout →
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
