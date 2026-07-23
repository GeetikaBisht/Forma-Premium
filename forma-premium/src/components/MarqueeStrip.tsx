interface MarqueeStripProps {
  reverse?: boolean
}

export default function MarqueeStrip({ reverse = false }: MarqueeStripProps) {
  const items = [
    'Handcrafted Furniture',
    '✦',
    'Nordic Design',
    '✦',
    'Sustainably Sourced',
    '✦',
    'Free White-Glove Delivery',
    '✦',
    'Lifetime Warranty',
    '✦',
    '2,400+ Happy Homes',
    '✦',
    'FSC Certified Wood',
    '✦',
    'Carbon Neutral',
    '✦',
  ]

  const doubled = [...items, ...items]

  return (
    <div className="text-strip overflow-hidden py-3.5 select-none">
      <div
        className="marquee-track"
        style={reverse ? { animationDirection: 'reverse', animationDuration: '36s' } : { animationDuration: '30s' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`text-[11px] tracking-[0.3em] uppercase font-light mx-4 ${
              item === '✦' ? 'text-[#C4A97D]' : 'text-white/55'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
