import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { useAuth } from '../context/AuthContext';
import axios  from 'axios';
import './SignUp.css';

const SignUpModal = ({ isOpen, onClose }) => {
    const [placeholder, setPlaceholder] = useState('Введите ваш номер телефона');
    const [formData, setFormData] = useState({ phoneNumber: '', password: '' });
    const [message, setMessage] = useState('');
    const {loginUser} = useAuth();
  
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
          const response = await axios.post('http://34.60.112.89:8000/api/accounts/register/', {
            phone:formData.phoneNumber,
            password:formData.password
          });
          setMessage(response.data.message);
          if (message === 'User logged in successfully.') {
            
            const response_token = await axios.post('http://34.60.112.89:8000/api/accounts/token/', {
              phone:formData.phoneNumber,
              password:formData.password
            });
              localStorage.setItem('refresh', response_token.data.message.refresh)
              localStorage.setItem('access', response_token.data.message.access)
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
      };

      useEffect(() => {
        if (message === 'User created successfully.') {
          onClose();
          loginUser();
          const expirationTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
          localStorage.setItem('loggedIn', JSON.stringify({ loggedIn: true, expiration: expirationTime.toISOString() }));
        }
      }, [message, onClose]);

      if (!isOpen) return null;
      
return (
    <div className='app__signUp-container'>
      <div className='app__signUp-content'>
          <button className='app__signUp-closeButton' onClick={onClose}><IoMdClose/></button>
          <div className='app__signUp-inner'> 
            <h1>Регистрация</h1>
          <div className='app__signUp-form-container'>
            <form onSubmit={handleSubmit} className='app__signUp-form'>
                <label>Номер телефона</label>
                <input className='app__signUp-input_number' 
                      type="text" id="phoneNumber"
                      placeholder={placeholder}
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      onFocus={() => setPlaceholder('+998 __ ___ __ __')}
                      onBlur={() => setPlaceholder('Введите ваш номер телефона')}  
                      />

                <label>Пароль</label>
                <input className='app__signUp-input_password' 
                      type="password" id="password" 
                      placeholder='Введите пароль'
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      />
              {message && <p>{message}</p>}
              <button type='submit' className='app__signUp-submitButton'>Зарегистрироваться</button>
            </form>
            </div>
          </div>
      </div>
    </div> 
  );
};

export default SignUpModal;

