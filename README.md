# Chomp Recipe Manager API

## Overview

The Chomp Recipe Manager API is an API built with Node.js and MongoDB that facilitates the management of recipes, authors, and associated reviews. In addition, a sample web interface is provided to interact with the API. The service enables full CRUD operations.


## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Install Dependencies:**
   ```bash
   cd <repository-directory>
   npm install
   ```
3. **Environment Configuration:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```
   Adjust the `PORT` value as needed.

## Running the Server

Start the API server with the following command:
```bash
node <entry-file>.js
```
Replace `<entry-file>.js` with the name of the main server file (e.g., `app.js` or `server.js`). The server will run on the port specified in your `.env` file or default to port 3000.

## API Endpoints

### Recipes

- **GET `/recipes`**  
  Retrieves all recipes. Each recipe includes populated author details (name).

- **GET `/recipes/:id`**  
  Retrieves a single recipe by its unique identifier.

- **POST `/recipes`**  
  Creates a new recipe. If the specified author does not exist, a new author record is created.  
  **Request Body:**  
  ```json
  {
    "name": "Recipe Name",
    "author": "Author Name or ID",
    "image": "Image URL",
    "ingredients": ["Ingredient 1", "Ingredient 2"],
    "steps": ["Step 1", "Step 2"]
  }
  ```

- **PUT `/recipes/:id`**  
  Updates an existing recipe identified by its ID.  
  **Request Body:**  
  ```json
  {
    "name": "Updated Recipe Name",
    "ingredients": ["Updated Ingredient 1", "Updated Ingredient 2"],
    "steps": ["Updated Step 1", "Updated Step 2"]
  }
  ```

- **DELETE `/recipes/:id`**  
  Deletes a recipe identified by its unique ID.

- **GET `/recipes/:id/reviews`**  
  Retrieves all reviews for the specified recipe.

- **POST `/recipes/:id/reviews`**  
  Adds a new review to the specified recipe.  
  **Request Body:**  
  ```json
  {
    "user": "Reviewer Name",
    "rating": 4,
    "comment": "Review comment."
  }
  ```

### Reviews

- **PUT `/reviews/:recipeId/:reviewId`**  
  Updates an existing review for a given recipe.  
  **Request Body:**  
  ```json
  {
    "user": "Updated Reviewer Name",
    "rating": 5,
    "comment": "Updated review comment."
  }
  ```

- **DELETE `/reviews/:recipeId/:reviewId`**  
  Deletes a specific review identified by its ID from a given recipe.

### Authors

- **GET `/authors`**  
  Retrieves all authors.

- **GET `/authors/:id`**  
  Retrieves a single author by its unique identifier.

- **POST `/authors`**  
  Creates a new author.  
  **Request Body:**  
  ```json
  {
    "name": "Author Name",
    "bio": "Short biography",
    "email": "author@example.com"
  }
  ```

- **PUT `/authors/:id`**  
  Updates an existing author by its ID.  
  **Request Body:**  
  ```json
  {
    "name": "Updated Author Name",
    "bio": "Updated biography",
    "email": "updated@example.com"
  }
  ```

- **DELETE `/authors/:id`**  
  Deletes an author by its unique identifier. Note that this operation will also remove all recipes associated with the author.


## AI Usage

The readme was AI generated and human edited. The styling was made with AI to save time(high seas ends in a few hours!)
