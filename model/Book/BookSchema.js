var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = db => {

    // create a schema
    let bookSchema = new Schema({
        name: { type: String, required: true, unique: true },
        author: String,
        seriesName: String,
        publishDate: Date,
        ISBN: { type: String, required: true, unique: true },
        summary: String,
        seller: String,
        buyer: String,
        sellDate: Date,
        isActive: Boolean,
        created_at: Date,
        updated_at: Date
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

    bookSchema.statics.REQUEST = async function(cb) {
        let cursor;
        let asynch = cb.constructor.name === 'AsyncFunction';
        try {
            cursor = await this.find().cursor();
        } catch (err) { throw err; }
        try {
            while (todo = await cursor.next())
                if (asynch)
                    try { await cb(todo); } catch (err) { throw err; }
                else
                    cb(todo);
        } catch (err) { throw err; }
    };

    bookSchema.statics.CREAT = async function( bookToAdd)
    {
        let realBookToaAdd = bookToAdd;
        db.model.save(function (err) {
            if (err) {
                throw err;
            }
            console.log("book sucessfuly creat")
        })
    };

    bookSchema.statics.CREAT = async function(name,author, seriesName,publishDate,ISBN,summary,seller)
    {
        let bookToaAdd = new book
        {
            this.name = name,
            this.author = author,
            this.seriesName = seriesName,
            this.publishDate = publishDate,
            this.ISBN = ISBN,
            this.summary = summary,
            this.seller = seller,
            this.sellDate = new Date(),//just fo now we should put it null? or min value on date
            this.created_at = new Date(),
            this.updated_at = new Date
        };
        db.model.save(function (err) {
            if (err) {
                throw err;
            }
            console.log("book sucessfuly created")
        })
    };


    db.model('Books',bookSchema, 'books');

    
};
