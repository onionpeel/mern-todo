const {User} = require('./../../models/user');
const {Todo} = require('./../../models/todo');
const {ObjectID} = require('mongodb');

//This users array is the data used for the tests
const todos = [
  {
    name: 'Make tofu cake',
    _id: new ObjectID()
  },
  {
    name: 'Prepare natto slurpy',
    _id: new ObjectID()
  }
];

//This will populate the Todos collection so it only contains data from the
//todos array.
const populateTodos = async () => {
  try {
    await Todo.deleteMany({});

    const todoOne = new Todo(todos[0]).save();
    const todoTwo = new Todo(todos[1]).save();

    await Promise.all([todoOne, todoTwo]);
  } catch (e) {
    console.log(e);
  };
};


const users = [
  {
    email: "fake1@fakemail.com",
    password: "123abc"
  },
  {
    email: "fake2@fakemail.com",
    password: "123abc"
  }
];
//This function sets up the Users collection so that it only contains the data from the
//users array
const populateUsers = async () => {
  try {
    await User.deleteMany({});

    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    await Promise.all([userOne, userTwo]);
  } catch (e) {
    console.log(e);
  };
};

module.exports = {users, populateUsers, todos, populateTodos};
