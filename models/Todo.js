const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  content: { type: String, required: true, validate: /\S+/ },
  completed: { type: Boolean, default: false },
  authorid: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
