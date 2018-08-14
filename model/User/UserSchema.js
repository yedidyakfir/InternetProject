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

    db.model('Users', userSchema);
};