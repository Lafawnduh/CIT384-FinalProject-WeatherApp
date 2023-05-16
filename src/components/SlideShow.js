// Import necessary libraries and modules
import React, { useState, useEffect } from 'react'; // React and its hooks
import '../styles/SlideShow.css'; // CSS for this component

// Define the SlideShow component, which accepts a prop 'images'
function SlideShow({ images }) {
  // Declare state variable 'current' for tracking the current slide
  const [current, setCurrent] = useState(0);

  // Use the useEffect hook to change slides automatically every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length); // Change to the next slide
    }, 3000);
    return () => clearInterval(timer); // Clear the interval when the component is unmounted
  }, [images]); // End of useEffect hook, with 'images' as the dependency

  // Define helper functions for navigation buttons
  const goPrev = () => setCurrent(current === 0 ? images.length - 1 : current - 1); // Change to the previous slide
  const goNext = () => setCurrent(current === images.length - 1 ? 0 : current + 1); // Change to the next slide

  // Render the slideshow with navigation buttons
  return (
    <div className="slideshow">
      <button className="arrow prev" onClick={goPrev}>&lt;</button>
      {/* Map over 'images' and render each slide */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === current ? 'active' : ''}`} // Add 'active' class to the current slide
        >
          <img src={image} alt={`Slide ${index}`} /> {/* Render the image */ }
        </div>
      ))}
      <button className="arrow next" onClick={goNext}>&gt;</button>
    </div>
  );
}

// Export the SlideShow component so it can be used in other modules
export default SlideShow;
