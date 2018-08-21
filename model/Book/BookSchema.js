var mongoose = require('mongoose');
const debug = require("debug")("data-base:books");
var Schema = mongoose.Schema;

module.exports = db => {

    // create a schema
    let bookSchema = new Schema({
        name: { type: String, required: true, unique: true },
        author: String,
        photo: String,
        seriesName: String,
        publishDate: Date,
        ISBN: { type: Number, required: true, unique: true },
        summary: String,
        seller: String,
        buyer: String,
        sellDate: Date,
        active: Boolean,
        created_at: Date,
        updated_at: Date,
        price: Number
    });

    bookSchema.pre('save', function(next) {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updated_at = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;

        next();
    });

    bookSchema.statics.REQUEST = async function(skip = 0,limit = 0,active = true) {
        debug("get all books");
        let u = await this.find({active:active}).sort({'date': -1}).skip(skip).limit(limit);
        return u;
    };

    bookSchema.statics.AllUserUnsold = async function(user,cb) {
        this.find({seller:user,sellDate:{$exists:false}},cb);
    };

    bookSchema.statics.AllUserSells = async function(user,cb) {
        this.find({seller:user,sellDate:{$exists:true}},cb);
    };

    bookSchema.statics.REQUESTBY = async function(book) {
        debug("get book " + book);
        let u = await this.findOne(book);
        return u;
    };

    bookSchema.statics.GetByIDs = async function(ids,cb) {
        this.find({_id: {$in: ids}},cb);
    };

    bookSchema.statics.CREATE = async function(seller,name,author,ISBN,seriesName,publishDate,
                                               summary,price,photoName,cb)
    {
        let bookToaAdd = {
            name : name,
            author : author,
            seriesName : seriesName,
            publishDate : publishDate,
            ISBN : ISBN,
            summary : summary,
            seller : seller,
            photo : photoName + ".jpg",
            active : true,
            price : price
        };
        this.create(bookToaAdd,cb);
    };


    db.model('Books',bookSchema);
    
};
