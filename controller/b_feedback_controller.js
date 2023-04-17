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

exports.feedback = (req, res) => {
    pool.query('SELECT influencer_id, firstname FROM influencer_signup', (error, results) => {
      if (error) throw error;
      pool.query('SELECT business_id, businessname FROM business_signup', (error, bnames) => {
        if (error) throw error;
        res.render('busi_feedback', { results, bnames });
      });
    });
  };
  
  exports.submitFeedback = (req, res) => {
    const { business, influencerName, message } = req.body;

    // get the business name and influencer's first name from the respective tables
    pool.query(
      'SELECT businessname FROM business_signup WHERE business_id = ?',
      [business],
      (error, results) => {
        if (error) throw error;

        const businessName = results[0].businessname;

            // insert the feedback into the database
            pool.query(
              'INSERT INTO business_feedback (business_id, businessName, influencerName, feedback) VALUES (?, ?, ?, ?)',
              [business, businessName, influencerName, message],
              (error, results) => {
                if (error) throw error;
                res.render('busi_feedback', { message: 'Thanks for your feedback!' });
                res.status(200).redirect("/profile");
              }
            );
          }
        );
      }


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
  //             'INSERT INTO bfeedback (business_id, business_name, influencer_id, influencer_name, feedback) VALUES (?, ?, ?, ?, ?)',
  //             [business, businessName, influencer, influencerName, message],
  //             (error, results) => {
  //               if (error) throw error;
  //               res.render('busi_feedback', { message: 'Thanks for your feedback!' });
  //             }
  //           );
  //         }
  //       );
  //     }
  //   );
  // };

