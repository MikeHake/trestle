import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import AppliedRoute from "./utils/AppliedRoute";
import AuthenticatedRoute from "./utils/AuthenticatedRoute";
import UnauthenticatedRoute from "./utils/UnauthenticatedRoute";
import Landing from "./components/Landing";
import AdminApp from "./components/AdminApp";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: undefined
    };
  }

  async componentDidMount() {
    Auth.currentUserInfo().then(user => {
      console.log('App.componentDidMount() user:', user);
      if(user){
        this.handleUserAuthenticated(user);
      }
    })
      .catch(err => {
        console.log('Auth error:', err);

      });
  }

  handleUserAuthenticated = user => {
    this.setState({
      isAuthenticated: true,
      user: user
    });
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.setState({
      isAuthenticated: false,
      user: undefined
    });

    this.props.history.push("/");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      handleUserAuthenticated: this.handleUserAuthenticated,
      handleLogout: this.handleLogout,
    };

    return (
      <div className='App'>
       
        <Switch>
          <AppliedRoute path="/" exact component={Landing} props={childProps} />
          <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
          <AuthenticatedRoute path="/admin" component={AdminApp} props={childProps} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);