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
        joinRequest: [String],
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
        this.updateOne({name:blogname}, {$pull: {likes: user}},function (err,doc) {console.log(err); console.log(doc);});
    };

    blogSchema.statics.DoILikeBlog = async function(user,blogname,cb) {
        let isUserLiked = await this.findOne( { name:blogname, likes: { $in : [user]} }).count();
        return isUserLiked != 0;
    };

    blogSchema.statics.JoinReq = async function(blogname,user,cb) {
        let IsAlreadyJoined = await this.findOne({name: blogname , users: { $in : [user] }}).count();
        let IsAlreadyRequested = await this.findOne({name: blogname, joinRequest: {$in : [user]}}).count();

        if(IsAlreadyJoined == 0 && IsAlreadyRequested == 0)
            this.updateOne({name: blogname}, {$push :{joinRequest: user}},function (err,doc) {
                console.log(err); console.log(doc);
            });
        else {cb("user already requested or already in group");}
    };

    blogSchema.statics.ADDUSER = async function(user,blogname,cb) {
        let IsAlreadyJoined = await this.findOne({name: blogname , users: { $in : [user] }}).count();

        if(IsAlreadyJoined == 0){
            this.updateOne({name: blogname}, {$pull: {joinRequest: user}} ,function () {}); //delete his join request
            this.updateOne({name:blogname}, {$push: {users: user}},function () {}); //add user to list
        }
    };

    blogSchema.statics.IsUserInBlog = async function(user,blogname) {
        let isUser = await this.findOne( { name:blogname, users: { $in : [user]} }).count();
        return isUser != 0;
    };

    blogSchema.statics.IsCreator = async function(user,blogname) {
        let creator = await this.findOne({name:blogname}).select('creator');
        let is = (user == creator.creator);
        return is;
    };

    db.model('Blogs', blogSchema);
};