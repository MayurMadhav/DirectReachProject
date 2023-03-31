const mysql = require('mysql2')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { use } = require('../routes/pages');
const { promisify } = require('util');

require("dotenv").config();


const db = mysql.createConnection({
    host: '127.0.0.1',
    user:  'root',
    password:  'mysql',
    database: 'directreach'
}); 

//-------------------------------------------------------

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
if (!email || !password) {
    return res.status(400).render("login", {
      message: 'Please provide email and password'
    });
}

  // 2) Check if user exists && password is correct
  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    console.log("This is query is working")
    console.log(results);
    console.log(password);
    const isMatch = await bcrypt.compare(password, results[0].password);
    console.log(isMatch);
    if(!results || !isMatch ) {
      return res.status(401).render("login", {
        message: 'Incorrect email or password'
      });
    } else {
      // 3) If everything ok, send token to client
      const id = results[0].user_id;
      console.log(id);
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });
      console.log("is PROBLEM HERE???")

      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
      };
      console.log("OR HERE??")
      res.cookie('jwt', token, cookieOptions);

      res.status(200).redirect("/");
    }
  });
};
//-------------------------------------------------------



exports.signup = (req, res) => {
    console.log(req.body);

    // const name = req.body.name;
    // const email = req.body.email;
    // const user_type = req.body.user_type;
    // const password  = req.body.password;
    // const passwordConfirm = req.body.passwordConfirm;

    const { name, email, user_type,  password, passwordConfirm} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
         if(error) {
            console.log(error);
         }
         if(result.length > 0 ){
            return res.render('signup', {
                message: 'That email already exists!'
            })
         } else if(password !== passwordConfirm) {
            return res.render('signup', {
                message: 'Passwords do not match!'
         });
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        
        db.query('INSERT INTO users SET ?', { name: name, email: email, user_type: user_type, password: hashedPassword}, (error, results) => {
            if(error){
                console.log(error)
            }
            else {
                // db.query('SELECT user_id FROM users WHERE email = ?', [email], (error, result) => {
                //      const id = result[0].user_id;
                //     console.log(id);
                //     const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                //       expiresIn: process.env.JWT_EXPIRES_IN
                //     });
          
                //     const cookieOptions = {
                //       expires: new Date(
                //         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
                //       ),
                //       httpOnly: true
                //     };
                //     res.cookie('jwt', token, cookieOptions);
          
                //     res.status(201).redirect("/");
                //   });

                //---------------//

                console.log(results);
                return res.render('signup', {
                    message: 'User registered!'
                }) 
            }
        });
    });
    // res.send("Form Submitted")
};

//only for rendered pages

exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
  
        console.log("decoded");
        console.log(decoded);
  
        // 2) Check if user still exists
        db.start.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
          console.log(result)
          if(!result) {
            return next();
          }
          // THERE IS A LOGGED IN USER
          req.user = result[0];
          // res.locals.user = result[0];
          console.log("next")
          return next();
        });
      } catch (err) {
        return next();
      }
    } else {
      next();
    }
  };
  
  exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).redirect("/");
  };

//   exports.login = async (req, res, next) =>{
//     const {email, password} = req.body;
// }

