# CocktailCreations Project Document

## INTRODUCTION

### Aims and Objectives of the Project

The aim of CocktailCreations is to provide an intuitive and comprehensive platform for cocktail enthusiasts to explore, discover, and create a variety of cocktail recipes. The objectives include:

- Offering a wide collection of cocktail recipes.
- Facilitating easy access to cocktail preparation instructions.
- Enhancing users' mixology skills through detailed ingredient and technique information.
- Providing a user-friendly interface for browsing and searching recipes.

### Roadmap of the Report

This report is structured as follows:

1. Introduction
2. Background
3. Specifications and Design
4. Implementation and Execution
5. Testing and Evaluation
6. Conclusion

## BACKGROUND

CocktailCreations is designed to inspire both novice and experienced mixologists by offering a diverse array of cocktail recipes. Users can search for cocktails by name, ingredients, or simply explore random suggestions. The platform aims to enhance the user experience by providing detailed preparation instructions and ingredient lists and measures for each cocktail.

### User Story

As a cocktail enthusiast, users can discover new and exciting cocktail recipes to expand their mixology skills and impress friends and family with delicious drinks. The application allows for easy browsing, searching, and exploring a vast collection of recipes, fostering an appreciation for cocktail culture.

### Motivation

Motivations for using CocktailCreations include:

- Passion for discovering new cocktail recipes and flavors.
- Enhancing social gatherings with unique cocktails.
- Personal growth in mixology skills.
- Exploring different flavors and ingredients.
- Convenience and accessibility to a centralised recipe platform.
- Find an elegant use for random ingredients in the cupboard!

### What Problems does Cocktail Creations Solve?

#### Exploration and Discovery

**Problem:** Finding new and exciting cocktails to try can be difficult.  
**Solution:** The website's search and random cocktail features allow users to explore new recipes and ingredients, satisfying their curiosity and love for experimentation.

#### Ingredient-Based Search

**Problem:** Users often have specific ingredients on hand and want to make cocktails using those.  
**Solution:** The Ingredient Picker feature lets users input available ingredients and find cocktails that can be made with them.

#### Recipe Saving

**Problem:** Keeping track of favourite or frequently used cocktail recipes can be cumbersome and disorganised. Users might forget the recipes they enjoyed or have to search through multiple sources to find them again.  
**Solution:** CocktailCreations provides a user-friendly feature for saving and managing favourite cocktail recipes, ensuring easy access and organisation.

## SPECIFICATIONS AND DESIGN

### Functional vs Non-functional Requirements

#### Functional Requirements

- Users should be able to search for cocktails by name or ingredient.
- Users can view detailed cocktail recipes including ingredients and preparation steps.
- Users can save favourite cocktails for easy access.
- The app generates random cocktail suggestions using the CocktailsDB web API.

#### Non-functional Requirements

- The application is responsive, mobile responsive and user-friendly.
- Performance is optimised for quick loading and searching.
- The error handling ensures accuracy and reliability of presented information/recipes.

### Design and Architecture

The application is built using a three-tier architecture comprising:

- **Frontend:** Developed using React.js, and react Bootstrap, providing a dynamic and interactive user interface.
- **Backend:** Implemented with Flask, handling API requests and database interactions.
- **Database:** MySQL used for storing cocktail recipes, user data, and saved cocktails.

The architecture diagram (see below) illustrates the interaction between these components:

## IMPLEMENTATION AND EXECUTION

### Development Approach and Team Member Roles

The project was developed using an agile approach, with iterative development cycles. Team members were assigned the following roles:

- **Frontend Development:** Implementing the user interface and integrating with backend APIs.
- **Backend Development:** Setting up the Flask server and creating API endpoints.
- **Database Management:** Designing and populating the MySQL database.
- **Testing:** Conducting functional and user testing to ensure application reliability.

### Tools and Libraries

#### Frontend:

- React.js: A JavaScript library for building user interfaces.
- Axios: A promise-based HTTP client for the browser and Node.js.
- Bootstrap: A CSS framework for developing responsive and mobile-first websites.
- React-Bootstrap: React components for Bootstrap.

#### Backend:

- Flask: A lightweight WSGI web application framework in Python.
- SQLAlchemy: An SQL toolkit and Object-Relational Mapping (ORM) library for Python.

#### Database:

- MySQL: A relational database management system.
- MySQL Server: The software that manages and provides access to the MySQL database.

#### Other Tools:

- Git: Version control system for tracking changes in source code.
- npm: Package manager for JavaScript.
- pip: Package installer for Python.
- Vite: Used with the React frontend.
- ESLint: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- gh-pages: A utility for publishing to GitHub pages.

### Dependencies

#### Python Dependencies th actively installed (requirements.txt):

