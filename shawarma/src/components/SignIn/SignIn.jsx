import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import axios  from 'axios';
import './SignIn.css';
import { useAuth } from '../context/AuthContext';

const SignInModal = ({ isOpen, onClose, onSignUpClick }) => {
  const [placeholder, setPlaceholder] = useState('Введите ваш номер телефона');
  const [formData, setFormData] = useState({ phoneNumber: '', password: '' });
  const [message, setMessage] = useState('');
  const {loginUser, logoutUser, getToken} = useAuth();


  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/accounts/login/', {
        phone:formData.phoneNumber,
        password: formData.password
      });
        setMessage(response.data.message);
        localStorage.setItem('phone', formData.phoneNumber)
        if (message === 'User logged in successfully.') {
        }
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else if (error.request) {
          setMessage('No response from the server');
        } else {
          setMessage('Error: ' + error.message);
          }
        }
    }


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

  useEffect(() => {
    if (message === 'User logged in successfully.') {
      getToken(formData);
      onClose();
      loginUser();
      const expirationTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
      localStorage.setItem('loggedIn', JSON.stringify({ loggedIn: true, expiration: expirationTime.toISOString() }));
    }
  }, [message, onClose]);

  useEffect(() => {
    const loggedInData = localStorage.getItem('loggedIn');
    if (loggedInData) {
      const { loggedIn, expiration } = JSON.parse(loggedInData);
      if (loggedIn && new Date(expiration) <= new Date()) {
        logoutUser(); 
      } else if (!loggedIn) {
        localStorage.removeItem('loggedIn');
      }
    }
  }, []);

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
                      required
                      onFocus={() => setPlaceholder('+998 __ ___ __ __')}
                      onBlur={() => setPlaceholder('Введите ваш номер телефона')}  
                      />

                <label>Пароль</label>
                <input className='app-signIn-input_password' 
                      type="password" id="password" 
                      placeholder='Введите пароль'
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      />
              <p className='app-signIn-signUpButton' onClick={onSignUpClick}>Ещё не зарегистрировались? Нажмите сюда</p>
              {message && <p>{message}</p>}
              <button type='submit' className='app-signIn-submitButton'>Войти</button>
            </form>
            </div>
          </div>
      </div>
    </div> 
  );
};

export default SignInModal;