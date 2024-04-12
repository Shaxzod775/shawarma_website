import React from 'react';
import { images } from '../../constants';

import './Chef.css';

const Chef = () => (
  <div className='app-chef-container'>
    <div className='app-chef-content'>
      <h1 className='app-chef-title'>Наш Шеф<span>.</span></h1>
      <div className='app-chef-info-container'>
        <p className='app-chef-description'>Я страстный повар и гордый владелец двух процветающих ресторанов. У меня есть степень в области управления гостиничным бизнесом, и я посвятил 22 года пищевой промышленности, включая девять лет работы в престижном Plaza Hotel в Турции. Мое кулинарное путешествие началось со школьных учебных курсов, сфокусированных на гостеприимстве.</p>
        <div className='app-chef-picture-name'>
          <div className='app-chef-img-container'>
            <button className='app-chef-description-button-left' >20 лет в кулинарии</button>
            <img src={images.chef} alt="chef-photo" />
            <button className='app-chef-description-button-right1'>Опыт в 3 странах</button>
            <button className='app-chef-description-button-right2'>Победитель в номинации шеф Турции</button>
          </div>
        </div>
        <p className='app-chef-description'>Наша приверженность исключительным обеденным опытам и страсть к кулинарным творениям выделили нас как ярких представителей индустрии. Мне волнующе делиться своим видением третьего ресторана "Лава" в этом невероятном месте, так как я верю, что он имеет потенциал стать кулинарной точкой притяжения.</p>
      </div>
    </div>
  </div>
);

export default Chef;
