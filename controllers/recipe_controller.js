const pool = require('../connect/db');

const getAllRecipes = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM recipe');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addRecipe = async (req, res) => {
  const { name, ingredients, directions } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO recipe (name, ingredients, directions) VALUES ($1, $2, $3) RETURNING *',
      [name, ingredients, directions]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const updateRecipe = async (req, res) => {
//   const { name, ingredients, directions } = req.body;
//   try {
//       if (name) {
//         const result = await pool.query(
//           'UPDATE recipe * SET name = $1 RETURNING *'
//         )
//       }
//       if (ingredients) {
//         const result = await pool.query(
//           'UPDATE ingredients * FROM recipe RETURNING *'
//         )
//       }
//       if (directions) {
//         const result = await pool.query(
//           'UPDATE directions * FROM recipe RETURNING *'
//         )
//       }
//       res.json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({error: 'Internal Server Errorr'})
//   }
// }

const updateRecipe = async (req, res) => {
  const { name } = req.params;
  const { ingredients, directions } = req.body;
  try {
    const result = await pool.query(
      'UPDATE recipe SET ingredients = $1, directions = $2 WHERE name = $3 RETURNING *',
      [ingredients, directions, name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRecipe = async (req, res) => {
  const { name } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM recipe WHERE name = $1',
      [name]
    );
    if (result.rowCount > 0) {
      res.json({ message: `Row with name ${name} deleted successfully` });
    } else {
      res.status(404).json({ error: `Row with name ${name} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingleRecipe = async (req, res) => {
  const {name} = req.params;
  try {
    const result = await pool.query(
      'SELECT FROM recipe WHERE name = $1',
      [name]
    );
    if (result.rowCount > 0) {
      res.json({ message: `Recipe with name ${name} deleted successfully` });
    } else {
      res.status(404).json({ error: `Recipe with name ${name} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getSingleRecipe
};
