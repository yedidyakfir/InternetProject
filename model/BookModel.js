var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bookSchema = new bookSchema();
var Book = mongoose.model('Book', bookSchema);
module.exports = Book;