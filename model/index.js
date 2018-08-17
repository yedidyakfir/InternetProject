const debug = require("debug")("data-base");
const mongodb = require("mongoose");
mongodb.Promise = Promise;

let db = mongodb.createConnection();
(async () => {

    try {
        await db.openUri('mongodb://localhost/BookShop');
    }
    catch (err) {
        debug("Error connecting to DB: " + err);
    }
})();

debug('Pending DB connection');
//require("./Group/GroupSchema")(db);
require("./User/UserSchema")(db);
require("./Book/BookSchema")(db);
module.exports = model => db.model(model);