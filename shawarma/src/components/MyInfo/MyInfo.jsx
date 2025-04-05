import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import axios  from 'axios';
import './MyInfo.css';


const MyInfoModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ fullname: '', address: '' });
    const [address, setAddress] = useState('');
    const [fullname, setFullname] = useState('');
    const [message, setMessage] = useState('');

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
            const accessToken = localStorage.getItem('access');
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            };

            const bodyAdress = {
                "address": `${formData.address}`,
                "apartment": 0,
                "intercom": 0,
                "entrance": 0,
                "floor": 0,
                "comments": 'null'
            }
    

            const bodyFullname = {
                "fullname": `${formData.fullname}`
            }
    
            if (!fullname.trim() && formData.fullname.trim()) {
                await axios.post('http://34.60.112.89:8000/api/accounts/user/fullname/', bodyFullname, config);
            } else if (formData.fullname !== fullname) {
                await axios.put('http://34.60.112.89:8000/api/accounts/user/fullname/', bodyFullname, config);
            }
    
            if (!address.trim() && formData.address.trim()) {
                await axios.post('http://34.60.112.89:8000/api/accounts/user/address/', bodyAdress, config);
            } else if (formData.address !== address) {
                await axios.post('http://34.60.112.89:8000/api/accounts/user/address/', bodyAdress, config);
            }
    
            setMessage('User information updated successfully');
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

    const getAddress = async () => {
      const accessToken = localStorage.getItem('access');
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      };
      try {
        const response = await axios.get('http://34.60.112.89:8000/api/accounts/user/address/', config);
        const addressData = response.data[0]?.address ?? '';
        setAddress(addressData);
        setFormData(prevState => ({
          ...prevState,
          address: addressData
        }));
      } catch (error) {
        console.error('Error fetching address:', error);
        setMessage('An error occurred while fetching address');
      }
    }
    
    const getFullname = async () => {
      const accessToken = localStorage.getItem('access');
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      };
      try {
        const response = await axios.get('http://34.60.112.89:8000/api/accounts/user/fullname/', config);
        const fullnameData = response.data?.fullname ?? '';
        setFullname(fullnameData);
        setFormData(prevState => ({
          ...prevState,
          fullname: fullnameData
        }));
      } catch (error) {
        console.error('Error fetching fullname:', error);
        setMessage('An error occurred while fetching fullname');
      }
    }

    useEffect(() => {
      if (isOpen) {
        getAddress()
        getFullname()
      }
    }, [isOpen])

    useEffect(() => {
      if (message === 'User information updated successfully') {
        onClose();
        window.location.reload()
      } 
    }, [message, onClose]);

    useEffect(() => {
      const handleCloseOnClickOutside = (event) => {
        const content = document.querySelector('.app__myInfo-content');
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

    if (!isOpen) return null


  return (
    <div className='app__myInfo-container'>
      <div className='app__myInfo-content'>
          <button className='app__myInfo-closeButton' onClick={onClose}><IoMdClose/></button>
          <div className='app__myInfo-inner'> 
            <h1>Мои Данные</h1>
          <div className='app__myInfo-form-container'>
            <form onSubmit={handleSubmit} className='app__myInfo-form'>
                <label>ФИО</label>
                <input className='app__myInfo-input_fullname' 
                      type="text" id="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      required
                      />

                <label>Адрес</label>
                <input className='app__myInfo-input_address' 
                      type="text" id="address" 
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      />
              <div className='app__myInfo-buttons-container'>
                <button onClick={onClose} className='app__myInfo-cancelButton'>Отмена</button>
                <button type='submit' className='app__myInfo-saveButton'>Сохранить</button>
              </div>
            </form>
            </div>
          </div>
      </div>
    </div> 
  );
};

export default MyInfoModal;
