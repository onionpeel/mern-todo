const mongoose = require('mongoose');

//The schema that for a Todo instance
const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {Todo};
