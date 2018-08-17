var mongoose = require('mongoose');
const debug = require("debug")("data-base:users");
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

module.exports = db => {
    // create a schema
    var userSchema = new Schema({
        email: { type: String },
        admin: Boolean,
		password: String,
        active: Boolean,
        resetPasswordToken: String,
        resetPasswordExpires: Date,

        cartItems: {type:[String], unique: true},

        created_at: Date,
        updated_at: Date,

        google: {
            id:String,
            token:String,
            email:String,
            name:String
        },
        facebook: {
            id: String,
            token: String,
            email: String,
            name: String
        }
    });

    userSchema.plugin(passportLocalMongoose, {
        usernameField: 'email',
        passwordField: 'password'
    });

    userSchema.pre('create', function (next) {
       this.admin = false;
        next();
    });

    userSchema.pre('save', function(next) {

        this.active = true;
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updated_at = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;

        next();
    });

    userSchema.statics.REQUEST = async function(cb) {
        debug("get all users");
        let u = await this.find({});
        return u;
    };
	
	userSchema.statics.REGISTER = async function(email,admin,password)
    {
        let userToAdd = {
            email : email,
            admin : admin,
            password : password,
        };
        this.create(userToAdd);
    };

	userSchema.statics.UPDATE = async function(email,newUser)
    {
        this.update({email:email},newUser);
    };

	userSchema.statics.DISABLE = async function(email) {
	  this.updateOne({email:email},{active: false});
    };

	userSchema.statics.AddToCart = async function(bookId,userId,cb)
    {
        console.log("add to cart " + bookId + " " + userId);
        let isAllreadyIn = await this.findOne( { _id:userId, cartItems: { $in : [bookId]} }).count();
        if (isAllreadyIn == 0)
        {
            this.updateOne({_id:userId}, {$push: {cartItems: bookId}},function (err,doc) {
                cb(err);
            });
        }
        else
        {
            console.log("add to cart fail because the item allredy exsist");
            return false;
        }
    };

    userSchema.statics.RemoveFromCart = async function(id,email,cb)
    {
        this.updateOne({email:email}, {$pull: {cartItems: id}},cb);
    };

    userSchema.statics.RemoveAllCart = async function(email,cb)
    {
        this.updateOne({email:email}, {$pullAll: {cartItems: {}}},cb);
    };

    db.model('Users', userSchema);
};