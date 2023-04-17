const mysql = require('mysql2')
const session = require('express-session');
const express = require('express')
const app = express();

app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: true
}));


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

exports.feedback = (req, res) => {
    pool.query('SELECT influencer_id, firstname FROM influencer_signup', (error, results) => {
      if (error) throw error;
      pool.query('SELECT business_id, businessname FROM business_signup', (error, bnames) => {
        if (error) throw error;
        res.render('influ_feedback', { results, bnames });
      });
    });
  };
  
  exports.submitFeedback = (req, res) => {
    const { businessName, influencer, message } = req.body;
        pool.query(
          'SELECT firstname FROM influencer_signup WHERE influencer_id = ?',
          [influencer],
          (error, results) => {
            if (error) throw error;

            const influencerName = results[0].firstname;

            // insert the feedback into the database
            pool.query(
              'INSERT INTO influencer_feedback (businessName, influencer_id, influencer_name, feedback) VALUES ( ?, ?, ?, ?)',
              [businessName, influencer, influencerName, message],
              (error, results) => {
                if (error) throw error;
                res.render('influ_feedback', { message: 'Thanks for your feedback!' });
                res.status(200).redirect("/profile");
              }
            );
          }
        );
      }



  // exports.submitFeedback = (req, res) => {
  //   const { business, influencer, message } = req.body;

  //   // get the business name and influencer's first name from the respective tables
  //   // pool.query(
  //   //   'SELECT businessname FROM business_signup WHERE business_id = ?',
  //   //   [business],
  //   //   (error, results) => {
  //   //     if (error) throw error;

  //   //     const businessName = results[0].businessname;

  //       pool.query(
  //         'SELECT firstname FROM influencer_signup WHERE influencer_id = ?',
  //         [influencer],
  //         (error, results) => {
  //           if (error) throw error;

  //           const influencerName = results[0].firstname;

  //           // insert the feedback into the database
  //           pool.query(
  //             'INSERT INTO ifeedback (business_id, businessName, influencer_id, influencer_name, feedback) VALUES (?, ?, ?, ?, ?)',
  //             [business, businessName, influencer, influencerName, message],
  //             (error, results) => {
  //               if (error) throw error;
  //               res.render('influ_feedback', { message: 'Thanks for your feedback!' });
  //             }
  //           );
  //         }
  //       );
  //     }
  // //   );
  // // };


































  // exports.submitFeedback = (req, res) => {
  //   const { business, influencer, message } = req.body;

  //   // get the business name and influencer's first name from the respective tables
  //   pool.query(
  //     'SELECT businessname FROM business_signup WHERE business_id = ?',
  //     [business],
  //     (error, results) => {
  //       if (error) throw error;

  //       const businessName = results[0].businessname;

  //       pool.query(
  //         'SELECT firstname FROM influencer_signup WHERE influencer_id = ?',
  //         [influencer],
  //         (error, results) => {
  //           if (error) throw error;

  //           const influencerName = results[0].firstname;

  //           // insert the feedback into the database
  //           pool.query(
  //             'INSERT INTO ifeedback (business_id, businessName, influencer_id, influencer_name, feedback) VALUES (?, ?, ?, ?, ?)',
  //             [business, businessName, influencer, influencerName, message],
  //             (error, results) => {
  //               if (error) throw error;
  //               res.redirect('/');
  //             }
  //           );
  //         }
  //       );
  //     }
  //   );
  // };


















  // exports.submitFeedback = (req, res) => {
  //   const { business, influencer, message } = req.body;
  
  //   pool.query(
  //     'INSERT INTO feedback (business, influencer, message) VALUES (?, ?, ?)',
  //     [business, influencer, message],
  //     (error, results) => {
  //       if (error) throw error;
  //       res.redirect('/');
  //     }
  //   );
  // };
  



















// exports.feedback = (req, res) => {
//     pool.query('SELECT influencer_id, firstname FROM influencer_signup', (error, results) => {
//         if (error) throw error;
//         // const influencers = results;
//         res.render('influ_feedback', { results }); 
//     });
// }
  
//   exports.feedback = (req, res) => {
//       pool.query('SELECT business_id, businessname FROM business_signup', (error, bnames) => {
//           if (error) throw error;
//           // const influencers = results;
//           res.render('influ_feedback', { bnames });
//       });
//   }







// exports.feedbackDB = (req, res) => {
//     console.log(req.body);

//     // const name = req.body.name;
//     // const email = req.body.email;
//     // const user_type = req.body.user_type;
//     // const password  = req.body.password;
//     // const passwordConfirm = req.body.passwordConfirm;

//     const { firstname, lastname} = req.body;

//     db.query('SELECT email FROM influencer_signup WHERE email = ?', [email], async (error, result) => {
//          if(error) {
//             console.log(error);
//          }
//          if(result.length > 0 ){
//             return res.render('signup', {
//                 message: 'That email already exists!'
//             })
//          } else if(password !== passwordConfirm) {
//             return res.render('signup', {
//                 message: 'Passwords do not match!'
//          });
//         }

//         let hashedPassword = await bcrypt.hash(password, 10);
//         console.log(hashedPassword);
        
//         db.query('INSERT INTO influencer_signup SET ?', { FirstName: firstname, LastName: lastname,  AreaOfInterest: category ,email: email, medialink: medialink, password: hashedPassword, phoneNumber: phone, languages: languages, locality: locality, state: state, gender: gender}, (error, results) => {
//             if(error){
//                 console.log(error)
//             }
//             else {
//                 db.query('SELECT influencer_id FROM influencer_signup WHERE email = ?', [email], (error, result) => {
//                      const id = result[0].influencer_id;
//                     console.log(id);
//                     const token = jwt.sign({ id }, process.env.JWT_SECRET, {
//                       expiresIn: process.env.JWT_EXPIRES_IN
//                     });
          
//                     const cookieOptions = {
//                       expires: new Date(
//                         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//                       ),
//                       httpOnly: true
//                     };
//                     res.cookie('jwt', token, cookieOptions);
          
//                     res.status(201).redirect("/");
//                   });

//                 // ---------------//

//                 // console.log(results);
//                 // return res.render('login', {
//                 //     message: 'User registered!'
//                 // }) 
//             }
//         });
//     });
// }


// const mysql = require('mysql2')

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE
// })

// pool.getConnection((err, connection) => {
//   if (err) throw err
//   console.log('connected as ID ' + connection.threadId)
// })

// exports.feedback = (req, res) => {
//   pool.query('SELECT * FROM influencer_signup', (err, result) => {
//     if (err) throw err
//     const influencers = result.map(influencer => ({
//       id: influencer.id,
//       name: influencer.name
//     }))
//     res.render('influ_feedback', { influencers })
//   })
// }
