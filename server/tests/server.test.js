const expect = require('chai').expect;
const request = require('supertest');
const app = require('./../server');
const {User} = require('./../models/user');
const {users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);

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
      console.log(e);
    };
  });
});
