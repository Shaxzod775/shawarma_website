import React, { useState } from 'react';

import { images } from '../../constants';
import { MdShoppingBasket } from 'react-icons/md';
import { MdPerson } from 'react-icons/md';
import { MdLocationOn } from 'react-icons/md';
import { FiLogIn } from "react-icons/fi";
import { useCart } from '../context/CartContext'; 
import { Link } from 'react-scroll';
import { useAuth } from '../context/AuthContext';
import { IoFastFoodOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'


const Navbar = ({ onSignInClick, onAddressClick, onMyInfoClick }) => {
  const { toggleCartVisibility } = useCart();
  const { userLoggedIn} = useAuth();
  const navigate = useNavigate();

  const goHome= () => {
    navigate('/');
  }

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
          <img onClick={goHome} src={images.logo} alt="app logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans"><Link to="Header" onClick={goHome} smooth={true} duration={500}>Главная</Link></li>
        <li className="p__opensans"><Link to="SpecialMenu" smooth={true} duration={500}>Меню</Link></li>
        <li className="p__opensans"><Link to="AboutUs" smooth={true} duration={500}>О нас</Link></li>
        <li className="p__opensans"><Link to="FindUs" smooth={true} duration={500}>Контакты</Link></li>
      </ul>
      
      <div className="app__navbar-buttons">
        {userLoggedIn && <button className="custom__button" onClick={onAddressClick}><MdLocationOn style={{ marginRight: '6px' }}/><span>Укажите ад...</span></button>}
        <button className="custom__button" onClick={toggleCartVisibility}><MdShoppingBasket style={{ marginRight: '6px' }}/><span>Корзина</span></button>
        <PopoverButton onSignInClick={onSignInClick} onMyInfoClick={onMyInfoClick}/>
      </div>

    </nav>
  );
};

const PopoverButton = ({ onSignInClick, onMyInfoClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { userLoggedIn, logoutUser } = useAuth();
  const navigate = useNavigate()

  const togglePopover = (show) => {
    setIsVisible(show);
  };

  const goToOrders = () => {
    navigate('/orders');
  }

  return (
    <div className="popover-container"
      onMouseLeave={() => setIsVisible(false)}
      >
      <button onMouseEnter={() => togglePopover(true)} className="custom__button button-login">
        <MdPerson/>
      </button>
      {isVisible && (
        <div className="login_button-content" 
             onMouseEnter={() => setIsVisible(true)}>
        {!userLoggedIn && <div onClick={onSignInClick}>
             <h4><FiLogIn style={{ marginRight: '5px' }} />Войти</h4>
          </div>}
        {userLoggedIn && <div>
             <h4 onClick={onMyInfoClick}><MdPerson style={{ marginRight: '5px' }} />Мои данные</h4>
             <h4 onClick={goToOrders} ><IoFastFoodOutline style={{ marginRight: '5px' }} /><Link to='/orders' onClick={goToOrders}>Мои заказы</Link> </h4>
             <h4 onClick={logoutUser}><FiLogIn style={{ marginRight: '5px' }} />Выйти</h4>
          </div>}
        </div>
      )}
    </div>
  );
};

export default Navbar;
