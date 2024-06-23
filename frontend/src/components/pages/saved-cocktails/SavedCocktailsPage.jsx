//to fetch from local 

import React, { useState, useEffect } from 'react';
import './SavedCocktailsPage.css';
import ClearSavedCocktailsButton from '../clear-button/ClearSavedCocktailsButton';

const SavedCocktailsPage = () => {
  const [savedCocktails, setSavedCocktails] = useState([]);
  const [error, setError] = useState(null);
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [showCocktailList, setShowCocktailList] = useState(true);
  const [showTitle, setShowTitle] = useState(true);

  const fetchSavedCocktails = () => {
    try {
      const savedCocktails = JSON.parse(localStorage.getItem('savedCocktails')) || [];
      setSavedCocktails(savedCocktails);
    } catch (error) {
      console.error('Error fetching saved cocktails:', error);
      setError('Failed to load saved cocktails. Please try again later.');
    }
  };

  const fetchCocktailDetails = async (cocktailName) => {
    try {
      // Replace with the appropriate URL or API call to get cocktail details if necessary
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(cocktailName)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch cocktail details. Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.drinks && data.drinks.length > 0) {
        const cocktail = data.drinks[0];
        setCocktailDetails({
          cocktail_name: cocktail.strDrink,
          ingredients: Object.keys(cocktail).filter(key => key.startsWith('strIngredient') && cocktail[key]).map(key => cocktail[key]),
          measures: Object.keys(cocktail).filter(key => key.startsWith('strMeasure') && cocktail[key]).map(key => cocktail[key]),
          instructions: { instructions: cocktail.strInstructions },
          image_url: { image_url: cocktail.strDrinkThumb }
        });
        setShowCocktailList(false);
        setShowTitle(false);
      } else {
        setError('Cocktail details not found.');
      }
    } catch (error) {
      console.error('Error fetching cocktail details:', error.message);
      setError('Failed to load cocktail details. Please try again later.');
    }
  };

  const handleBackToList = () => {
    setShowCocktailList(true);
    setCocktailDetails(null);
    setShowTitle(true);
  };

  useEffect(() => {
    fetchSavedCocktails();
  }, []);

  return (
    <div>
      <div className="container">
        {showTitle && <h1 className="title">Saved Cocktails</h1>}
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <>
            {showCocktailList ? (
              <ul className="list-group cocktail-list">
                {savedCocktails.map((cocktail, index) => (
                  <li key={index} className="list-group-item" onClick={() => fetchCocktailDetails(cocktail)}>
                    {cocktail}
                  </li>
                ))}
              </ul>
            ) : (
              <div className='card-container'>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">{cocktailDetails.cocktail_name}</h3>
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Ingredient</th>
                          <th>Measure</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cocktailDetails.ingredients.map((ingredient, index) => (
                          <tr key={index}>
                            <td>{ingredient}</td>
                            <td>{cocktailDetails.measures[index]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <h5 className="card-text">Instructions </h5>
                    <p>{cocktailDetails.instructions.instructions}</p>
                    {cocktailDetails.image_url && (
                      <img
                        src={cocktailDetails.image_url.image_url}
                        className="card-img-top"
                        alt="Cocktail"
                      />
                    )}
                    <button className="btn btn-secondary back-btn" onClick={handleBackToList}>Back</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <ClearSavedCocktailsButton />
    </div>
  );
};

export default SavedCocktailsPage;



// import React, { useState, useEffect } from 'react';
// import './SavedCocktailsPage.css';
// import ClearSavedCocktailsButton from '../clear-button/ClearSavedCocktailsButton';

// const SavedCocktailsPage = () => {
//   const [savedCocktails, setSavedCocktails] = useState([]);
//   const [error, setError] = useState(null);
//   const [cocktailDetails, setCocktailDetails] = useState(null);
//   const [showCocktailList, setShowCocktailList] = useState(true);
//   const [showTitle, setShowTitle] = useState(true);

//   const fetchSavedCocktails = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/saved_cocktails');
//       if (!response.ok) {
//         throw new Error(`Failed to fetch saved cocktails. Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setSavedCocktails(data); // No need for .saved_cocktails as the data itself is an array
//     } catch (error) {
//       console.error('Error fetching saved cocktails:', error);
//       setError('Failed to load saved cocktails. Please try again later.');
//     }
//   };

//   const fetchCocktailDetails = async (cocktailName) => {
//     try {
//       const response = await fetch(`http://localhost:5000/cocktail?name=${encodeURIComponent(cocktailName)}`);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch cocktail details. Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCocktailDetails(data);
//       setShowCocktailList(false);
//       setShowTitle(false);
//     } catch (error) {
//       console.error('Error fetching cocktail details:', error.message);
//       setError('Failed to load cocktail details. Please try again later.');
//     }
//   };

//   const handleBackToList = () => {
//     setShowCocktailList(true);
//     setCocktailDetails(null);
//     setShowTitle(true);
//   };

//   useEffect(() => {
//     fetchSavedCocktails();
//   }, []);

//   return (
//     <div>
//       <div className="container">
//         {showTitle && <h1 className="title">Saved Cocktails</h1>}
//         {error ? (
//           <div className="alert alert-danger" role="alert">
//             {error}
//           </div>
//         ) : (
//           <>
//             {showCocktailList ? (
//               <ul className="list-group cocktail-list">
//                 {savedCocktails.map((cocktail, index) => (
//                   <li key={index} className="list-group-item" onClick={() => fetchCocktailDetails(cocktail)}>
//                     {cocktail}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <div className='card-container'>
//                 <div className="card">
//                   <div className="card-body">
//                     <h3 className="card-title">{cocktailDetails.cocktail_name}</h3>
//                     <table className="custom-table">
//                       <thead>
//                         <tr>
//                           <th>Ingredient</th>
//                           <th>Measure</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {cocktailDetails.ingredients.map((ingredient, index) => (
//                           <tr key={index}>
//                             <td>{ingredient}</td>
//                             <td>{cocktailDetails.measures[index]}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                     <h5 className="card-text">Instructions </h5>
//                     <p>{cocktailDetails.instructions.instructions}</p>
//                     {cocktailDetails.image_url && (
//                       <img
//                         src={cocktailDetails.image_url.image_url}
//                         className="card-img-top"
//                         alt="Cocktail"
//                       />
//                     )}
//                     <button className="btn btn-secondary back-btn" onClick={handleBackToList}>Back</button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//       <ClearSavedCocktailsButton />
//     </div>
//   );
// };

// export default SavedCocktailsPage;
