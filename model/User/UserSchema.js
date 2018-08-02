var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = db => {
    // create a schema
    var userSchema = new Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        privilege: Number,
        admin: Boolean,
        location: String,
        meta: {
            age: Number,
            website: String
        },
        created_at: Date,
        updated_at: Date
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

    db.model('Users', userSchema, 'users');
};