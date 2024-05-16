import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Home.css'; 

function Home() {
  return (
    <div>
      <header>
        {/* header */}
        <h1>Header</h1>
      </header>
      <section className="hero">
        {/*  hero section*/}
        <h1>Welcome to Your Cocktail Creations App</h1>
        <p>Information...</p>
      </section>
    </div>
  );
}

export default Home;
