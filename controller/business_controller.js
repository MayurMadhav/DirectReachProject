const mysql = require('mysql2')
// const dotenv = require('dotenv')
// dotenv.config({ path: './.env'})

const pool = mysql.createPool({
    // connectionLimit: 100,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})


exports.view = (req, res) => {
//   res.render('list_businesses',{rows})
// }
    
    pool.getConnection((err, connection) => {
            if(err) throw err
            console.log('connected as ID '+ connection.threadId)
        
            connection.query('select * from business_signup', (err, rows) => {
        
                // connection.release();
        
                if(!err){
                    res.render('list_businesses',{rows})
                }else{
                    console.log(err)
                }
                
                console.log('the data from businesses table is \n',rows)
        
        
            });
        })
}