import React from 'react';
import { images } from '../../constants';

import './AboutUs.css';

const AboutUs = () => (
  <div id="AboutUs" className='app_about-container'>
    <div className='app-about-info-container'>
      <h1 className='app_about-title'>Наша Цель<span>.</span></h1>
      <div className='app_about-info-p-container'>
        <p className='app_about-info p1'>Нашей целью является: Привнесение новых блюд в узбекскую гастрономию.</p>
        <p className='app_about-info'>Стремясь обновить наше меню, "Ташкентская Шаурма" вводит новые блюда, сохраняя при этом уникальное сочетание традиций и новаторства.</p>
        <p className='app_about-info'>Мы выбрали путь объединения классических блюд Ближнего Востока с оригинальными рецептами, чтобы предложить нашим посетителям не только знакомые вкусы, но и новые гастрономические впечатления.</p>
      </div>
    </div>
    <div className='app_about-img-container'>
      <div className='app_about-img-text'>
        <p className='app_about-img-line'>_______________________________________________________</p> 
        <img src={images.logo} alt="logo" />
        <p className='app_about-img-title-info'>Средиземноморская Кухня</p>
        <p className='app_about-img-title-info-m'>Высокое качество и халяльное месо</p>
        <p className='app_about-img-line'>_______________________________________________________</p> 
      </div>
    </div>
  </div>
);

export default AboutUs;



