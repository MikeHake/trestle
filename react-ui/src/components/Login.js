import React, { Component, Fragment } from "react";
import { Card, CardTitle, CardText, CardActions, Button, TextField } from 'react-md';

import { Auth } from "aws-amplify";
import LoadingIndicator from "./LoadingIndicator";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: 'LOGIN',
      user: undefined,
      isLoading: false,
      email: "",
      password: ""
    };

  }

  handleEmailChange = value => {
    this.setState({
      email: value
    });
  }

  handlePasswordChange = value => {
    this.setState({
      password: value
    });
  }

  submitSignIn = event => {
    event.preventDefault();

    this.setState({
      isLoading: true
    });

    this.setState({ isLoading: true });
    Auth.signIn(this.state.email, this.state.password)
      .then(user => {
        console.log('Auth user:', user);
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          console.log('require new password', user.challengeParam);
          this.setState({
            isLoading: false,
            user,
            form: 'CHANGE_PASSWORD'
          });
        } else {
          this.setState({
            isLoading: false
          });
          this.props.handleUserAuthenticated(user);
        }
      })
      .catch(err => {
        console.log('Auth error:', err);
        alert(err.message);
        this.setState({ isLoading: false });
      });
  }

  submitNewPassword = event => {
    event.preventDefault();

    const { user, password } = this.state;
    const { requiredAttributes } = user.challengeParam;
    this.setState({ isLoading: true });

    Auth.completeNewPassword(user, password, requiredAttributes)
      .then(user => {
        console.log('Change password complete:', user);
        this.props.handleUserAuthenticated(user);

      })
      .catch(err => {
        console.log('Change password error:', err);
        alert(err.message);
        this.setState({ isLoading: false });
      });
  }

  loginForm() {
    return (
      <Card style={{ maxWidth: 500 }} className="md-block-centered">
        <CardTitle title="Login" subtitle="Trestle" />
        <CardText>
          <form className="md-grid" onSubmit={this.submitSignIn}>
            {/* Adding the unused button as an inlineIndicator is a hack to make the email input
                style the same as the password. The password adds an inlineInput by default,
                which adds a few pixels of padding. Makes form look sloppy and unaligned
             */}
            <TextField
              id="email"
              label="Email"
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              inlineIndicator={<Button flat></Button>}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />

            <CardActions className="md-cell md-cell--12">
              <Button raised primary type="submit" className="md-cell--right">Submit</Button>
            </CardActions>

          </form>
        </CardText>
      </Card>
    );
  }

  newPasswordForm() {
    return (
      <Card style={{ maxWidth: 500 }} className="md-block-centered">
        <CardTitle title="New Password Required" subtitle="Trestle" />
        <CardText>
          <form onSubmit={this.submitNewPassword}>
            <TextField
              id="password"
              label="New Password"
              floating
              type="New Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />

            <CardActions className="md-cell md-cell--12">
              <Button raised primary type="submit" className="md-cell--right">Submit</Button>
            </CardActions>

          </form>
        </CardText>
      </Card>
    );
  }

  render() {
    const { form, isLoading } = this.state;

    return (
      <Fragment>
        <LoadingIndicator isLoading={isLoading} />
        {form === 'LOGIN'
          ? this.loginForm()
          : this.newPasswordForm()
        }
      </Fragment>
    );
  }
}