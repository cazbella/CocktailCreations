import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition } from 'react-transition-group';
import './Home.css';
import RoseCocktail from "../../assets/images/cocktail-images/rose.jpeg";
import NuttyIrishman from "../../assets/images/cocktail-images/nutty-irishman.jpeg";

const cocktailImages = [
  RoseCocktail, NuttyIrishman,
];

function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showImages, setShowImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      setShowWelcome(false);
      setShowImages(true);
    }, 3000); // Display welcome message for 3 seconds

    return () => clearTimeout(welcomeTimeout);
  }, []);

  useEffect(() => {
    let imageInterval;
    if (showImages) {
      imageInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % cocktailImages.length);
      }, 1000); // Change image every second
    }

    const imagesTimeout = setTimeout(() => {
      setShowImages(false);
    }, 13000); // Show images for 10 seconds

    return () => {
      clearInterval(imageInterval);
      clearTimeout(imagesTimeout);
    };
  }, [showImages]);

  return (
    <div className="home-page">
      <CSSTransition in={showWelcome} timeout={1000} classNames="fade" unmountOnExit>
        <div className="welcome-message">Welcome to Cocktail Creations!</div>
      </CSSTransition>

      <CSSTransition in={showImages} timeout={1000} classNames="fade" unmountOnExit>
        <div className="image-carousel">
          <img src={cocktailImages[currentImageIndex]} alt="Cocktail" />
        </div>
      </CSSTransition>

      {!showWelcome && !showImages && (
        <div className="page-info">
          <header>
            <h1>Header</h1>
          </header>
          <section className="hero">
            <h1>Welcome to Your Cocktail Creations App</h1>
            <p>Information...</p>
          </section>
        </div>
      )}
    </div>
  );
}

export default Home;
