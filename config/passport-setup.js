const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const keys=require('./config');
const User=require('../models/user-model');

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
    
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken,refreshToken,profile,done) => {
        console.log('Username je ' + profile.displayName)
        // passport callback function
        console.log(profile);
        User.findOne({googleId:profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log(`already exists`)
                done(null,currentUser);
            }else{
                new User({
                    googleId: profile.id,
                    username: profile.displayName
                }).save().then((newUser)=>{
                    done(null,newUser);
                    console.log(`new user created ${newUser}`)
                })

            }
        })

   
    })
);