import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { CheckCircle, Package, Truck, Home, ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'

export default function OrderConfirmationPage() {
  const [orderNumber] = useState(() => 'FRM-' + Math.random().toString(36).toUpperCase().slice(2, 8))
  const [count, setCount] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCount(c => { if (c >= 100) { clearInterval(t); return 100 } return c + 4 }), 30)
    return () => clearInterval(t)
  }, [])

  const steps = [
    { icon: CheckCircle, label: 'Order Confirmed', sub: 'We\'ve received your order', done: true },
    { icon: Package, label: 'Preparing', sub: 'Crafted with care', done: count > 40 },
    { icon: Truck, label: 'In Transit', sub: 'On its way to you', done: count > 70 },
    { icon: Home, label: 'Delivered', sub: 'Enjoy your new piece', done: count >= 100 },
  ]

  return (
    <>
      <div className="min-h-screen bg-[#f0f0f0] pt-20 md:pt-24 flex flex-col">
        <div className="flex-1 max-w-[700px] mx-auto w-full px-5 py-16 flex flex-col items-center text-center">
          {/* Success animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 150, delay: 0.2 }}
            className="relative mb-8"
          >
            <div className="w-28 h-28 rounded-full bg-[#1E325A] flex items-center justify-center shadow-[0_8px_40px_rgba(30,50,90,0.3)]">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring', damping: 10 }}>
                <CheckCircle className="w-14 h-14 text-[#C4A97D]" strokeWidth={1.5} />
              </motion.div>
            </div>
            {/* Rings */}
            {[1,2,3].map(i => (
              <motion.div key={i} initial={{ scale: 1, opacity: 0.4 }} animate={{ scale: 1 + i * 0.4, opacity: 0 }} transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: 'easeOut' }} className="absolute inset-0 rounded-full border-2 border-[#C4A97D]" />
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <span className="text-xs tracking-[0.3em] uppercase text-[#8B7355] font-light">Thank you for your order</span>
            <h1 className="font-display text-5xl md:text-7xl font-light text-[#1E325A] mt-2 mb-4 leading-tight">Order Placed!</h1>
            <p className="text-[rgba(30,50,90,0.55)] text-sm leading-relaxed max-w-md mx-auto">
              Your beautiful pieces are on their way. We've sent a confirmation to your email and will keep you updated every step of the journey.
            </p>
          </motion.div>

          {/* Order number */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 px-8 py-4 rounded-2xl bg-white border border-[rgba(30,50,90,0.08)] shadow-sm">
            <p className="text-xs tracking-[0.3em] uppercase text-[rgba(30,50,90,0.4)] mb-1">Order Reference</p>
            <p className="font-mono text-2xl text-[#1E325A] font-medium tracking-wider">{orderNumber}</p>
          </motion.div>

          {/* Progress tracker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="w-full mt-12 bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex items-start justify-between relative">
              {/* Track line */}
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-[rgba(30,50,90,0.1)]">
                <motion.div className="h-full bg-[#C4A97D] origin-left" style={{ scaleX: count / 100 }} transition={{ duration: 0.3 }} />
              </div>

              {steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                  <motion.div
                    animate={{ backgroundColor: s.done ? '#1E325A' : 'rgba(30,50,90,0.1)' }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    <s.icon className={`w-5 h-5 transition-colors duration-300 ${s.done ? 'text-[#C4A97D]' : 'text-[rgba(30,50,90,0.3)]'}`} strokeWidth={1.5} />
                  </motion.div>
                  <p className={`text-xs font-medium transition-colors duration-300 ${s.done ? 'text-[#1E325A]' : 'text-[rgba(30,50,90,0.4)]'}`}>{s.label}</p>
                  <p className="text-[10px] text-[rgba(30,50,90,0.4)] hidden md:block">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-[#f8f9fc] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#C4A97D] animate-pulse flex-shrink-0" />
              <p className="text-sm text-[rgba(30,50,90,0.6)]">
                {count < 40 ? 'Our artisans are carefully preparing your order...' : count < 70 ? 'Your pieces have been dispatched and are en route.' : 'Your delivery is almost there!'}
              </p>
            </div>
          </motion.div>

          {/* Estimated delivery */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-6 text-sm text-[rgba(30,50,90,0.5)]">
            Estimated delivery: <span className="text-[#1E325A] font-medium">May 12–15, 2026</span>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="flex gap-4 mt-10">
            <Link to="/" className="px-6 py-3 rounded-full border border-[rgba(30,50,90,0.2)] text-[#1E325A] text-xs tracking-widest uppercase font-light hover:bg-white transition-colors">
              Back to Home
            </Link>
            <Link to="/shop" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E325A] text-white text-xs tracking-widest uppercase font-light hover:bg-[#152548] transition-colors shadow-[0_4px_20px_rgba(30,50,90,0.2)]">
              Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
