// const mysql = require('mysql2')
// const express = require('express')
// const app = express();
// const flash = require('connect-flash');

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// })

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static('public'));

// app.use(flash());

// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   next();
// });

// app.post('/update_profile/iupdate', (req, res) => {
//   console.log(req.body);

//   const { FirstName, LastName, AreaOfInterest, email, medialink, gender, phoneNumber, languages, locality, state } = req.body;

//   pool.query('UPDATE influencer_signup SET FirstName = ?, LastName = ?, AreaOfInterest = ?, medialink = ?, phoneNumber = ?, languages = ?, locality = ?, state = ?, gender = ? WHERE email = ?', [FirstName, LastName, AreaOfInterest, medialink, phoneNumber, languages, locality, state, gender, email], (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//     } else {
//       req.flash('success_msg', 'Profile updated successfully.');
//       res.status(200).redirect('/profile');
//     }
//   });
// });

// module.exports = app;



















const mysql = require('mysql2')
const express = require('express')
// const app = express();
// const flash = require('connect-flash');

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

// app.use(flash());


// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   next();
// });


// exports.iupdate = (req, res) => {
//   console.log(req.body);

//   const { FirstName, LastName, AreaOfInterest, email, medialink, gender, phoneNumber, languages, locality, state } = req.body;

//   pool.query('UPDATE influencer_signup SET FirstName = ?, LastName = ?, AreaOfInterest = ?, medialink = ?, phoneNumber = ?, languages = ?, locality = ?, state = ?, gender = ? WHERE email = ?', [FirstName, LastName, AreaOfInterest, medialink, phoneNumber, languages, locality, state, gender, email], (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//     } else {
//       req.flash('success_msg', 'Profile updated successfully.');
//       res.status(200).redirect('/profile');
//     }
//   });
// };













exports.iupdate = (req, res) => {
  console.log(req.body);

  const { FirstName, LastName, AreaOfInterest, email, medialink, gender, phoneNumber, languages, locality, state } = req.body;

  pool.query('UPDATE influencer_signup SET FirstName = ?, LastName = ?, AreaOfInterest = ?, medialink = ?, phoneNumber = ?, languages = ?, locality = ?, state = ?, gender = ? WHERE email = ?', [FirstName, LastName, AreaOfInterest, medialink, phoneNumber, languages, locality, state, gender, email], (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.status(200).redirect("/profile");
    }
  });
};



exports.bupdate = (req, res) => {
  console.log(req.body);

  const { ownername, businessName, c_email, durationBusiness, categoryBusiness, phoneNumber, origin, state } = req.body;

  pool.query('UPDATE business_signup SET ownername = ?, businessName = ?, durationBusiness = ?, categoryBusiness = ?, phoneNumber = ?, origin = ?, state = ? WHERE c_email = ?', [ownername, businessName, durationBusiness, categoryBusiness, phoneNumber, origin, state, c_email], (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.status(200).redirect("/bprofile");
    }
  });
};



































// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2');
// const app = express();

// // Use body parsing middleware
// app.use(bodyParser.urlencoded({ extended: true }));

// // Route for updating the user's profile
// app.post('/profile-update', (req, res) => {
//   const { firstName, lastName, areaOfInterest, email, socialMediaExpertise, locality, state, gender, languages, phoneNumber } = req.body;

//   // Update user's profile in the database
//   const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'mysql',
//     database: 'directreach'
//   });

//   connection.connect();

//   const sql = `UPDATE users SET FirstName = ?, LastName = ?, AreaOfInterest = ?, email = ?, medialink = ?, locality = ?, state = ?, gender = ?, languages = ?, phoneNumber = ? WHERE email = ?`;
//   const values = [firstName, lastName, areaOfInterest, email, socialMediaExpertise, locality, state, gender, languages, phoneNumber, email];

//   connection.query(sql, values, (error, results) => {
//     if (error) {
//       console.error(error);
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(200);
//     }
//   });

//   // connection.end();
// });

// app.listen(8080);
