import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const getOrders = async () => {
    const accessToken = localStorage.getItem('access')

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
      return new Date(dateString).toLocaleDateString('ru-Ru', options);
    };

    const config = {
      headers : {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/orders/order/', config);  
      let ordersData = response.data.map(order => ({
        orderNumber: order.id,              
        orderStatus: order.order_status,    
        orderDate: formatDate(order.ordered_at),       
      }));

      ordersData = ordersData.sort((a, b) => b.orderNumber - a.orderNumber);
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setMessage('Failed to load orders.');
    }
  }

  const openOrderDetails = (orderId) => {
    navigate(`/orders/${orderId}`)
  }

  useEffect(() => {
      getOrders();
  }, []);


  return( 
  <div className='app__orders-container'>
    <div className='app__orders-content'>
      <h1 className='app__orders-title'>Мои заказы</h1>
        <div className='app__orders-info'>
        {orders.length > 0 ? orders.map((order, index) => (
            <div key={index} className='order' onClick={() => openOrderDetails(order.orderNumber)}>
              <div className="order_title_button">
                <h1 className='order_number'>Заказ №{order.orderNumber}</h1>
                <div className="order_button"><FontAwesomeIcon icon={faArrowRight} /></div> 
              </div>
              <div className='order_details'>
                {order.orderStatus === 'on_the_way' && <h4 className='order_status_on_the_way'>Заказ в процессе доставки</h4>}
                {order.orderStatus === 'delivered' && <h4 className='order_status_delivered'>Заказ передан клиенту</h4>}
                {order.orderStatus === 'cancelled' && <h4 className='order_status_cancelled'>Заказ отменён</h4>}
                <h4 className='order_date'>{order.orderDate}</h4>
              </div>
            </div>
          )) : <div className='app__orders_content-empty'>Вы пока что не сделали никаких заказов...</div>}
      </div>
    </div>
  </div>
  )
};

export default Orders;
