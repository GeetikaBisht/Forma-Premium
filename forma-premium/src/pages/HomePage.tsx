import { useEffect } from 'react'
import Hero from '../components/Hero'
import FeaturedCollections from '../components/FeaturedCollections'
import BentoGrid from '../components/BentoGrid'
import BestSellers from '../components/BestSellers'
import CraftsmanshipSection from '../components/CraftsmanshipSection'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import MarqueeStrip from '../components/MarqueeStrip'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

export default function HomePage() {
  useScrollAnimations()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax]')
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.3')
        el.style.transform = `translateY(${scrollY * speed}px)`
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Hero is sticky z-0; all content below scrolls over it */}
      <Hero />

      {/* Content scrolls over the sticky hero */}
      <div className="relative z-10">
        {/* Smooth top edge — subtle gradient connector */}
        <div className="h-6 bg-gradient-to-b from-[#f0f0f0]/0 to-[#f0f0f0] pointer-events-none" />

        <div className="bg-[#f0f0f0] rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden shadow-[0_-24px_80px_rgba(0,0,0,0.12)]">
          <MarqueeStrip />
          <BentoGrid />
          <FeaturedCollections />
          <MarqueeStrip reverse />
          <BestSellers />
          <CraftsmanshipSection />
          <Testimonials />
          <Newsletter />
          <Footer />
        </div>
      </div>
    </>
  )
}
