require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const recipeSchema = new mongoose.Schema({
  name: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  image: String,
  ingredients: [String],
  steps: [String],
  reviews: [{
    user: String,
    rating: { type: Number, min: 1, max: 5 },
    comment: String
  }]
});

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  email: { type: String, unique: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
const Author = mongoose.model('Author', authorSchema);

app.get('/', (req, res) => {
  res.send('Welcome to the Chomp API! The frontend(probably the best place to test the API from) is at https://ayaangrover.is-a.dev/chomp/frontend, and the full code is at https://github.com/ayaangrover/chomp/.');
});

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'name');
    res.json(recipes);
  } catch (error) {
    res.status(500).send('Error fetching recipes');
  }
});

app.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'name');
    if (!recipe) return res.status(404).send('Recipe not found');
    res.json(recipe);
  } catch (error) {
    res.status(500).send('Error fetching recipe');
  }
});

app.post('/recipes', async (req, res) => {
  try {
    let author = await Author.findOne({ name: req.body.author });
    if (!author) {
      author = new Author({ name: req.body.author });
      await author.save();
    }
    const newRecipe = new Recipe({
      ...req.body,
      author: author._id
    });
    await newRecipe.save();
    res.status(201).send('Recipe added successfully');
  } catch (error) {
    res.status(500).send('Error adding recipe');
  }
});

app.put('/recipes/:id', async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) return res.status(404).send('Recipe not found');
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).send('Error updating recipe');
  }
});

app.delete('/recipes/:id', async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).send('Recipe not found');
    res.send('Recipe deleted');
  } catch (error) {
    res.status(500).send('Error deleting recipe');
  }
});

app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).send('Error fetching authors');
  }
});

app.get('/authors/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).send('Author not found');
    res.json(author);
  } catch (error) {
    res.status(500).send('Error fetching author');
  }
});

app.post('/authors', async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.status(201).send('Author added successfully');
  } catch (error) {
    res.status(500).send('Error adding author');
  }
});

app.put('/authors/:id', async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAuthor) return res.status(404).send('Author not found');
    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).send('Error updating author');
  }
});

app.delete('/authors/:id', async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).send('Author not found');
    res.send('Author deleted');
  } catch (error) {
    res.status(500).send('Error deleting author');
  }
});

app.get('/recipes/:id/reviews', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');
    res.json(recipe.reviews);
  } catch (error) {
    res.status(500).send('Error fetching reviews');
  }
});

app.post('/recipes/:id/reviews', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');

    const newReview = req.body;
    recipe.reviews.push(newReview);
    await recipe.save();
    res.status(201).send('Review added');
  } catch (error) {
    res.status(500).send('Error adding review');
  }
});

app.put('/reviews/:recipeId/:reviewId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).send('Recipe not found');

    const review = recipe.reviews.id(req.params.reviewId);
    if (!review) return res.status(404).send('Review not found');

    review.set(req.body);
    await recipe.save();
    res.json(review);
  } catch (error) {
    res.status(500).send('Error updating review');
  }
});

app.delete('/reviews/:recipeId/:reviewId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).send('Recipe not found');

    const review = recipe.reviews.id(req.params.reviewId);
    if (!review) return res.status(404).send('Review not found');

    review.remove();
    await recipe.save();
    res.send('Review deleted');
  } catch (error) {
    res.status(500).send('Error deleting review');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
