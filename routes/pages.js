const express = require('express')
const authController = require('../controller/auth');
const influencer_controller = require('../controller/influencer_controller');
const business_controller = require('../controller/business_controller');
//const search_influencer = require('../controller/search_iController');
const feedback_influencer = require('../controller/i_feedback_controller');
const feedback_business = require('../controller/b_feedback_controller');


const router = express.Router(); 

// router.get('/',(req, res) => {
//     res.render('index')
// })
router.get('/', authController.isLoggedIn, (req, res) => {
    console.log("inside");
    console.log(req.user);
    res.render('index', {
      user: req.user
    });
  });

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



router.get('/profile', (req, res) => {
  res.render('profile');
});
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




module.exports = router;