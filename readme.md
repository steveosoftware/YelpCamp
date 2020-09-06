Lesson 311 Notes - Show Page and Restful Routes

RESTFUL ROUTES

name    url         verb    description
===========================================
INDEX   /dogs       GET     Display a list of all dog
NEW     /dogs/new   GET     Displays form to make a new dog
CREATE  /dogs       POST    Add new dog to Database
SHOW    /dogs/:id   GET     Shows info about one dog


new command - .findById

campground.findById(req.params.id, function(err, foundCampground))

Lesson 312 - Blog exercise
REST - "Representational State Trasnfer"- mapping between HTTP routes and CRUD

CREATE  /dogs - POST
READ    /allBloges  - GET
UPDATE  /updateBlog/:id  - PUT
DESTROY /destroyBlog/:id - DELETE