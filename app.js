const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const axios         = require('axios');
const mongoose      = require('mongoose');
const flash         = require('connect-flash');
const passport      = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride= require('method-override');
const Campground    = require('./models/campground');
const Comment       = require('./models/comment');
const User          = require('./models/user');
const seedDB        = require('./seeds');

//REQUIRING ROUTES
const commentRoutes     = require('./routes/comments');
const campgroundRoutes  = require('./routes/campgrounds');
const indexRoutes       = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/yelp_camp_v12');
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();


//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Jackie is a tiny terrorist',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

//refactor further buy adding /routes, then go into js files and just do /
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);



app.listen(3000, function(req,res){
    console.log('server is listening, muhaha!');
});