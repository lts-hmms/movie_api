<h1 align="center">Welcome to the "mequal API"</h1>

> The server-sice component of a movies web application. It provides users with access to information about different movies, directors, and genres. Users are able to sign up, update their personal information, and create a list of their favorite movies.

## Description

- REST API that interacts with a database of information
- Returns a list of ALL movies to the user
- Returns data (description, genre, director, image URL) about a
  single movie by title to the user
- Returns data about a genre (description) by name/title (e.g., “Thriller”)
- Returns data about a director (bio, birth year, death year) by name
- Allows new users to register and loggin-in including user authentication and authorization code
- Allows users to update their user info (password, email)
- Allows users to add and remove a movie to their list of favorites
- Allows existing users to deregister

## Built with

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Use the API for your own project

- See the documentation for the API [here](https://mequal.herokuapp.com/documentation.html)
- See client-sides of the project [build with React](https://mequal.netlify.app/) and [build with Angular](https://lts-hmms.github.io/mequal-Angular-client)
