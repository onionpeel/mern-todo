import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import uuid from 'uuid';

class UserList extends Component {
  state = {
    users: [
      {id: uuid(), email: "notreal@fake.com"},
      {id: uuid(), email: "haha@fake.com"},
      {id: uuid(), email: "blahblah@fake.com"}
    ]
  }

  render() {
    const {users} = this.state;
    return (
      <Container>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={() => {
            const email = prompt('Enter Email');
            if(email) {
              this.setState(state => ({
                users: [...state.users, {id: uuid(), email}]
              }))
            }
          }}
        >Add User
      </Button>

      <ListGroup>
        <TransitionGroup className="user-list">
          {users.map(({id, email}) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>{email}</ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>

      </Container>
    )
  }
};

export default UserList;
