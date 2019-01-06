const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/MernTodo", { useNewUrlParser: true });

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

module.exports = {mongoose};
