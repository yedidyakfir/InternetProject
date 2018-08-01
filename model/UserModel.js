// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new userSchema()

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude'; 

  return this.name;
};



// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

userSchema.methods.find(columnName , findBy)
{
    User.find({columnName:findBy},function(err, user) {
        if (err) throw err;

        // object of the user
        console.log(user);
    });
};

userSchema.methods.find(columnName , findBy)
{
    User.find({columnName:findBy},function(err, user) {
        if (err) throw err;
        
        // object of the user
        console.log(user);
    });
};


// make this available to our users in our Node applications
module.exports = User;