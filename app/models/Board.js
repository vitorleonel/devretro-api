const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
