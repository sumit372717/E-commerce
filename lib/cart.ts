import { Product } from './types'

export interface CartItem {
  productId: string
  quantity: number
  product: Product
}

// Use localStorage for persistence
let listeners: (() => void)[] = []

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem('cart_items')
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading cart:', error)
  }
  return []
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('cart_items', JSON.stringify(items))
  } catch (error) {
    console.error('Error saving cart:', error)
  }
}

export function addToCart(productId: string, quantity: number = 1) {
  const cart = getCart()
  const existing = cart.find(item => item.productId === productId)
  
  if (existing) {
    existing.quantity += quantity
  } else {
    const { products } = require('./data')
    const product = products.find((p: Product) => p.id === productId)
    if (!product) throw new Error('Product not found')
    cart.push({ productId, quantity, product })
  }
  
  saveCart(cart)
  listeners.forEach(fn => fn())
  return cart
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter(item => item.productId !== productId)
  saveCart(cart)
  listeners.forEach(fn => fn())
  return cart
}

export function getTotalItems() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0)
}

export function getTotalPrice() {
  return getCart().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
}

export function subscribe(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter(fn => fn !== listener)
  }
}