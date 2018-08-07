var mongoose = require('mongoose');
const debug = require("debug")("data-base:users");
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

module.exports = db => {
    // create a schema
    var userSchema = new Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        admin: Boolean,
        created_at: Date,
        updated_at: Date
    });

    userSchema.plugin(passportLocalMongoose, {
        usernameField: 'email',
        passwordField: 'password'
    });

    userSchema.pre('save', function(next) {
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
        debug("get all books");
        let u = await this.find({});
        return u;
    };

    db.model('Users', userSchema);
};