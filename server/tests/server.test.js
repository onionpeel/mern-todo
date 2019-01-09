const expect = require('chai').expect;
const request = require('supertest');
const app = require('./../server');
const {User} = require('./../models/user');
const {Todo} = require('./../models/todo');
const {users, populateUsers, todos, populateTodos} = require('./seed/seed');



beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /api/todos', function() {
  it('should create a new todo', async function() {
    const name = "Sample Todo";
    const nope = "nope"

    try{
      await request(app)
        .post('/api/todos')
        .send({name})
        .expect(200)
        .expect(res => {
          expect(res.body.name).to.equal(name);
        });
      const todos = await Todo.find({name});
      expect(todos.length).to.equal(1);
      expect(todos[0].name).to.equal(name);
    }catch(e) {
      throw e;
    };
  });
});

describe('GET /api/todos', function() {
  it('should return all the todos', async function() {
    try{
      await request(app)
        .get('/api/todos')
        .expect(200)
        .expect(res => {
          expect(res.body.length).to.equal(2)
        })
    }catch(e) {
      throw e;
    }
  });
});

describe('DELETE /api/todos/:id', function() {
  it('should delete the specified todo', async function() {

    try{
      const id = todos[0]._id.toHexString();
      const name = todos[0].name;

      await request(app)
        .delete(`/api/todos/${id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.name).to.equal(name);
        });
    }catch(e) {
      throw e;
    }
  });
});

describe('POST /api/users', () => {
  it('should create a new user', done => {
    const email = "super@fakemail.com";
    const password = "asdfdewq";

    request(app)
      .post('/api/users')
      .send({email, password})
      .expect(200)
      .expect(res => {
        expect(res.body.email).to.equal(email)
      })
      .end(err => {
        if (err) {
          return done(err);
        };
        User.findOne({email}).then(res => {
          expect(res).to.exist;
          expect(res.email).to.be.equal(email);
          done();
        }).catch(e => done(e));
      });
  });
});

describe('GET /api/users', () => {
  it('should retrieve all the users', done => {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect(res => {
        expect(res.body.length).to.equal(2);
      })
      .end(done)
  });
});

describe('DELETE /api/users/:id', function() {
  it('should delete the specified user', async function() {
    let hexId;
    try {
      const email = users[0].email;
      const user = await User.findOne({email});
      hexId = user._id.toHexString();

      await request(app)
        .delete(`/api/users/${hexId}`)
        .expect(200)
        .expect(res => {
          expect(res.body.email).to.equal(email);
        })
    } catch (e) {
      throw e;
    };
  });
});
