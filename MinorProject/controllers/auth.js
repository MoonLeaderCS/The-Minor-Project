const mysql = require('mysql');
const express=require('express');
const app=express();
const path=require('path');
// var popups=require('popups');



const pd=path.join(__dirname,'./public');
app.use(express.static(pd));

const db=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.DATABASE
});

db.connect((error)=>{
    if(error) console.log(error);
    else
    console.log('connection sucessfull');
})

exports.register=(req,res)=>{

    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const password=req.body.password;
    const mobile=req.body.mobile;
    const address=req.body.address;

    // db.query('select email from login where email=?',[email],(error,results)=>{
    //     if(error)
    //     console.log(error);
    //     if(results>0)
    //     return res.render('login',{
    //         message:'Email already used,try to Login '
    //     })
    // })

    db.query("INSERT INTO `login` (`FirstName`, `LastName`, `email`, `password`, `mobile`, `address`) VALUES (?,?,?,?,?,?);",[fname,lname,email,password,mobile,address],function(error,results,fields){
        if(error)throw error
        else{
            // res.redirect("/login");
            return res.render('login',{
                message:'You are successfully registered'
            })

        }
        res.end();
    })
}

exports.login=(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    db.query("select * from login where email=? and password=?",[email,password],function(error,results,fields){
                if(results.length>0){
                    res.redirect("/");

                }
                if(results.length<=0){
                   return res.render("login");
                //    pop.alert({ content:"wrong"});
                   window.alert("hi");
                }
                if(error)
                console.log(error);
                res.end();
            })

}