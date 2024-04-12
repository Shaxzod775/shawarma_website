import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => { 
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false); 

    const addToCart = (product) => { 
        setCartItems((prevItems) => {
        const ItemInCart = prevItems.find((item) => item.id === product.id);
        if (ItemInCart) {
            return prevItems.map((item) =>
                item.id === product.id ? {...item, quantity: item.quantity + 1} : item 
            );
        }
        return [...prevItems, {...product, quantity: 1}];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
        prevItems.reduce((acc, item) => {
            if (item.id === productId) {
                if (item.quantity > 1) {
                    acc.push({ ...item, quantity: item.quantity - 1});
                }
            } else {
               acc.push(item);
            }
            return acc;
        }, [])
        );
    };

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartVisible, toggleCartVisibility }}>
            {children}
        </CartContext.Provider>
    );
};
































