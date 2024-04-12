import React from 'react';
import './FindUs.css';

const FindUs = () => (
  <div className='app-aboutus-container' id="FindUs">
    <div className='app-aboutus-contactus'>
        <h2>ХОТИТЕ ПРОВЕСТИ МЕРОПРИЯТИЕ У НАС ?</h2>
        <h1>Свяжитесь с нами сегодня<span>.</span></h1>
    </div>
    <div className='app-aboutus-contacts-container'>
        <div className='app-aboutus-contact'>
          <h4 className='app-aboutus-address'>Amir Temur Avenue</h4>
          <button className='app-aboutus-number'>(95) 694-94-48</button>
        </div>
        <div className='app-aboutus-contact'>
          <h4 className='app-aboutus-address'>Beruni Avenue</h4>
          <button className='app-aboutus-number'>(98) 609-05-59</button>
        </div>
        <div className='app-aboutus-contact'>
          <h4 className='app-aboutus-address'>Little Ring Road 8</h4>
          <button className='app-aboutus-number'>(91) 443-62-26</button>
        </div>
    </div>
    <div className='app-aboutus-location-container'>
      <div className='app-abouts-location'>
        
      </div>
    </div>
  </div>
);

export default FindUs;
