import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import axios  from 'axios';
import './Address.css';


const AddressModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [formValues, setFormValues] = useState({
    address: '',
    apartment: '',
    intercom: '',
    entrance: '',
    floor: '',
    comments: ''
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('access');

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/user/address/', formValues, config); 
      if (response.data.message === 'Адрес добавлен успешно!') {
        setMessage(response.data.message);


      }
    } catch (error) {
      if (error.response) {
        setMessage(token)
      } else {
        setMessage("An error occurred");
        console.error("An unknown error occurred:", error);
      }
    }
  }

  useEffect(() => {
    if (message === 'Адрес добавлен успешно!') {
      onClose();
      window.location.reload()
    }
  }, [message, onClose]);

  useEffect(() => {
    const handleCloseOnClickOutside = (event) => {
      const content = document.querySelector('.app__address-content');

      if (content && !content.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleCloseOnClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleCloseOnClickOutside);
    };
  }, [isOpen, onClose]); 

  if (!isOpen) return null;
 
  return (
    <div className='app__address-container'>
        <div className='app__address-content'>
            <button className='app__signIn-closeButton' onClick={onClose}><IoMdClose/></button>
            <div className='app__address-inner'> 
            <h1>Адрес доставки</h1>
            <form onSubmit={handleSubmit} className='app__address-form'>
              <input id="address" type="text" placeholder='Адрес' value={formValues.address} onChange={handleInputChange} required/>
              <div className='app__address-form-additional'>
                <input id="apartment" type="text" placeholder='Кв./офис' value={formValues.apartment} onChange={handleInputChange} required/>
                <input id="intercom" type="text" placeholder='Домофон' value={formValues.intercom} onChange={handleInputChange} required/>
                <input id="entrance" className='app__address-inputNumber' type="number" placeholder='Подъезд' value={formValues.entrance} onChange={handleInputChange} required/>
                <input id="floor" type="number" placeholder='Этаж' value={formValues.floor} onChange={handleInputChange} required/>
              </div>
              <input id="comments" type="text" placeholder='Комментарии' value={formValues.comments} onChange={handleInputChange}/>
              
              {message && <p>{message}</p>}
              <button type='submit' className='app__address-saveButton'>Сохранить</button>
            </form>
            </div>
        </div> 
    </div>
  );
};

export default AddressModal;