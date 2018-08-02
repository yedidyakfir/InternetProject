const debug = require("debug")("data-base:books");
const mongodb = require("mongoose");
mongodb.Promise = Promise;

let db = mongodb.createConnection();
(async () => {

    try {
        await db.openUri('mongodb://localhost/books');
    }
    catch (err) {
        debug("Error connecting to DB: " + err);
    }
})();

debug('Pending DB connection');
require("./BookSchema")(db);
module.exports = model => db.model(model);