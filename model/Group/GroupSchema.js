var mongoose = require('mongoose');
const debug = require("debug")("data-base:groups");
var Schema = mongoose.Schema;

module.exports = db => {
    // create a schema
    var groupSchema = new Schema({
        name: { type: String, required: true, unique: true },
        users: [String],
        messages: [String],
        created_at: Date,
        updated_at: Date
    });


    groupSchema.pre('save', function(next) {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updated_at = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;

        next();
    });

    groupSchema.statics.CREATE = async function(name){

    };

    groupSchema.statics.REQUEST = async function(cb) {
        debug("get all groups");
        let u = await this.find({});
        return u;
    };

    db.model('Groups', groupSchema);
};