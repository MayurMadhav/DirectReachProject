const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');

const app = express();

// Set up MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'mysql',
    database: 'directreach'
  });

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');

// Route to homepage
app.get('/', (req, res) => {
  // Fetch count of influencers from the influencer_count table
  db.query('SELECT count FROM influencer_count', (err, result) => {
    if (err) throw err;
    const count = result[0].count; // Extract the count from the result
    // Render the homepage view and pass the count as a variable
    res.render('index', { count });
  });
});

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});