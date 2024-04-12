import React from 'react';
import { Link } from 'react-scroll';


import './Header.css';

const Header = () => (
  <div className="app__header-container" id="Header">
    <h3 className="header__Helvetica">Азиатские Блюда</h3>
    <h1 className="header__Helvetica">Больше Чем Просто Шаурма</h1>
    <Link to="SpecialMenu" smooth={true} duration={500}><button className="button"><span>Сделать Заказ</span></button></Link>
  </div>
);

export default Header;
