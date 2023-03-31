const express = require("express")
const path = require('path')
// const mysql = require("mysql");
const mysql = require('mysql2');
const cookieParser = require("cookie-parser");
// const bodyParser = require('body-parser')

// import express from 'express'
// import mysql from 'mysql2'
// import dotenv from 'dotenv'
// const dotenv = require('dotenv')

// dotenv.config({ path: './.env'})

const app = express();

// const db = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user:  process.env.MYSQL_USER,
//     password:  process.env.MYSQ_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// }); 
const db = mysql.createConnection({
    host: '127.0.0.1',
    user:  'root',
    password:  'mysql',
    database: 'directreach'
}); 

const publicDirectory  = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

app.use(express.urlencoded({ extended: false}));

app.use(express.json());
app.use(cookieParser());

// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());



app.set('view engine', 'hbs');
//app.set('view engine','ejs');



db.connect( (error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL connected")
    }
})





//define routers
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
 
app.listen(8080, () => {
    console.log("The server running on 8080");
})