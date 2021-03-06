const mongoose = require('mongoose');
const validator = require('validator');

//The schema that will be used with the each user instance.
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: `{VALUE} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

//Create the User model used to instantiate user instances.
const User = mongoose.model('User', UserSchema);

module.exports = {User};
