require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipe_routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Use recipe routes
app.use(recipeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
