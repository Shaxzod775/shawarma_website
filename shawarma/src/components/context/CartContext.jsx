import React, { createContext, useContext, useState } from 'react';
import { images } from '../../constants';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => { 
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false); 

    const meals = [
        { id: 1, name: 'Кремовая миска с травами', image: images.meal3, price: '80 000 сум' },
        { id: 2, name: 'Тушеные бобы с укропом', image: images.meal5, price: '60 000 сум' },
        { id: 3, name: 'Салат из овощей и пюре', image: images.meal4, price: '40 000 сум' },
        { id: 4, name: 'Острая рисовая миска c яйцом', image: images.meal7, price: '33 000 сум' },
        { id: 5, name: 'Фаршированный пита-сэндвич', image: images.meal1, price: '21 000 сум' },
        { id: 6, name: 'Средиземноморская тарелка', image: images.meal2, price: '120 000 сум' },
      ];

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
































