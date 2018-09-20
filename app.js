const express = require ('express');
const authRoutes = require ('./routes/auth-routes');
const profileRoutes = require ('./routes/profile-route');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/config');
const cookieSession = require('cookie-session');
const passport=require('passport');
const app = express();


//setup view engine
app.set('view engine','ejs')

app.use(cookieSession({
    maxAge:60*60*24*1000,
    keys:[keys.session.cookieKey]
}))

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log('Connected to mongodb')
    
})

//setup routes
app.use('/auth' , authRoutes);
app.use('/profile' , profileRoutes);

//create home route
app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(3000,()=>{
    console.log('app connected to port 3000')
})