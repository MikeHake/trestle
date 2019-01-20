import React from "react";
import { Redirect } from "react-router-dom";

export default ({isAuthenticated}) => isAuthenticated 
  ? <Redirect to={'/admin'} />
  : <Redirect to={'/login'} />;