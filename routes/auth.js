const mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config({ path: './.env'})


//----------------------------------------------//

const express = require('express')
const authController = require('../controller/auth');



// const influencer_controller = require('../controller/influencer_controller')

const router = express.Router();

router.post('/login', authController.login);
router.post('/loginBusiness', authController.loginBusiness);
// router.post('/signup', authController.signup)
router.post('/influencer', authController.influencer)

// router.post('/influencer', function(req, res){
//     authController.influencer
//   });

router.post('/business', authController.business)


    
  

//-----------------------------------------------------

// router.get('/list',influencer_controller.view);


module.exports = router;