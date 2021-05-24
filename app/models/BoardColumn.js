const mongoose = require('mongoose');

const boardColumnItemSchema = new mongoose.Schema(
  {
    description: String,
  },
  { timestamps: true }
);

const boardColumnSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
    },
    name: String,
    color: String,
    items: {
      type: [boardColumnItemSchema],
      default: () => [],
    },
  },
  { timestamps: true }
);

const BoardColumn = mongoose.model(
  'BoardColumn',
  boardColumnSchema,
  'board_columns'
);

module.exports = BoardColumn;
