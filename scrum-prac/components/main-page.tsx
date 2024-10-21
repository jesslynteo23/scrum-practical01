'use client'

import { useState } from 'react'
import { ProductListingComponent } from './product-listing'
import { CartModel } from './cart-model'
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export function MainPageComponent() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="relative">
      <ProductListingComponent />
      
      <div className="fixed bottom-4 right-4">
        <Button variant="outline" size="icon" onClick={() => setIsCartOpen(!isCartOpen)}>
          <ShoppingCart className="h-6 w-6" />
        </Button>
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <CartModel />
            <Button className="mt-4" onClick={() => setIsCartOpen(false)}>Close Cart</Button>
          </div>
        </div>
      )}
    </div>
  )
}