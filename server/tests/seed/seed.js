const {User} = require('./../../models/user');

//This users array is the data used for the tests
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

//This function sets up the database so that it only contains the data from the
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

module.exports = {users, populateUsers}
