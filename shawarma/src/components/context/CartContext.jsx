import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => { 
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false); 

      const addToCart = (meal) => {
        setCartItems((prevItems) => {
          const itemInCart = prevItems.find(item => item.id === meal.id);
          if (itemInCart) {
            return prevItems.map(item =>
              item.id === meal.id ? {...item, quantity: item.quantity + 1} : item
            );
          }
          return [...prevItems, {...meal, quantity: 1}];
        });
      };

    const removeFromCart = (mealId) => {
        setCartItems((prevItems) =>
        prevItems.reduce((acc, item) => {
            if (item.id === mealId) {
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

    const emprtyCart = () => {
        setCartItems([])
    };

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, emprtyCart, isCartVisible, toggleCartVisibility }}>
            {children}
        </CartContext.Provider>
    );
};
































