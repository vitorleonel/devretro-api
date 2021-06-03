const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
