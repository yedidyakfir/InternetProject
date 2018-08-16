var mongoose = require('mongoose');
const debug = require("debug")("data-base:groups");
var Schema = mongoose.Schema;

module.exports = db => {
    // create a schema
    var blogSchema = new Schema({
        name: { type: String, required: true, unique: true },
        description: String,
        creator:String,
        photo: String,
        users: [String],
        posts: [{msg: String, user: String}],
        likes: {type: [String], unique: true},
        created_at: Date,
        updated_at: Date
    });


    blogSchema.pre('save', function(next) {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updated_at = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;

        next();
    });

    blogSchema.statics.CREATE = async function(name){

    };

    blogSchema.statics.REQUEST = async function(cb) {
        debug("get all blogs");
        let u = await this.find({});
        return u;
    };

    db.model('Blogs', blogSchema);
};