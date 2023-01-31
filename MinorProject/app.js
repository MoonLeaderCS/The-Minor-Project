const express=require('express');
const path=require('path');
// const mysql = require('mysql');
const dotenv = require('dotenv');
const { publicDecrypt } = require('crypto');


dotenv.config({path:'./.env'});

const app=express();

// const db=mysql.createConnection({
//     host:process.env.host,
//     user:process.env.user,
//     password:process.env.password,
//     database:process.env.DATABASE
// });

const pd=path.join(__dirname,'./public');
app.use(express.static(pd));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set('view engine','hbs');


// db.connect((error)=>{
//     if(error) console.log(error);
//     else
//     console.log('connection sucessfull');
// })

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(5000);

