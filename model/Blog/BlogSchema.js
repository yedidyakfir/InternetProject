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
        likes: [String],
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

    blogSchema.statics.ADDPOST = async function(msg,user,blogname,cb) {
        this.updateOne({name:blogname}, {$push: {posts: {msg:msg,user:user}}},function () {});
    };

    blogSchema.statics.LIKEBLOG = async function(user,blogname,cb) {
        //is this user already liked this post
        let isUserLiked = await this.findOne( { name:blogname, likes: { $in : [user]} }).count();
        if(isUserLiked == 0) { //if not he can like it
            this.updateOne({name:blogname}, {$push: {likes: user}},function (err,doc) {
                console.log(err);
                console.log(doc);
            });
        }
    };

    blogSchema.statics.UNLIKEBLOG = async function(user,blogname,cb) {
        this.updateOne({name:blogname}, {$pull: {likes: user}},function () {});
    };

    blogSchema.statics.DoILikeBlog = async function(user,blogname,cb) {
        let isUserLiked = await this.findOne( { name:blogname, likes: { $in : [user]} }).count();
        return isUserLiked != 0;
    };

    blogSchema.statics.ADDUSER = async function(user,blogname,cb) {
        this.updateOne({name:blogname}, {$push: {users: user}},function () {});
    };

    blogSchema.statics.IsUserInBlog = async function(user,blogname) {
        let isUser = await this.findOne( { name:blogname, users: { $in : [user]} }).count();
        return isUser != 0;
    };

    db.model('Blogs', blogSchema);
};