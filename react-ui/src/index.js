import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import WebFontLoader from 'webfontloader';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const DEV_URL = 'https://84trov9yy0.execute-api.us-east-1.amazonaws.com/dev/graphql';
const LOCAL_URL = 'http://localhost:3000/graphql';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: "us-east-2",
    userPoolId: "us-east-2_uSQ2m25O5",
    identityPoolId: "us-east-2:9d099f29-fae3-475d-b11d-b45f5feff1de",
    userPoolWebClientId: "3vhr9pnl1fijknr995tknv0bba"
  },
  API: {
    graphql_endpoint: DEV_URL
  }
});

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
