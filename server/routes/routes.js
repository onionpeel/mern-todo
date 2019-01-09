const express = require('express');
const router = express.Router();
const {mongoose} = require('./../db/mongoose');
const {User} = require('./../models/user');
const {Todo} = require('./../models/todo');

//Create a new todo
router.post('/todos', async (req, res) => {
  try{
    const todo = new Todo({
      name: req.body.name
    });

    const newTodo = await todo.save();
    res.send(newTodo);
  }catch(e) {
    res.status(400).send();
  };
});

router.get('/todos', async (req, res) => {
  try{
    const todos = await Todo.find({});
    res.send(todos);
  }catch(e) {
    res.status(400).send();
  };
});

router.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTodo = await Todo.findByIdAndDelete({_id: id});
    res.send(deletedTodo);
  }catch(e){
    res.status(404).send();
  };
});

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