- mysql-connector-python~=8.3.0: MySQL driver for Python.
- pip~=23.2.1: Python package installer.
- requests~=2.31.0: HTTP library for Python.
- Flask==3.0.3: A lightweight WSGI web application framework in Python.
- Flask-Cors==4.0.1: A Flask extension for handling Cross-Origin Resource Sharing (CORS). This was installed after CORS errors occurred.

#### JavaScript Dependencies (package.json):

- axios: ^1.7.2
- bootstrap: ^5.3.3
- react: ^18.2.0
- react-bootstrap: ^2.10.2
- react-dom: ^18.2.0
- react-router-dom: ^6.23.1
- react-transition-group: ^4.4.5

#### JavaScript DevDependencies (package.json):

- @types/react: ^18.2.66
- @types/react-dom: ^18.2.22
- @vitejs/plugin-react: ^4.2.1
- eslint: ^8.57.0
- eslint-plugin-react: ^7.34.1
- eslint-plugin-react-hooks: ^4.6.0
- eslint-plugin-react-refresh: ^0.4.6
- gh-pages: ^6.1.1
- vite: ^5.2.0

### Command to run the server:

flask --app run --debug

This setup ensures that all necessary dependencies for both the frontend and backend are properly specified and can be installed easily.

## Implementation Process

The implementation involved several key steps:

- **Setting up the environment:** Installing dependencies and configuring the development environment.
- **Database creation:** Designing the database schema and populating it with cocktail data.
- **API development:** Creating endpoints for searching, fetching, and saving cocktails.
- **Frontend development:** Building the user interface and integrating it with backend APIs.
- **Testing and debugging:** Iteratively testing the application and resolving issues.

## Agile Development

Agile elements used include:

- **Iterative Approach:** Regularly developing, testing, and refining features.
- **Code Reviews:** Conducting peer reviews to ensure code quality.
- **Refactoring:** Continuously improving code structure and performance.

## Implementation Challenges

- **Integrating multiple APIs:** Ensuring data and display consistency. The data had to be parsed differently.
- **Synchronizing frontend and backend development.**
- **Optimizing database queries for performance:** Initially, some queries didn’t return any results without enhanced error handling.
- **User feedback:** Testing indicated that Cocktail Creations would not be very usable as there were no measures. This was addressed and measures were implemented. This involved fetching the data, saving it to the database, creating endpoints, and creating and styling tables in the frontend to display them.
- **Adding new tables to the database:** It was challenging to add a new table to the database using separate code, then integrating that code into the database setup code, as well as remodeling the frontend after the changes.

## Testing and Evaluation

### Testing Strategy

Our testing strategy involved multiple phases to ensure the reliability and functionality of both the server and the frontend components. This included integration testing of server endpoints, iterative testing of the frontend, user feedback implementation, and deployment testing.

### Integration Testing

Integration testing focused on verifying the server responses to various client requests, ensuring that the interactions between different components of the application work correctly.

#### Server Fetch Testing

- Each server fetch operation was tested to ensure proper functionality before integrating with the frontend.
- Some of these integration tests were conducted using Python's unittest framework.
- Test cases included fetching cocktail details, fetching all ingredients, and saving cocktail names to the database.
- An example of integration test can be found in `server-fetch-tests.py`.

### Frontend Testing

The frontend was developed and tested iteratively, ensuring that each new feature or change was thoroughly evaluated.

#### Iterative Development and Testing

- The frontend was tested repeatedly using `npm run dev` to ensure smooth integration with the backend.
- Each component and functionality was tested for responsiveness, usability, and performance.
- This was also tested in DevTools in order to assess the usability and appearance on smaller screens.

#### Deployment Testing

- The frontend was deployed to GitHub Pages to test its functionality in a live environment.
- This deployment allowed for testing the application under real-world conditions and ensured that it worked correctly in a production setting.
- Note: The deployment was removed when the repository was made private.

### User Feedback and Implementation

- Conducted user surveys to gather feedback on the user interface and overall user experience.
- Based on user feedback, additional features such as adding measures to the drinks were implemented.
- Regular updates and improvements were made based on continuous development.

### Functional and User Testing

Functional and user testing were integral to ensuring the application met both technical requirements and user expectations.

#### Functional Testing

- Ensured all features worked as intended.
- Verified that each user action produced the expected result.

#### User Testing

- Involved real users testing the application to provide insights into usability and functionality.
- Implemented changes based on user suggestions to improve the overall user experience.

## System Limitations

- Dependency on external APIs for cocktail data.
- Limited offline functionality as it requires internet access to fetch and save recipes.
- Some pages in the frontend of the app require the created database and server in order to function. Future deployment to the web is planned to enable quick, online access.

## Conclusion

CocktailCreations successfully provides a platform for cocktail enthusiasts to explore and create a variety of cocktail recipes. The application offers an extensive database of recipes, intuitive search functionality, and a user-friendly interface. Future development could include user profiles, video tutorials, and personalized recipe recommendations using recursion. An example of this code has been added in the code files.


