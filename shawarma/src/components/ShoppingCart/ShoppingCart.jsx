import React from 'react';
import { useEffect, useState }from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './ShoppingCart.css';
import { IoMdClose } from "react-icons/io";

const ShoppingCart = () => {
    const [mealsCost, setMealsCost] = useState([]);
    const [formattedTotal, setFormattedTotal] = useState('0')
    const [message, setMessage] = ('');
    const { cartItems, emprtyCart, removeFromCart, isCartVisible, toggleCartVisibility} = useCart();


    const sumAll = (items) => items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    useEffect(() => {
        setMealsCost(cartItems.map(item => ({
            price: parseFloat(item.price.replace(/\s/g, '')),
            quantity: parseInt(item.quantity)
        })));
    }, [cartItems]);

    useEffect(() => {
        const total = sumAll(mealsCost);
        const formatted = total.toLocaleString('fr-FR');
        setFormattedTotal(formatted);
    }, [mealsCost]);

    useEffect(() => {
        if(message === 'Ваш заказ принят!') {
            toggleCartVisibility()
        }
    }, [message, toggleCartVisibility]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const accessToken = localStorage.getItem('access')

        const config = {
            headers : {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            }
          }

        const orderItems = cartItems.map(item => ({
            meal_id: item.id,
            meal: item.name,
            quantity: item.quantity
        }));

        const body = {
            customer: 1,  
            delivery_cost: 10000,
            order_status: "on_the_way",
            order_items: orderItems 
        };
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/orders/order/', body, config);
            console.log(response.data.message); 
            if (response.data.message === 'Ваш заказ принят!') {
                toggleCartVisibility();
                emprtyCart();
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }};

    
    return (
        <form onSubmit={handleSubmit}>
            <div className={`cart-sidebar ${isCartVisible ? 'open' : ''}`}>
                <div className='cart-sidebar-content'>
                <div className="cart-sidebar-header">
                <h2>Корзина</h2>
                <button className="custom__button button-close" type='button' onClick={toggleCartVisibility}><IoMdClose/></button>
                </div>
                    <button className='button-deleteAll' type='button' onClick={emprtyCart}><FaTrash className="icon"/></button>
                    {cartItems.map((item) => (
                    <div key={item.id} className='item-container'>
                        <img src={item.image} alt="item_image" className='item-image' />
                        <div className='item-name-price-container'>
                            <h4 className='item-name'>{item.name}</h4>
                            <p className='item-price'>
                                {item.price} x {item.quantity} 
                            </p>
                        </div>
                        <button className='removeItem' type='button' onClick={() => removeFromCart(item.id)}>Удалить</button>
                    </div>
                    )) }
                    </div>
                    <div className='cart-sidebar-total'>
                        <p className='total'>Итого </p>
                        <p className='total-number'>{formattedTotal}</p>
                    </div>
                    <button type='submit' className='makeOrder'>Сделать Заказ</button>
            </div>
        </form>
    );
}

export default ShoppingCart;



