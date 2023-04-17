const express = require('express')
const authController = require('../controller/auth');
const influencer_controller = require('../controller/influencer_controller');
const business_controller = require('../controller/business_controller');
//const search_influencer = require('../controller/search_iController');
const feedback_influencer = require('../controller/i_feedback_controller');
const feedback_business = require('../controller/b_feedback_controller');

const i_profileUpdate = require('../controller/update_profile')
const b_profileUpdate = require('../controller/update_profile')


const session = require('express-session');
const mysql = require('mysql2')

const router = express.Router(); 

router.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: true
}));

const db = {
  host: '127.0.0.1',
  user:  'root',
  password:  'mysql',
  database: 'directreach'
};

router.get('/', authController.isLoggedIn, (req, res) => {
  const connection = mysql.createConnection(db);
  connection.query('SELECT COUNT(*) AS count FROM influencer_signup', (error, results) => {
    if (error) {
      console.error(error);
      connection.destroy();
      return res.render('error', { message: 'Failed to retrieve influencers count.' });
    }
    const count = results[0].count;

    connection.query('SELECT COUNT(*) AS count FROM business_signup', (error, results) => {
      if (error) {
        console.error(error);
        connection.destroy();
        return res.render('error', { message: 'Failed to retrieve influencers count.' });
      }
      const countb = results[0].count;
    
    // connection.destroy();
    res.render('index', { user: req.user, count, countb });
  });
  });
});




// router.get('/', authController.isLoggedIn, (req, res) => {
//     console.log(req.user);
//     res.render('index', {
//       user: req.user
//     });
//   });





// router.get('/iupdate',(req, res) => {
  //   res.render("profile")
  // })

// router.get('/profile', authController.isLoggedIn, (req, res) => {
//   console.log("inside");
//   console.log(req.user);
//   if(req.user) {
//     res.render('profile', {
//       user: req.user
//     });
//   } else {
//     res.redirect("/login");
//   }
  
// });


// router.get('/profile', (req, res) => {
//   res.render('profile', );
// });

/*
correct
router.get('/profile', (req, res) => {
  const email = req.session.email;
  // retrieve user details from the database using the email
  // render the user details page
  res.render('profile',{email});
});
*/
const requireLogin = (req, res, next) => {
  if (!req.session.email) {
    return res.redirect('/login');
  }
  next();
};

router.get('/profile', (req, res) => {
  const email = req.session.email;
  
  const connection = mysql.createConnection(db);
  connection.query(
    'SELECT * FROM influencer_signup WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        console.log(error);
        connection.destroy();
        return res.status(500).send('Server error');
      }

      const user = results[0];
      console.log(user)
      connection.destroy();
      res.render('profile', { email,user });
    }
  );
});


router.get('/bprofile', (req, res) => {
  const c_email = req.session.c_email;
  
  const connection = mysql.createConnection(db);

  connection.query(
    'SELECT * FROM business_signup WHERE c_email = ?',
    [c_email],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Server error');
      }

      const user = results[0];
      console.log(user)
      res.render('bprofile', { c_email,user });
    }
  );
});








// router.get('/profile', (req, res) => {
//   const email = req.session.email;
  

//   db.query(
//     'SELECT * FROM influencer_signup WHERE email = ?',
//     [email],
//     (error, results) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).send('Server error');
//       }

//       const user = results[0];
//       console.log(user)
//       res.render('profile', { email,user });
//     }
//   );
// });





// router.get('/profile', (req, res) => {
//   const FirstName = req.session.FirstName;
//   // retrieve user details from the database using the email
//   // render the user details page
//   res.render('profile',{FirstName});
// });





// router.get('/profile', (req, res) => {
//   const firstname = req.session.username;
//   if (!firstname) {
//     return res.status(400).send("Username not found");
//   }
//   res.render('profile', { firstname });
// });


router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
router.get('/tables', (req, res) => {
  res.render('listI');
});


router.get('/login', (req, res) => {
    res.render('login');
  });

  router.get('/loginBusiness',(req, res) => {
    res.render('loginBusiness')
  })

router.get('/influencer',(req, res) => {
    res.render('influencer')
})

router.get('/business',(req, res) => {
  res.render('business')
})

// router.get('/signup',(req, res) => {
//     res.render('signup')
// })
router.get('/home',(req, res) => {
  res.render('index')
})
// router.get('/listI', influencer_controller.view, (req, res) => {
//   res.render('list_influencers')
// })
router.get('/listI', influencer_controller.view, (req, res) => {
  res.render('list_influencers')
})
router.get('/listB', business_controller.view, (req, res) => {
  res.render('list_businesses')
})

router.get('/homeTest',(req, res) => {
  res.render('home_index')
})
router.get('/about',(req, res) => {
  res.render('about')
})
router.get('/homeContact',(req, res) => {
  res.render('home_contact')
})
router.get('/services',(req, res) => {
  res.render('services')
})
router.get('/contact',(req, res) => {
  res.render('contact')
})
// router.get('/search' ,search_influencer.search, (req, res) => {
//   res.render('search_Influencer');
// });

router.get('/homeFinal', (req, res) => {
  res.render('A_home');
});

router.get('/i_b', (req, res) => {
  res.render('index3');
});

router.get('/iFeedback', feedback_influencer.feedback,  (req, res) => {
  res.render('influ_feedback');
});


router.post('/i_feedback_controller/submitFeedback',feedback_influencer.submitFeedback)

router.get('/logout', authController.logout);


router.get('/bFeedback', feedback_business.feedback,  (req, res) => {
  res.render('busi_feedback');
});

router.post('/b_feedback_controller/submitFeedback',feedback_business.submitFeedback)

router.post('/update_profile/iupdate', i_profileUpdate.iupdate)

router.post('/update_profile/bupdate', b_profileUpdate.bupdate)







module.exports = router;