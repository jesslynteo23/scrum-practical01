'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from 'lucide-react'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export function CartModel() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      const groupedCart = groupCartItems(parsedCart)
      setCartItems(groupedCart)
    }
  }, [])

  const groupCartItems = (items: any[]): CartItem[] => {
    return items.reduce((acc: CartItem[], item) => {
      const existingItem = acc.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        acc.push({ ...item, quantity: 1 })
      }
      return acc
    }, [])
  }

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const removeFromCart = (id: number) => {
    const newCart = cartItems.filter(item => item.id !== id)
    updateCart(newCart)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    const newCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    updateCart(newCart)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-lg font-semibold">Total: ${getTotalPrice().toFixed(2)}</div>
          <div className="space-x-2">
            <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
            <Button>Checkout</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}