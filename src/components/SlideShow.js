import React, { useState, useEffect } from 'react';
import config from './config';
import { Box, CircularProgress } from '@mui/material';
import '../styles/SlideShow.css'

function SlideShow({ city }) {
  console.log('City', city)
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${config.UNSPLASH_API_KEY}`
      );
      const data = await response.json();
      setPhotos(data.results);
      setLoading(false);
    }

    fetchPhotos();
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [photos]);

  if (loading || photos.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="slideshow">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          style={{
            display: index === activeIndex ? 'block' : 'none',
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${photo.urls.regular})`,
          }}
        />
      ))}
    </div>
  );
}

export default SlideShow;
