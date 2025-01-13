const express = require('express');
const connection = require('./config/database');
const app = express();
const port = 3000;

// middleware to parse JSON req
app.use(express.json());

// root endpoint
app.get('/', (req, res) => {
    // Fetch data from the database
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data from database');
        return;
      }
      // Send the data as a JSON response
      res.json(results);
    });
  });

// start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

