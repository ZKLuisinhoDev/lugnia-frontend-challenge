import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CartProvider, useCart, CART_STORAGE_KEY } from './CartContext';
import React from 'react';

// Wrapper component to provide context to the hook
const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should add an item to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const product = { id: 1, name: 'Test Product', price: 100 };
    
    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].id).toBe(1);
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('should increase quantity if item already in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test Product', price: 100 };
    
    act(() => {
      result.current.addToCart(product);
      result.current.addToCart(product);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
  });

  it('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test Product', price: 100 };
    
    act(() => {
      result.current.addToCart(product);
    });
    
    expect(result.current.cart).toHaveLength(1);

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('should calculate the correct total', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart({ id: 1, name: 'A', price: 100 });
      result.current.addToCart({ id: 2, name: 'B', price: 200 });
      result.current.addToCart({ id: 1, name: 'A', price: 100 }); // Quantity 2
    });

    expect(result.current.getCartTotal()).toBe(400);
  });

  it('should persist cart to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Persist', price: 50 };
    
    act(() => {
      result.current.addToCart(product);
    });

    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].name).toBe('Persist');
  });
});
