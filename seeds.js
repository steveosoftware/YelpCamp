const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');



let data = [
    {name: "Yosemite",
    image: 'https://img.sunset02.com/sites/default/files/image/2016/09/main/yosemite-camping.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {name: "Big Bear",
    image: 'https://www.planetware.com/photos-large/USCA/california-yosemite-north-pines-campground.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {name: "San Onofre",
    image: 'https://jameskaiser.com/wp-content/uploads/2015/03/camp-4-yosemite-valley.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
]



function seedDB(){
    //REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
    if(err){
        console.log(err)
    } else {
    console.log('removed campgrounds');
    //ADD A FEW CAMPGROUNDS
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('added a campground');
                        //CREATE COMMENT
                        Comment.create(
                            {
                                text: 'This place is great, but I wish there was internet.',
                                author: 'Homer'
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log('created new comment');
                            }});
                        }
                });
            });
        }
    });
};
        //ADD A FEW COMMENTS



module.exports = seedDB;
