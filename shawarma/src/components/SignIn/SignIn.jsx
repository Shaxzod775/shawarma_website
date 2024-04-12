import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import './SignIn.css';

const SignInModal = ({ isOpen, onClose }) => {
  const [placeholder, setPlaceholder] = useState('Введите ваш номер телефона');
  const [formData, setFormData] = useState({ phoneNumber: '', password: '' });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (event) => {
    console.log('Form submit attempted');
    event.preventDefault(); // Prevent the default form submission
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful sign in here
        console.log('Sign in successful');
        onClose(); // Optionally close the modal on success
      } else {
        // Handle errors or unsuccessful sign ins
        console.error('Failed to sign in');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  useEffect(() => {
    const handleCloseOnClickOutside = (event) => {
      const content = document.querySelector('.app-signIn-content');

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
    <div className='app-signIn-container'>
      <div className='app-signIn-content'>
          <button className='app-signIn-closeButton' onClick={onClose}><IoMdClose/></button>
          <div className='app-signIn-inner'> 
            <h1>Вход на Сайт</h1>
          <div className='app-signIn-form-container'>
            <form onSubmit={handleSubmit} className='app-singIn-form'>
                <label>Номер телефона</label>
                <input className='app-signIn-input_number' 
                      type="text" id="phoneNumber"
                      placeholder={placeholder}
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      onFocus={() => setPlaceholder('+998 __ ___ __ __')}
                      onBlur={() => setPlaceholder('Введите ваш номер телефона')}  
                      />

                <label>Пароль</label>
                <input className='app-signIn-input_password' 
                      type="password" id="password" 
                      placeholder='Введите пароль'
                      value={formData.password}
                      onChange={handleInputChange}
                      />
              <p className='app-signIn-signUpButton'>Ещё не зарегистрировались? Нажмите сюда</p>
              <button type='submit' className='app-signIn-submitButton'>Войти</button>
            </form>
            </div>
          </div>
      </div>
    </div> 
  );
};

export default SignInModal;