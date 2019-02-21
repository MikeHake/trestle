import React from "react";
import { CircularProgress } from 'react-md';

import "./loading.css";


export default ({ isLoading }) => isLoading 
  ? <div id="overlay"><CircularProgress id='progress-spinner'/></div>
  : null;
  