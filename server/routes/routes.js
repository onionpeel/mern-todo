const express = require('express');
const router = express.Router();
const {mongoose} = require('./../db/mongoose');
const {User} = require('./../models/user');

router.post('/', async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send();
  };
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send();
  };
});

module.exports = router;
