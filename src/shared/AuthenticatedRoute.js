import React, {Component} from 'react';
import { Redirect, Route } from 'react-router';

const AuthenticatedRoute = ({component: Component, isLoggedIn, ...rest}) => {
  return (
    <Route
      {...rest}
      render={
        (props) => isLoggedIn === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default AuthenticatedRoute;