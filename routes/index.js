const express   = require('express');
const router    = express.Router();
const passport  = require('passport');
const User      = require('../models/user');


//ROUTE ROUTE
router.get('/', function(req, res){
    res.render('landing');
    console.log('Home Page')
})

//REGISTER ROUTE
router.get('/register', (req, res) => {
    res.render('register');
})

//SIGN UP LOGIC
router.post('/register', (req, res) =>{
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash('error', err.message)//err takes care of it for you, if err exists like pw is blank, or user already exists, just put err
            return res.redirect('register');
        } 
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to YelpCamp ' + user.username);
            res.redirect('/campgrounds');
        });
    });
});

//LOGIN FORM ROUTE
router.get('/login', (req, res) =>{
    res.render('login'); //using key mssage to our route, req.flash('error') is grabbing our message 'Please Login First!'
});


//LOGIN LOGIC 
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login',
        failureFlash: true
}), (req, res) =>{
});

//LOGOUT ROUTE
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged you out!')
    res.redirect('/campgrounds');
});

//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}

module.exports = router;