import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './OrderDetails.css';


const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [message, setMessage] = useState('');
  const [meals, setMeals] = useState([]);
  const [address, setAddress] = useState('');
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const getOrderDetails = async () => {
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
      const ordersData = response.data.map(order => ({
        orderNumber: order.id,
        orderDeliveryCost: order.delivery_cost,
        orderDate: formatDate(order.ordered_at),            
        orderStatus: order.order_status, 
        totalCost: order.total_cost,   
        orderItems: order.order_items.map(item => ({
          mealName: item.meal.name,
          mealDescription: item.meal.description,
          quantity: item.quantity,
          itemTotalCost: item.item_total_cost
        })),
      }));
      const filteredOrders = ordersData.filter(order => order.orderNumber == id);
      const filteredOrdersMeals = ordersData.filter(order => order.orderNumber == id);
      setOrder(filteredOrders[0]);
      setMeals(filteredOrdersMeals[0].orderItems);

    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setMessage('Failed to load orders.');
    }
  }

  const getAddress = async () => {
    const accessToken = localStorage.getItem('access')
    
    const config = {
      headers : {
        'Authorization': `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    } 
    
    try {
      const responseAddress = await axios.get('http://127.0.0.1:8000/api/accounts/user/address/', config);
      setAddress(responseAddress.data[0].address)
    } catch (error) {
      setMessage(error || "An error occured")
    }
  }

  const getFullname = async () => {
    const accessToken = localStorage.getItem('access')
    
    const config = {
      headers : {
        'Authorization': `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    } 
    
    try {
      const responseFullname = await axios.get('http://127.0.0.1:8000/api/accounts/user/fullname/', config);
      setFullname(responseFullname.data.fullname)
    } catch (error) {
      setMessage(error || "An error occured")
    }
  }

  const getPhoneNumber = () => {
    const phone = localStorage.getItem('phone')
    setPhoneNumber(phone)
  }



  useEffect(() => {
    getOrderDetails()
    getFullname()
    getAddress()
    getPhoneNumber()
  }, []);


  return (
    <div className='app__orderDetails-container'>
      <div className='app__orderDetails_content'>
          <h1 className='app__orders-title'>Мои заказы</h1>
          <div className='app__orderDetails-receipt'>
              <h1 className='order-number'>Заказ №{id}</h1>
              <h5 className='order-date'>{order.orderDate}</h5>
              <div className='app__orderDetails-info'> 
                <div className='orderDetails-firstPart'>
                  <div className="orderDetais-info">
                    <h2 className='order-deliveryCost'>Доставка:</h2> 
                    <h2>{order.orderDeliveryCost}</h2>
                  </div>
                </div>
                <div className='orderDetails-SecondPart'>
                {meals.map((meal, index) => (
                    <div key={index} className='meal-item'>
                      <h2 className='meal-name'>{meal.quantity}x {meal.mealName}</h2>
                      <h2 className='meal-total-cost'>{meal.itemTotalCost} сум</h2>
                    </div>
                     ))}
                </div>
                <div className='order-totalCost-container'>
                  <h2 className='order-totalCost'>Итого </h2>
                  <h2 className='order-totalCost-number'>{order.totalCost} </h2>
                </div>
                <div className='orderDetails-thirdPart'>
                  <div className='order-client-container'>
                    <h2 className='order-client'>Клиент</h2>
                    <h2 className='order-client-fullname'>{fullname}</h2>
                  </div>
                  <div className='order-client-address'>
                    <h2 className='order-address'>Адрес</h2>
                    <h2 className='order-address-info'>{address}</h2>
                  </div>
                  <div className='order-client-phone'>
                    <h2 className='order-phone'>Номер Телефона</h2>
                    <h2 className='order-phone-info'>{phoneNumber}</h2>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default OrderDetail;