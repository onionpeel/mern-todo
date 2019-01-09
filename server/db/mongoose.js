const mongoose = require('mongoose');

//Set up a connection to the database on the mongoose object.

//Use this for initially setting up the routes
mongoose.connect("mongodb://127.0.0.1:27017/MernTodo", { useNewUrlParser: true });

//Use this for production.  Set the MONGODB_URI variable either in the config
//file or directly by using the Heroku CLI
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// mongoose.connect("mongodb://testing1:testing2@ds011790.mlab.com:11790/merntodosdb", { useNewUrlParser: true });


module.exports = {mongoose};
