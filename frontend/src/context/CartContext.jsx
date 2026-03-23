import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('rare_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('rare_cart', JSON.stringify(cart));
    }, [cart]);

    // cart array contains { product, quantity }
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
            if (existingIndex !== -1) {
                const newCart = [...prevCart];
                newCart[existingIndex] = {
                    ...newCart[existingIndex],
                    quantity: newCart[existingIndex].quantity + 1
                };
                return newCart;
            }
            return [...prevCart, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }
        setCart(prevCart => prevCart.map(item => 
            item.product.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
