import React from 'react';

import './Footer.css';

const Footer = () => (
  <div className='app-footer-container'>
    <div className='app-footer-content'>
      <div className='app-footer-title'>
        <h2>Шаурма<span>.</span></h2>
        <h5>Лучшая шаурма в Ташкенте</h5>
      </div>
      <p className='app-footer-address'>57 Beruni Avenue, Tashkent, 10002</p>
      <div className='app-footer-doneby'>
        <p className='app-footer-madeby'>Done by Usmanov Shaxzod</p>
        <p className='app-footer-madeby'>@2024</p>
      </div>
    </div>
  </div>
);

export default Footer;
