import React, { useState } from "react";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { Session } from "../../api/Session";

export const SignInPage = props => {
  const [errors, setErrors] = useState([]);

  const createSession = event => {
    event.preventDefault();
    const { currentTarget: form } = event;

    const fd = new FormData(form);

    Session.create({
      email: fd.get("email"),
      password: fd.get("password")
    }).then(data => {
      if (data.status === 404) {
        setErrors([...errors, { message: "Wrong Email or Password" }]);
      } else {
        props.history.push("/albums");
        if (typeof props.onSignIn === "function") {
          props.onSignIn();
        }
      }
    });
  };
  return (
    <Grid className="background" 
      textAlign='center' 
      style={{ height: '100vh' }} 
      verticalAlign='middle'
    >
    <Grid.Column style={{ maxWidth: 450 }}>
      <h1 style={{ color: "white", fontSize:' 5em', marginBottom:"0px" }} textAlign='center'>
        MOMENT
      </h1>
  <p style={{textAlign:'center', color:'white', fontSize:"1.5em", marginTop:"0px"  }}><strong>PERSONAL PHOTO ALBUM</strong></p>
      <Form size='large' onSubmit={createSession} >
        <Segment stacked>
          <Form.Input name="email" type="email" fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            name="password"
            type='password'
          />

          <Button color='teal' fluid size='large' type="submit" >
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/sign_up'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
  );
};