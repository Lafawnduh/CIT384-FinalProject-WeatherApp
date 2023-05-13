import React, { useState, useEffect } from 'react';
import '../styles/SlideShow.css';

function SlideShow({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  const goPrev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const goNext = () => setCurrent(current === images.length - 1 ? 0 : current + 1);

  return (
    <div className="slideshow">
      <button className="arrow prev" onClick={goPrev}>&lt;</button>
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === current ? 'active' : ''}`}
        >
          <img src={image} alt={`Slide ${index}`} />
        </div>
      ))}
      <button className="arrow next" onClick={goNext}>&gt;</button>
    </div>
  );
}

export default SlideShow;
