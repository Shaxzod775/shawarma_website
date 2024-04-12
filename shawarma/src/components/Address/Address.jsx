import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import './Address.css';

const AddressModal = ({ isOpen, onClose }) => {
  const [formValues, setFormValues] = useState({
    address: '',
    office: '',
    intercom: '',
    entrance: '',
    floor: '',
    comments: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        console.log('Address saved successfully');
        onClose(); 
      } else {
        console.error('Failed to save address');
      }
    } catch (error) {
      // Handle network errors
      console.error('Error:', error);
    }
  };


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
              <input name="address" type="text" placeholder='Адрес' onChange={handleInputChange}/>
              <div className='app__address-form-additional'>
                <input name="office" type="text" placeholder='Кв./офис' onChange={handleInputChange}/>
                <input name="intercom" type="text" placeholder='Домофон' onChange={handleInputChange}/>
                <input name="entrance" type="text" placeholder='Подъезд' onChange={handleInputChange}/>
                <input name="floor" type="text" placeholder='Этаж' onChange={handleInputChange}/>
              </div>
              <input name="comments" type="text" placeholder='Комментарии' onChange={handleInputChange}/>
            </form>
            <button type='submit' className='app__address-saveButton'>Сохранить</button>
            </div>
        </div> 
    </div>
  );
};

export default AddressModal;