const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

pool.getConnection((err, connection) => {
  if(err) throw err
  console.log('connected as ID '+ connection.threadId)

});

exports.search = (req, res) => {
  const searchQuery = req.query.search_query;

  const query = `SELECT FirstName FROM influencer_signup WHERE FirstName LIKE '%${searchQuery}%' OR AreaOfInterest LIKE '%${searchQuery}%'`;

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }

    res.render('search_Influencer', { results });
  });
}





















// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// })

// pool.getConnection((err, connection) => {
//   if(err) throw err
//   console.log('connected as ID '+ connection.threadId)

// });

// exports.search = (req, res) => {

// //pool.connect();
// var search_query = req.query.search_query;

// const query = `SELECT FirstName FROM influencer_signup WHERE FirstName LIKE '%${search_query}%' LIMIT 10`;
// pool.query(query, (error, results, fields) => {
//   if (error) {
//     throw error;
//   }
//   res.render('search_Influencer', { results });
// });
// //pool.end();
// }

