import React, { useState, useEffect, useRef } from 'react';
import { images } from '../../constants';
import './SpecialMenu.css';

const SpecialMenu = () => {
  const meals = [
    { name: 'Кремовая миска с травами', image: images.meal3, description: 'Сумах/паприка, оливковое масло и зелень', price: '80 000 сум' },
    { name: 'Тушеные бобы с укропом', image: images.meal5, description: 'Бобы, злаки, специи, свежие овощи', price: '60 000 сум' },
    { name: 'Салат из овощей и пюре', image: images.meal4, description: 'Нарезанные овощи с травами, хлебом, заправкой', price: '40 000 сум' },
    { name: 'Острая рисовая миска c яйцом', image: images.meal7, description: 'Рис на томате, овощи, белок, яйца, лук', price: '33 000 сум' },
    { name: 'Фаршированный пита-сэндвич', image: images.meal1, description: ' Мясо, овощи, цацики/тахини с секретным соусом', price: '21 000 сум' },
    { name: 'Средиземноморская тарелка', image: images.meal2, description: 'Жареные овощи, белки, хумус, травы и добавки', price: '120 000 сум' },
  ];

  const loopedMeals = [meals[meals.length - 1], ...meals, meals[0]];

  const middleIndex = Math.floor(meals.length / 2);
  const [currentMealIndex, setCurrentMealIndex] = useState(middleIndex);
  const scrollRef = useRef(null);


  const scrollToMeal = (index) => {
    const scrollWidth = scrollRef.current.scrollWidth / loopedMeals.length;
    scrollRef.current.scrollTo({
      left: scrollWidth * index,
      behavior: 'smooth'
    });

    const mealWidth = scrollRef.current.offsetWidth;
    const scrollX = (mealWidth * index) - (mealWidth / 2);
    scrollRef.current.scrollTo({
      left: scrollX,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMealIndex(prevIndex => prevIndex < meals.length ? prevIndex + 1 : 1);
    }, 3000); 

    return () => clearInterval(timer);
  }, [meals.length]);

  useEffect(() => {
    scrollToMeal(currentMealIndex);

    if (currentMealIndex === meals.length) {
      setTimeout(() => {
        scrollToMeal(1);
      }, 1000); 
    }
    else if (currentMealIndex === 0) {
      setTimeout(() => {
        scrollToMeal(meals.length);
      }, 1000); 
    }
  }, [currentMealIndex, meals.length]);


  const nextMeal = () => {
    setCurrentMealIndex(prevIndex => (prevIndex < meals.length - 1 ? prevIndex + 1 : 0));
  };

  const prevMeal = () => {
    setCurrentMealIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : meals.length - 1));
  };

  const scroll = (direction) => {
    const { current } = scrollRef;

    if(direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  }


  return (
  <div id="SpecialMenu" className='specialMenu-container'>
    <div className='specialMenu-description'>
      <h1 className='specialMenu-mainTitle'>Меню<span>.</span></h1>
      <p className='specialMenu-description-text'>Наше меню – это калейдоскоп вкусов и ароматов, вдохновленный традициями и инновациями.</p>
      <p className='specialMenu-description-text'>Мы предлагаем эксклюзивное ассорти блюд, каждое из которых таит в себе уникальное сочетание ингредиентов высшего качества. От острой рисовой миски до нежного фаршированного пита-сэндвича, наше меню призвано удовлетворить изысканный вкус и желание открыть что-то новое.</p>
      <p className='specialMenu-description-text'>Погрузитесь в мир гастрономических удовольствий, где каждое блюдо рассказывает свою историю, наполненную любовью к кулинарии и творческим подходом к каждой детали.</p>
    </div>
    <h1 className='specialMenu-title'>Популярные Блюда</h1>
    <div className='specialMenu-meal-container' ref={scrollRef}>
       {loopedMeals.map((meal, index) => (
         <div key={index} className={`meal ${index === currentMealIndex ? 'centralMeal' : ''}`}>
          <img src={meal.image} alt={meal.name} />
          <div className='meal-title-text'>
            <h2>{meal.name}</h2>
            <p className='meal-description'>{meal.description}</p>
            <p className='meal-price'>{meal.price}</p>
            <button className='specialMenu-button-basket'>В Корзину</button>
          </div>
        </div>
      ))}
    </div>
    <div className='specialMenu-button-container'>
      <button onClick={() => { scroll('left'); prevMeal(); }} className='specialMenu-leftright'>&lt;</button>
      <button onClick={() => { scroll('right'); nextMeal(); }} className='specialMenu-leftright'>&gt;</button>
    </div>
  </div>
  );
};

export default SpecialMenu;
