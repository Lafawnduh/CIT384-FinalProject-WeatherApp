import React, { useState, useEffect } from 'react';
import '../styles/SlideShow.css'; // Import the styles for the SlideShow

function SlideShow({ images }) {
  const [current, setCurrent] = useState(0); // Initialize current image index state

  // Change the current image every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer); // Clear interval on component unmount
  }, [images]);

  return (
    <div className="slideshow">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === current ? 'active' : ''}`}
        >
          <img src={image} alt={`Slide ${index}`} />
        </div>
      ))}
    </div>
  );
}

export default SlideShow;
