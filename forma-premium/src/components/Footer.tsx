import { Link } from 'react-router-dom'
import { Instagram, Twitter, Youtube } from 'lucide-react'

const links = {
  Shop: ['Seating', 'Tables', 'Bedroom', 'Storage', 'Lighting'],
  Collections: ['Nordic', 'Fjord', 'Aurora', 'New Arrivals'],
  Company: ['About FORMA', 'Sustainability', 'Careers', 'Press'],
  Support: ['Delivery & Returns', 'Care Guide', 'FAQ', 'Contact'],
}

export default function Footer() {
  return (
    <footer className="bg-[#f0f0f0] border-t border-[rgba(30,50,90,0.08)] pt-20 pb-10 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-3xl font-light text-[#1E325A] tracking-[0.15em] block mb-4">FORMA</span>
            <p className="text-sm text-[rgba(30,50,90,0.5)] font-light leading-relaxed mb-6">
              Elevating living through thoughtful design. Furniture for the way you actually live.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-full border border-[rgba(30,50,90,0.15)] flex items-center justify-center text-[rgba(30,50,90,0.5)] hover:text-[#8B7355] hover:border-[#8B7355] transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#1E325A] font-medium mb-5">{title}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <Link to="/shop" className="text-sm text-[rgba(30,50,90,0.5)] hover:text-[#8B7355] transition-colors font-light">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[rgba(30,50,90,0.08)]">
          <span className="text-xs text-[rgba(30,50,90,0.35)] font-light tracking-wide">
            © 2026 FORMA. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms', 'Cookie Settings'].map(item => (
              <span key={item} className="text-xs text-[rgba(30,50,90,0.35)] hover:text-[#8B7355] cursor-pointer transition-colors">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
