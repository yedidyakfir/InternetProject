var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bookSchema = new Schema({
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

// the schema is useless so far
// we need to create a model using it
var Book = mongoose.model('Book', bookSchema);

// make this available to our users in our Node applications
module.exports = Book;