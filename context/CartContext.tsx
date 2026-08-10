"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

interface CartItem {
  productId: string;
  quantity: number;
  product: any;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (productId: string, quantity?: number, customBuild?: any) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const refreshCart = async () => {
    setLoading(true);
    
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading cart:', error);
        setItems([]);
        setLoading(false);
        return;
      }

      if (!data) {
        const { error: insertError } = await supabase
          .from('carts')
          .insert({
            user_id: user.id,
            items: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (insertError) {
          console.error('Error creating cart:', insertError);
        }
        setItems([]);
        setLoading(false);
        return;
      }

      setItems(data.items || []);
    } catch (error) {
      console.error('Error loading cart:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const saveCart = async (cartItems: CartItem[]) => {
    if (!user) return;

    console.log('🔍 Saving cart:', cartItems);

    try {
      const { data: existing } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      let error;

      if (existing) {
        const { error: updateError } = await supabase
          .from('carts')
          .update({
            items: cartItems,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('carts')
          .insert({
            user_id: user.id,
            items: cartItems,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        error = insertError;
      }

      if (error) {
        console.error('Error saving cart:', error);
      } else {
        console.log('✅ Cart saved successfully');
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addToCart = async (productId: string, quantity: number = 1, customBuild?: any) => {
    console.log('🔍 addToCart called:', { productId, quantity, customBuild });
    console.log('🔍 Current items before:', items);

    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    const currentItems = [...items];
    const existing = currentItems.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      if (customBuild) {
        console.log('🛠️ Adding custom build:', customBuild);
        currentItems.push({
          productId,
          quantity,
          product: {
            id: productId,
            name: customBuild.buildName || 'Custom Build',
            price: customBuild.total || 0,
            image: 'https://placehold.co/600x600/121722/E3A24C?text=Custom+Build',
            slug: productId,
            specs: customBuild.parts || [],
            in_stock: true,
          }
        });
      } else {
        try {
          const { data: productData, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

          if (error || !productData) {
            console.error('Product not found:', error);
            return;
          }

          currentItems.push({
            productId,
            quantity,
            product: productData
          });
        } catch (error) {
          console.error('Failed to fetch product:', error);
          return;
        }
      }
    }

    console.log('🔍 Items after update:', currentItems);
    setItems(currentItems);
    await saveCart(currentItems);
  };

  const removeFromCart = async (productId: string) => {
    const currentItems = items.filter((item) => item.productId !== productId);
    setItems(currentItems);
    await saveCart(currentItems);
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    const currentItems = [...items];
    const item = currentItems.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      setItems(currentItems);
      await saveCart(currentItems);
    }
  };

  const clearCart = async () => {
    setItems([]);
    await saveCart([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}