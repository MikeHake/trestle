import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import WebFontLoader from 'webfontloader';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const PROD_URL = 'https://trestle-services.mikehake.com/graphql';
const LOCAL_URL = 'http://localhost:3000/graphql';

var API_URL = PROD_URL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev
  API_URL = LOCAL_URL;
  console.log("DEV API:",API_URL);
} else {
  // production
  console.log("PROD API:", API_URL)
}

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: "us-east-2",
    userPoolId: "us-east-2_uSQ2m25O5",
    identityPoolId: "us-east-2:9d099f29-fae3-475d-b11d-b45f5feff1de",
    userPoolWebClientId: "3vhr9pnl1fijknr995tknv0bba"
  },
  API: {
    graphql_endpoint: API_URL,
    graphql_endpoint_iam_region: "us-east-2"
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
