import React from 'react';
import { useState, useEffect } from 'react';

import './Gallery.css';
import { meal1, meal2, meal3, meal4, meal5, meal6 } from '../../constants';



const Gallery = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [videos, setVideos] = useState([meal1, meal2, meal3, meal4, meal5, meal6]); 

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);


    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 750 && !videos.includes(meal6)) {
      setVideos(prevVideos => [...prevVideos, meal6]); 
    } else if (windowWidth >= 750 && videos.includes(meal6)) {
      setVideos(videos.slice(0, -1)); 
    }
  }, [windowWidth, videos]);

  return (
    <div className='app-gallery-container'>
      <div className='app-gallery-content'>
      <h1>Галлерея<span>.</span></h1>
        <div className='app-gallery-video-container'>
          
          {videos.map((meal, index) => (
            <div key={index} className='meal-video'>
              <video
                src={meal}
                type="video/mp4"
                loop
                muted
                autoPlay
                controls={false}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;