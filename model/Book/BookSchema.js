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


    db.model('Books',bookSchema, 'books');
};
