const express       = require('express');
const router        = express.Router({mergeParams: true});
const Campground    = require('../models/campground');
const Comment       = require('../models/comment');
const middleware    = require('../middleware');



//COMMENTS NEW
router.get('/new', middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){

        } else {
            res.render('comments/new', {campground: foundCampground});
        }
    });
});

//COMMENTS CREATE
router.post('/', middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){  
                console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //add username and id to comment
                  
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash('success', 'Successfully added comment');
                    res.redirect('/campgrounds/' + campground._id);
                }
            });

        }
    });
});

//COMMENT EDIT ROUTE
//we have campground id with our route setup already in app.js, so req.params.id gives us our campground id.   then link up with campground_id in our comments/edit which doesnt exist until we run this code
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) =>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err || !foundCampground){
            req.flash('error', 'Campground not found');
            return res.redirect('back');
        }
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err){
                res.redirect('back');
            } else {
                res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
            }
        })
    });
});

//COMMENT UPDATE ROUTE
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res)=>{
    Comment.findOneAndUpdate({_id:req.params.comment_id}, req.body.comment, (err, updatedComment)=>{
            if(err){
                res.redirect('back');
            } else {
                res.redirect('/campgrounds/' + req.params.id);
            }
    })
})

//COMMENT DESTROY ROUTE
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) =>{
    Comment.findOneAndDelete({_id:req.params.comment_id}, (err)=>{
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', 'Comment deleted!');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});



module.exports = router;
