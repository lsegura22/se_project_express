# WTWR (What to Wear?): Back End

This is the back-end server for the **WTWR (What to Wear?)** application — a full-stack project that helps users choose clothing based on the weather. This part of the project focuses on building an Express-based API server with routes, database integration, user and item management, and error handling.

## Features

- RESTful API with full CRUD support for users and clothing items
- MongoDB with Mongoose for data modeling
- Custom middleware for temporary user authorization
- Error handling for bad requests, invalid IDs, and server issues
- Like/unlike feature for clothing items
- Input validation using `validator` package
- Project structure follows MVC pattern

## Technologies Used

- **Node.js**
- **Express**
- **MongoDB & Mongoose**
- **ESLint (Airbnb config)**
- **Prettier**
- **Validator**
- **Nodemon**
- **Postman** for manual testing
- **GitHub Actions** for CI/CD test automation

## Running the Project

Install dependencies:

```bash
npm install
```
