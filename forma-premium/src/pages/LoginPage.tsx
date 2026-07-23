import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react'

export default function LoginPage() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#1E325A]">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 600 800" fill="none" className="w-full h-full">
            <circle cx="500" cy="100" r="300" stroke="white" strokeWidth="0.5"/>
            <circle cx="500" cy="100" r="200" stroke="white" strokeWidth="0.5"/>
            <circle cx="500" cy="100" r="100" stroke="white" strokeWidth="0.5"/>
            <circle cx="100" cy="700" r="200" stroke="white" strokeWidth="0.5"/>
            <circle cx="100" cy="700" r="120" stroke="white" strokeWidth="0.5"/>
          </svg>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C4A97D]/40"
            style={{ left: `${10 + i * 11}%`, top: `${15 + (i % 4) * 20}%` }}
            animate={{ y: [-8, 8, -8], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#C4A97D] text-xs tracking-[0.3em] uppercase font-light block mt-10">Members Club</span>
              <h2 className="font-display text-5xl font-light text-white leading-tight mb-6">
                Furniture that<br/>
                <em className="not-italic text-[#C4A97D]">lasts a lifetime.</em>
              </h2>
              <p className="text-white/50 font-light leading-relaxed max-w-sm text-sm">
                Join the Forma community. Unlock early access to new collections, exclusive member pricing, and bespoke design consultations.
              </p>
            </motion.div>

            {/* Perks */}
            <motion.div
              className="mt-10 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {['Early access to new collections', 'Member-exclusive pricing', 'Free design consultation', 'Priority white-glove delivery'].map((perk, i) => (
                <motion.div
                  key={perk}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <div className="w-5 h-5 rounded-full bg-[#C4A97D]/20 border border-[#C4A97D]/40 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#C4A97D]" />
                  </div>
                  <span className="text-white/60 text-sm font-light">{perk}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="text-white/20 text-xs font-light">© 2026 Forma. All rights reserved.</div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 md:px-12 mt-5">
        {/* Mobile logo */}
        <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="w-6 h-6 rounded-md bg-[#1E325A] flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
              <path d="M4 14L10 6L16 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display text-xl font-light tracking-[0.18em] text-[#1E325A]">FORMA</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Tab switcher */}
          <div className="flex bg-white rounded-2xl p-1.5 mb-8 shadow-[0_2px_12px_rgba(30,50,90,0.07)]">
            {(['signin', 'signup'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative flex-1 py-2.5 text-sm tracking-widest uppercase font-light rounded-xl transition-colors"
              >
                {tab === t && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-[#1E325A] rounded-xl"
                    transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                  />
                )}
                <span className={`relative transition-colors ${tab === t ? 'text-white' : 'text-[#1E325A]/50'}`}>
                  {t === 'signin' ? 'Sign In' : 'Create Account'}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 14 }}
                  className="w-16 h-16 rounded-full bg-[#1E325A] flex items-center justify-center mx-auto mb-5"
                >
                  <Check className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="font-display text-2xl font-light text-[#1E325A] mb-2">Welcome to Forma</h3>
                <p className="text-[#1E325A]/50 text-sm font-light">Redirecting you home…</p>
              </motion.div>
            ) : (
              <motion.form
                key={tab}
                initial={{ opacity: 0, x: tab === 'signin' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: tab === 'signin' ? 20 : -20 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <p className="font-display text-3xl font-light text-[#1E325A] mb-1">
                    {tab === 'signin' ? 'Welcome back' : 'Join Forma'}
                  </p>
                  <p className="text-[#1E325A]/45 text-sm font-light">
                    {tab === 'signin' ? 'Sign in to your account to continue.' : 'Create your account and start exploring.'}
                  </p>
                </div>

                {tab === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-xs tracking-widest uppercase text-[#1E325A]/50 font-light">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-white border border-[rgba(30,50,90,0.12)] rounded-2xl px-5 py-3.5 text-sm text-[#1E325A] placeholder-[#1E325A]/30 outline-none focus:border-[#1E325A]/30 focus:shadow-[0_0_0_3px_rgba(30,50,90,0.06)] transition-all font-light"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs tracking-widest uppercase text-[#1E325A]/50 font-light">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white border border-[rgba(30,50,90,0.12)] rounded-2xl px-5 py-3.5 text-sm text-[#1E325A] placeholder-[#1E325A]/30 outline-none focus:border-[#1E325A]/30 focus:shadow-[0_0_0_3px_rgba(30,50,90,0.06)] transition-all font-light"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs tracking-widest uppercase text-[#1E325A]/50 font-light">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-[rgba(30,50,90,0.12)] rounded-2xl px-5 py-3.5 text-sm text-[#1E325A] placeholder-[#1E325A]/30 outline-none focus:border-[#1E325A]/30 focus:shadow-[0_0_0_3px_rgba(30,50,90,0.06)] transition-all font-light pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1E325A]/30 hover:text-[#1E325A]/60 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {tab === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-xs tracking-widest uppercase text-[#1E325A]/50 font-light">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        required
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white border border-[rgba(30,50,90,0.12)] rounded-2xl px-5 py-3.5 text-sm text-[#1E325A] placeholder-[#1E325A]/30 outline-none focus:border-[#1E325A]/30 focus:shadow-[0_0_0_3px_rgba(30,50,90,0.06)] transition-all font-light pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1E325A]/30 hover:text-[#1E325A]/60 transition-colors"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {tab === 'signin' && (
                  <div className="flex justify-end">
                    <button type="button" className="text-xs text-[#8B7355] hover:text-[#1E325A] transition-colors font-light tracking-wide">
                      Forgot password?
                    </button>
                  </div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-2xl bg-[#1E325A] text-white text-sm tracking-widest uppercase font-light flex items-center justify-center gap-2 hover:bg-[#152548] transition-all shadow-[0_4px_16px_rgba(30,50,90,0.25)] mt-2"
                >
                  {tab === 'signin' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>

                {/* Divider */}
                <div className="flex items-center gap-4 py-1">
                  <div className="flex-1 h-px bg-[rgba(30,50,90,0.08)]" />
                  <span className="text-xs text-[#1E325A]/30 font-light">or</span>
                  <div className="flex-1 h-px bg-[rgba(30,50,90,0.08)]" />
                </div>

                {/* Social */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Google', icon: 'G' },
                    { name: 'Apple', icon: '⌘' },
                  ].map((s) => (
                    <motion.button
                      key={s.name}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-[rgba(30,50,90,0.1)] text-sm text-[#1E325A]/70 font-light hover:bg-[rgba(30,50,90,0.02)] transition-all shadow-[0_1px_8px_rgba(30,50,90,0.05)]"
                    >
                      <span className="font-medium text-[#1E325A]">{s.icon}</span>
                      {s.name}
                    </motion.button>
                  ))}
                </div>

                <p className="text-center text-xs text-[#1E325A]/40 font-light pt-1">
                  {tab === 'signin' ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setTab(tab === 'signin' ? 'signup' : 'signin')}
                    className="text-[#8B7355] hover:text-[#1E325A] transition-colors underline underline-offset-2"
                  >
                    {tab === 'signin' ? 'Create one' : 'Sign in'}
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
