// all the middleware goes here

const Campground    = require('../models/campground');
const Comment       = require('../models/comment');
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next)=>{
        if(req.isAuthenticated()){ //not using isLogged in; doing this instead, then see if user owns the campground
            Campground.findById(req.params.id, (err, foundCampground)=>{
                if(err || !foundCampground){
                    req.flash('error', "Campground not found")
                    res.redirect('back');
                } else {
                        //does user own campground
                if(foundCampground.author.id.equals(req.user._id)){  //can't use === becuase req.user._id is a string, and foundCampground.author.id is a mongoose object, so comparing them won't work.  use mongoose .equals method insteaf         
                    next(); //creating middleware, so if they wanna update or delete or edit, move on to next.  if they don't own, move 'back'
                    } else {
                        req.flash('error', "You don't have permission to do that");
                    res.redirect('back')
                    }
                }
            });
               } else {
                req.flash('error', "You don't have permission to do that");
               res.redirect('back');
                }
            }

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){ //not using isLogged in; doing this instead, then see if user owns the campground
        Comment.findById(req.params.comment_id, (err, foundComment) =>{
            if(err){
                req.flash('error', 'Cannot find comment');
                res.redirect('back');
            } else {
                    //does user own comment?
            if(foundComment.author.id.equals(req.user._id)){  //can't use === becuase req.user._id is a string, and foundCampground.author.id is a mongoose object, so comparing them won't work.  use mongoose .equals method instead
                next(); //creating middleware, so if they wanna update or delete or edit, move on to next.  if they don't own, move 'back'
            } else {
                req.flash('error', "You don't have permission to do that");
               res.redirect('back');
               }
              }
            });
        } else {
            req.flash('error', 'You need to be logged in to do that!');
           res.redirect('back');
        }
    }


middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that!'); //sending our key: Error with the value: 'Please Login First!' to our route      req.flash(key, msg)
    res.redirect('/login');
}  

module.exports = middlewareObj;