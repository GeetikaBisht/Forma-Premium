import { createContext, useContext, useState, ReactNode } from 'react'
import type { Product } from '../data/products'

interface WishlistContextType {
  items: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  toggleWishlist: (product: Product) => void
  count: number
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  const addToWishlist = (product: Product) => {
    setItems(prev => prev.find(p => p.id === product.id) ? prev : [...prev, product])
  }

  const removeFromWishlist = (productId: string) => {
    setItems(prev => prev.filter(p => p.id !== productId))
  }

  const isWishlisted = (productId: string) => items.some(p => p.id === productId)

  const toggleWishlist = (product: Product) => {
    if (isWishlisted(product.id)) removeFromWishlist(product.id)
    else addToWishlist(product)
  }

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
