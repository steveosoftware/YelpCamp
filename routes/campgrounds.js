const express       = require('express');
const router        = express.Router();
const Campground    = require('../models/campground');
const Comment       = require('../models/comment');
const middleware    = require('../middleware'); //need to require ../middleware/index.js but if named index then just route to directory and it will auto find index.js - special name



//INDEX ROUTE
router.get('/', function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE ROUTE
router.post('/', middleware.isLoggedIn, function(req, res){
        let name = req.body.name;
        let image = req.body.image;
        let description = req.body.description;
        let price = req.body.price;
        //link up user id w campground, create variable then pass in to newCampground
        let author = {
            id: req.user._id,
            username: req.user.username
        };
        let newCampground = {name: name, image: image, description: description, author: author, price: price};
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                console.log(newlyCreated)
                res.redirect('/campgrounds');
            }
        });
});

//NEW ROUTE
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new');
})

//SHOW ROUTE
router.get('/:id', function(req, res){ 
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash('error', 'Campground not found');
            res.redirect('back');
        } else { 
        res.render('campgrounds/show', {campground: foundCampground});
    }
    });
}); 

router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) =>{
   Campground.findById(req.params.id, (err, foundCampground) =>{
         res.render('campgrounds/edit', {campground: foundCampground});
    });
});

router.put('/:id', middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findOneAndUpdate({_id:req.params.id}, req.body.campground, (err, updatedCampground)=>{ //findOneAndUpdate is the newer version of findByIdAndUpdate; different syntax, works w id, name, or property of model must use {id: } {name: } etc
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);   //can also do updatedCampground._id
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findOneAndDelete({_id:req.params.id}, (err) =>{ //don't forget _id   that underscore is a bitch!
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});



module.exports = router;