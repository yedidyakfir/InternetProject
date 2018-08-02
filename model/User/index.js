const debug = require("debug")("data-base:user");
const mongodb = require("mongoose");
mongodb.Promise = Promise;

let db = mongodb.createConnection();
(async () => {

    try {
        await db.openUri('mongodb://localhost/users');
    }
    catch (err) {
        debug("Error connecting to DB: " + err);
    }
})();

debug('Pending DB connection');
require("./UserSchema")(db);
module.exports = model => db.model(model);