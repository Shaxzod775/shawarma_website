import React from 'react';
import { useCart } from '../context/CartContext';
import './ShoppingCart.css';
import { IoMdClose } from "react-icons/io";

const ShoppingCart = () => {
    const { cartItems, removeFromCart, isCartVisible, toggleCartVisibility} = useCart();


    return (
        <div className={`cart-sidebar ${isCartVisible ? 'open' : ''}`}>
            <div className="cart-sidebar-header">
            <h2>Корзина</h2>
            <button className="custom__button button-close" onClick={toggleCartVisibility}><IoMdClose/></button>
            </div>
                {cartItems.map((item) => (
                <div key={item.id}>
                    <h4>{item.name}</h4>
                    <p>
                        ${item.price} x {item.quantity} 
                    </p>
                    <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                </div>
                )) }
        </div>
    );
}

export default ShoppingCart;



