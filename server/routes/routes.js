const express = require('express');
const router = express.Router();
const {mongoose} = require('./../db/mongoose');
const {User} = require('./../models/user');

//Create a new user
router.post('/users', async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (e) {
    res.status(400).send();
  };
});

//Retrieve all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send();
  };
});


//Delete a user by id
router.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    res.send(deletedUser);
  }catch (e) {
    res.status(400).send();
  };
});

module.exports = router;
