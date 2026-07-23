import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, Search, ChevronDown, User, Heart } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const navLinks = [
  { label: 'About', href: '/about', sub: null },
  { label: 'Shop', href: '/shop', sub: ['New Arrivals', 'Best Sellers', 'Sale'] },
  { label: 'Collections', href: '/collections', sub: ['Nordic', 'Fjord', 'Aurora', 'Japandi', 'Wabi-Sabi'] },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const { itemCount, setIsOpen } = useCart()
  const { count: wishlistCount } = useWishlist()
  const location = useLocation()

  const { scrollY } = useScroll()
  const readingProgress = useTransform(scrollY, [0, 3000], [0, 1])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        onMouseLeave={() => setActiveDropdown(null)}
      >
        {/* Main bar — always white */}
        <div className="bg-white border-b border-[rgba(30,50,90,0.09)] shadow-[0_1px_24px_rgba(30,50,90,0.07)]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-15">
            {/* Logo */}
            <Link to="/" className="relative group flex items-center gap-2.5">
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#1E325A]">
                  <img
                    src="/Forma.png"   // your image path
                    alt="icon"
                    className="w-10 h-10 object-contain rounded-lg"
                  />
                </div>
                <span className="font-display text-2xl md:text-3xl font-light tracking-[0.18em] text-[#1E325A]">
                  FORMA
                </span>
              </motion.div>
            </Link>

            {/* Center links */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href} className="relative">
                  <div onMouseEnter={() => setActiveDropdown(link.sub ? link.label : null)}>
                    <Link
                      to={link.href}
                      className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300 font-light relative group text-[#1E325A] ${location.pathname === link.href ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                    >
                      <motion.span className="absolute inset-0 rounded-full transition-opacity duration-200 opacity-0 group-hover:opacity-100 bg-[rgba(30,50,90,0.06)]" />
                      <span className="relative">{link.label}</span>
                      {link.sub && (
                        <motion.span animate={{ rotate: activeDropdown === link.label ? 180 : 0 }} transition={{ duration: 0.2 }} className="relative">
                          <ChevronDown className="w-3 h-3 opacity-40" />
                        </motion.span>
                      )}
                    </Link>
                    {location.pathname === link.href && (
                      <motion.div layoutId="nav-active" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C4A97D]" />
                    )}
                  </div>

                  <AnimatePresence>
                    {link.sub && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(30,50,90,0.22),0_4px_16px_rgba(30,50,90,0.12)]"
                        style={{ border: '1.5px solid #1E325A' }}
                      >
                        {/* Items on white */}
                        <div className="bg-white p-1.5">
                          {link.sub.map((item, i) => (
                            <motion.div key={item} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                              <Link
                                to={link.href}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-[#1E325A] hover:bg-[#1E325A] hover:text-white rounded-xl transition-all duration-200 font-light tracking-wide group/item"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C4A97D] flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                                {item}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                        {/* Footer */}
                        <div className="bg-[#F4F6FA] border-t border-[rgba(30,50,90,0.1)] p-1.5">
                          <Link
                            to={link.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between px-4 py-2.5 text-xs text-[#1E325A] tracking-widest uppercase font-medium hover:bg-[#1E325A] hover:text-white rounded-xl transition-all duration-200 group/view"
                          >
                            <span>View All</span>
                            <span className="group-hover/view:translate-x-1 transition-transform">→</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div key="search-open" initial={{ width: 0, opacity: 0 }} animate={{ width: 200, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="hidden md:flex items-center gap-2 h-9 rounded-full border border-[rgba(30,50,90,0.2)] bg-white/70 backdrop-blur px-3 overflow-hidden">
                    <Search className="w-3.5 h-3.5 text-[#1E325A]/40 flex-shrink-0" />
                    <input autoFocus placeholder="Search pieces..." onBlur={() => setSearchOpen(false)} className="bg-transparent text-sm text-[#1E325A] placeholder-[#1E325A]/30 outline-none w-full font-light" />
                  </motion.div>
                ) : (
                  <motion.button key="search-closed" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }} onClick={() => setSearchOpen(true)} className="hidden md:flex w-9 h-9 rounded-full items-center justify-center transition-all hover:bg-[rgba(30,50,90,0.06)] text-[#1E325A]">
                    <Search className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>

              <Link to="/wishlist">
                <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }} className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-[rgba(30,50,90,0.06)] text-[#1E325A]">
                  <Heart className="w-4 h-4" />
                  <AnimatePresence>
                    {wishlistCount > 0 && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-400 text-white rounded-full text-[9px] flex items-center justify-center font-medium">
                        {wishlistCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </Link>

              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)} className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-[rgba(30,50,90,0.06)] text-[#1E325A]">
                <ShoppingBag className="w-4 h-4" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C4A97D] text-white rounded-full text-[9px] flex items-center justify-center font-medium">
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="hidden md:block">
                <Link to="/login" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs tracking-widest uppercase font-light transition-all border text-[#1E325A] border-[rgba(30,50,90,0.2)] hover:bg-[rgba(30,50,90,0.05)]">
                  <User className="w-3 h-3" />
                  Sign In
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="hidden md:block ml-1">
                <Link to="/shop" className="px-5 py-2 rounded-full text-xs tracking-widest uppercase font-light transition-all bg-[#1E325A] text-white hover:bg-[#152548] shadow-[0_2px_12px_rgba(30,50,90,0.25)]">
                  Shop Now
                </Link>
              </motion.div>

              {/* Book Demo — dark pill with circle arrow icon */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="hidden md:block ml-1">
                <Link to="/login" className="flex items-center gap-2.5 pl-1 pr-4 py-1 rounded-full text-xs tracking-widest uppercase font-light transition-all bg-[#2C3E6B] text-white hover:bg-[#1E325A] shadow-[0_2px_16px_rgba(30,50,90,0.3)]">
                  <span className="w-7 h-7 rounded-full bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 text-white">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Book Demo
                </Link>
              </motion.div>

              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(true)} className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#1E325A]">
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#8B7355] via-[#C4A97D] to-[#8B7355] origin-left pointer-events-none" style={{ scaleX: readingProgress }} />
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 26, stiffness: 180 }} className="fixed right-0 top-0 bottom-0 z-[100] w-[300px] bg-white flex flex-col">
              <div className="flex items-center justify-between px-7 h-16 border-b border-[rgba(30,50,90,0.07)]">
                <span className="font-display text-xl text-[#1E325A] tracking-[0.2em]">FORMA</span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(false)} className="w-8 h-8 rounded-full bg-[rgba(30,50,90,0.07)] flex items-center justify-center">
                  <X className="w-4 h-4 text-[#1E325A]" />
                </motion.button>
              </div>
              <div className="flex-1 flex flex-col justify-center px-7 gap-1">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 + 0.1, ease: [0.16, 1, 0.3, 1] }}>
                    <Link to={link.href} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between py-5 border-b border-[rgba(30,50,90,0.07)]">
                      <span className="font-display text-4xl font-light text-[#1E325A] group-hover:text-[#8B7355] transition-colors duration-200">{link.label}</span>
                      <span className="text-[#C4A97D] opacity-0 group-hover:opacity-100 transition-opacity text-lg">→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="px-7 pb-10 space-y-3">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block w-full py-3.5 rounded-full border border-[rgba(30,50,90,0.2)] text-[#1E325A] text-center text-xs tracking-widest uppercase font-light hover:bg-[rgba(30,50,90,0.04)] transition-all">Sign In</Link>
                <Link to="/shop" onClick={() => setMenuOpen(false)} className="block w-full py-3.5 rounded-full bg-[#1E325A] text-white text-center text-xs tracking-widest uppercase font-light">Shop Now</Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#2C3E6B] text-white text-xs tracking-widest uppercase font-light">
                  <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  Book Demo
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
