import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition } from 'react-transition-group';
import './Home.css';
import RoseCocktail from "../../assets/images/cocktail-images/rose.jpeg";
import CaptainKidd from "../../assets/images/cocktail-images/captain-kidd-punch.jpeg";
import ChampagneCocktail from "../../assets/images/cocktail-images/champagne-cocktail.jpeg";
import Mescal from "../../assets/images/cocktail-images/mescal.jpeg";
import CubaLibre from "../../assets/images/cocktail-images/cuba-libre.jpeg";
import Philosopher from "../../assets/images/cocktail-images/philosopher.jpeg";
import WhiteLady from "../../assets/images/cocktail-images/white-lade.jpeg";
import Mojito from "../../assets/images/cocktail-images/mojito.jpg";
import EspressoRumtini from "../../assets/images/cocktail-images/espresso-rumtini.jpeg";

const cocktailImages = [
  RoseCocktail, CaptainKidd, Mescal, CubaLibre, Philosopher, WhiteLady, Mojito, EspressoRumtini, ChampagneCocktail, 
];

function Home() {
  const [showImages, setShowImages] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setShowImages(true);
    }, 3000); // Delay before starting image carousel

    return () => clearTimeout();
  }, []);

  useEffect(() => {
    let imageInterval;
    if (showImages) {
      imageInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % cocktailImages.length);
      }, 500); // Time to change image

      // Stop changing images after 10 seconds
      setTimeout(() => {
        clearInterval(imageInterval);
      }, 10000);
    }

    return () => clearInterval(imageInterval);
  }, [showImages]);

  return (
    <div className="home-page">
       <h1 style={{fontSize: "3rem"}}>Cocktail Creations</h1>
      <h3>Your cocktails, mixed your way.</h3>

      <CSSTransition in={showImages} timeout={1000} classNames="fade" unmountOnExit>
        <div className="image-carousel">
          <img src={cocktailImages[currentImageIndex]} alt="Cocktail" />
        </div>
      </CSSTransition>

      <div className="page-info">
        <section className="hero">
          <h2>Welcome to Cocktail Creations!</h2>
          <p>
          Cocktail Creations is your ultimate destination for crafting and exploring delicious cocktails! Whether you're a seasoned mixologist or a budding enthusiast, Cocktail Creations offers a diverse collection of cocktail recipes to inspire your creativity. Browse through a variety of cocktails and find step-by-step instructions to mix your perfect drink. You can make a random cocktail for a delightful surprise, search for cocktails by name, or find recipes based on specific ingredients you have on hand. Join us on a flavorful journey and elevate your cocktail-making skills from the comfort of your home. Cheers to new creations and delightful sips!
          </p>
        </section>
      </div>
    </div>
  );
}

export default Home;
