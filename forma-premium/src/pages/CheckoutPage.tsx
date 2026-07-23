import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Lock, CreditCard, Truck, ArrowLeft, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'

type Step = 'shipping' | 'payment' | 'review'

interface ShippingForm { firstName: string; lastName: string; email: string; phone: string; address: string; city: string; state: string; zip: string; country: string }
interface PaymentForm { cardNumber: string; name: string; expiry: string; cvv: string }

const inputCls = "w-full bg-white border border-[rgba(30,50,90,0.15)] rounded-xl px-4 py-3 text-sm text-[#1E325A] placeholder-[rgba(30,50,90,0.3)] outline-none focus:border-[#1E325A] transition-colors"
const labelCls = "block text-xs tracking-widest uppercase text-[rgba(30,50,90,0.55)] mb-1.5 font-light"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('shipping')
  const [shipping, setShipping] = useState<ShippingForm>({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'United States' })
  const [payment, setPayment] = useState<PaymentForm>({ cardNumber: '', name: '', expiry: '', cvv: '' })
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'white'>('standard')

  const shippingCost = shippingMethod === 'white' ? 149 : shippingMethod === 'express' ? 49 : 0
  const tax = Math.round(total * 0.08)
  const grandTotal = total + shippingCost + tax

  const formatCard = (v: string) => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  const formatExpiry = (v: string) => { const d = v.replace(/\D/g,'').slice(0,4); return d.length>2 ? d.slice(0,2)+'/'+d.slice(2) : d }

  const steps: { key: Step; label: string }[] = [
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ]

  const handlePlaceOrder = () => {
    clearCart()
    navigate('/order-confirmation')
  }

  if (items.length === 0 && step !== 'review') {
    return (
      <div className="min-h-screen bg-[#f0f0f0] pt-24 flex flex-col items-center justify-center gap-6">
        <p className="font-display text-3xl text-[rgba(30,50,90,0.4)] font-light">Your cart is empty</p>
        <Link to="/shop" className="px-8 py-3 rounded-full bg-[#1E325A] text-white text-xs tracking-widest uppercase">Shop Now</Link>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-[#f0f0f0] pt-20 md:pt-24">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <Link to="/cart" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#8B7355] hover:text-[#1E325A] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Cart
            </Link>
            <div className="flex items-center gap-2 ml-4">
              {steps.map((s, i) => (
                <div key={s.key} className="flex items-center gap-2">
                  <button onClick={() => { if (i < steps.findIndex(st => st.key === step)) setStep(s.key) }} className={`flex items-center gap-2 text-xs tracking-widest uppercase transition-colors ${s.key === step ? 'text-[#1E325A] font-medium' : i < steps.findIndex(st => st.key === step) ? 'text-[#8B7355] cursor-pointer hover:text-[#1E325A]' : 'text-[rgba(30,50,90,0.3)]'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium ${s.key === step ? 'bg-[#1E325A] text-white' : i < steps.findIndex(st => st.key === step) ? 'bg-[#8B7355] text-white' : 'bg-[rgba(30,50,90,0.1)] text-[rgba(30,50,90,0.4)]'}`}>
                      {i < steps.findIndex(st => st.key === step) ? <Check className="w-3 h-3" /> : i + 1}
                    </span>
                    {s.label}
                  </button>
                  {i < steps.length - 1 && <ChevronRight className="w-3 h-3 text-[rgba(30,50,90,0.25)]" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* Left Panel */}
            <AnimatePresence mode="wait">
              {step === 'shipping' && (
                <motion.div key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="font-display text-3xl font-light text-[#1E325A] mb-8">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelCls}>First Name</label><input className={inputCls} placeholder="Amara" value={shipping.firstName} onChange={e => setShipping({...shipping, firstName: e.target.value})} /></div>
                    <div><label className={labelCls}>Last Name</label><input className={inputCls} placeholder="Osei" value={shipping.lastName} onChange={e => setShipping({...shipping, lastName: e.target.value})} /></div>
                    <div className="col-span-2"><label className={labelCls}>Email</label><input type="email" className={inputCls} placeholder="amara@example.com" value={shipping.email} onChange={e => setShipping({...shipping, email: e.target.value})} /></div>
                    <div className="col-span-2"><label className={labelCls}>Phone</label><input className={inputCls} placeholder="+1 (555) 000-0000" value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} /></div>
                    <div className="col-span-2"><label className={labelCls}>Address</label><input className={inputCls} placeholder="123 Elm Street, Apt 4B" value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} /></div>
                    <div><label className={labelCls}>City</label><input className={inputCls} placeholder="New York" value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} /></div>
                    <div><label className={labelCls}>State</label><input className={inputCls} placeholder="NY" value={shipping.state} onChange={e => setShipping({...shipping, state: e.target.value})} /></div>
                    <div><label className={labelCls}>ZIP Code</label><input className={inputCls} placeholder="10001" value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})} /></div>
                    <div><label className={labelCls}>Country</label>
                      <select className={inputCls} value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})}>
                        {['United States','United Kingdom','Canada','Australia','Germany','France','Sweden','Norway'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="mt-8">
                    <h3 className="font-display text-xl font-light text-[#1E325A] mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                      {([
                        { id: 'standard', label: 'Standard Delivery', sub: '5–8 business days', price: 'Free' },
                        { id: 'express', label: 'Express Delivery', sub: '2–3 business days', price: '$49' },
                        { id: 'white', label: 'White Glove Delivery', sub: 'In-home delivery & assembly', price: '$149' },
                      ] as const).map(opt => (
                        <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${shippingMethod === opt.id ? 'border-[#1E325A] bg-[#f8f9fc]' : 'border-[rgba(30,50,90,0.1)] hover:border-[rgba(30,50,90,0.25)]'}`}>
                          <input type="radio" name="shipping" value={opt.id} checked={shippingMethod === opt.id} onChange={() => setShippingMethod(opt.id)} className="hidden" />
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${shippingMethod === opt.id ? 'border-[#1E325A]' : 'border-[rgba(30,50,90,0.3)]'}`}>
                            {shippingMethod === opt.id && <div className="w-2 h-2 rounded-full bg-[#1E325A]" />}
                          </div>
                          <Truck className="w-4 h-4 text-[#8B7355] flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#1E325A]">{opt.label}</p>
                            <p className="text-xs text-[rgba(30,50,90,0.5)]">{opt.sub}</p>
                          </div>
                          <span className="text-sm font-medium text-[#1E325A]">{opt.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => setStep('payment')} className="mt-8 w-full py-4 rounded-2xl bg-[#1E325A] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#152548] transition-colors flex items-center justify-center gap-2">
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="font-display text-3xl font-light text-[#1E325A] mb-2">Payment Details</h2>
                  <div className="flex items-center gap-2 mb-8">
                    <Lock className="w-3.5 h-3.5 text-[#8B7355]" />
                    <span className="text-xs text-[rgba(30,50,90,0.5)]">Your information is encrypted and secure</span>
                  </div>

                  {/* Card visual */}
                  <div className="relative w-full aspect-[1.7/1] max-w-sm mb-8 rounded-2xl bg-gradient-to-br from-[#1E325A] to-[#2C3E6B] p-6 text-white shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <svg viewBox="0 0 40 14" className="w-10 h-3.5 fill-[#C4A97D]"><rect width="18" height="14" rx="7"/><rect x="22" width="18" height="14" rx="7"/></svg>
                        <CreditCard className="w-5 h-5 opacity-60" />
                      </div>
                      <div>
                        <p className="font-mono text-lg tracking-[0.15em] mb-3">{payment.cardNumber || '•••• •••• •••• ••••'}</p>
                        <div className="flex justify-between">
                          <div><p className="text-[9px] uppercase tracking-widest opacity-60 mb-0.5">Card Holder</p><p className="text-sm font-light">{payment.name || 'Your Name'}</p></div>
                          <div><p className="text-[9px] uppercase tracking-widest opacity-60 mb-0.5">Expires</p><p className="text-sm font-light">{payment.expiry || 'MM/YY'}</p></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className={labelCls}>Card Number</label>
                      <input className={inputCls} placeholder="1234 5678 9012 3456" value={payment.cardNumber} onChange={e => setPayment({...payment, cardNumber: formatCard(e.target.value)})} maxLength={19} />
                    </div>
                    <div className="col-span-2">
                      <label className={labelCls}>Name on Card</label>
                      <input className={inputCls} placeholder="Amara Osei" value={payment.name} onChange={e => setPayment({...payment, name: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelCls}>Expiry</label>
                      <input className={inputCls} placeholder="MM/YY" value={payment.expiry} onChange={e => setPayment({...payment, expiry: formatExpiry(e.target.value)})} maxLength={5} />
                    </div>
                    <div>
                      <label className={labelCls}>CVV</label>
                      <input className={inputCls} placeholder="•••" value={payment.cvv} onChange={e => setPayment({...payment, cvv: e.target.value.replace(/\D/,'').slice(0,4)})} maxLength={4} type="password" />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-8">
                    <button onClick={() => setStep('shipping')} className="text-xs tracking-widest uppercase text-[rgba(30,50,90,0.5)] hover:text-[#1E325A] transition-colors flex items-center gap-1.5">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button onClick={() => setStep('review')} className="flex-1 py-4 rounded-2xl bg-[#1E325A] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#152548] transition-colors flex items-center justify-center gap-2">
                      Review Order <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div key="review" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="font-display text-3xl font-light text-[#1E325A] mb-8">Review Your Order</h2>

                  {/* Items */}
                  <div className="space-y-4 mb-8">
                    {items.map(item => (
                      <div key={item.product.id} className="flex gap-4 p-4 rounded-2xl bg-[#f8f9fc]">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#E8E0D0] flex-shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-display text-base font-light text-[#1E325A]">{item.product.name}</p>
                          <p className="text-xs text-[rgba(30,50,90,0.5)] mt-0.5">{item.product.material}</p>
                          <p className="text-xs text-[rgba(30,50,90,0.5)] mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-[#1E325A]">${(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping info summary */}
                  <div className="grid grid-cols-2 gap-4 mb-8 p-4 rounded-2xl bg-[#f8f9fc]">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-[rgba(30,50,90,0.4)] mb-1">Ship to</p>
                      <p className="text-sm text-[#1E325A]">{shipping.firstName || 'Not set'} {shipping.lastName}</p>
                      <p className="text-xs text-[rgba(30,50,90,0.5)]">{shipping.address || '—'}</p>
                      <p className="text-xs text-[rgba(30,50,90,0.5)]">{shipping.city}{shipping.city && shipping.state ? ', ' : ''}{shipping.state} {shipping.zip}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-[rgba(30,50,90,0.4)] mb-1">Payment</p>
                      <p className="text-sm text-[#1E325A]">{payment.cardNumber ? `•••• ${payment.cardNumber.replace(/\s/g,'').slice(-4)}` : 'Card not set'}</p>
                      <p className="text-xs text-[rgba(30,50,90,0.5)]">{payment.name || '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <button onClick={() => setStep('payment')} className="text-xs tracking-widest uppercase text-[rgba(30,50,90,0.5)] hover:text-[#1E325A] transition-colors flex items-center gap-1.5">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button onClick={handlePlaceOrder} className="flex-1 py-4 rounded-2xl bg-[#C4A97D] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#b8985e] transition-colors flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(196,169,125,0.4)]">
                      <Lock className="w-4 h-4" /> Place Order · ${grandTotal.toLocaleString()}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right: Order Summary */}
            <div className="bg-white rounded-3xl p-7 shadow-sm h-fit sticky top-28">
              <h3 className="font-display text-xl font-light text-[#1E325A] mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#E8E0D0]">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm text-[#1E325A] font-light leading-tight">{item.product.name}</p>
                        <p className="text-xs text-[rgba(30,50,90,0.4)]">×{item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-[#1E325A]">${(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[rgba(30,50,90,0.08)] pt-4 space-y-2.5">
                <div className="flex justify-between text-sm text-[rgba(30,50,90,0.6)]"><span>Subtotal</span><span>${total.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm text-[rgba(30,50,90,0.6)]">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-sm text-[rgba(30,50,90,0.6)]"><span>Tax (8%)</span><span>${tax.toLocaleString()}</span></div>
                <div className="flex justify-between font-medium text-[#1E325A] text-base pt-2 border-t border-[rgba(30,50,90,0.08)]">
                  <span>Total</span><span>${grandTotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-[rgba(30,50,90,0.4)]">
                <Lock className="w-3 h-3" />
                <span>256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
