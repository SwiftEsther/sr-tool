import React, {useEffect, useContext} from 'react';
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const AuthenticatedRoute = ({component: Component, isLoggedIn, ...rest}) => {
  const [userState, dispatch] = useContext(AuthContext);
  useEffect(() => {
    if(!userState.isLoggedIn) localStorage.multiRemove(['user', 'access_token']);
  }, [userState.isLoggedIn])
  return (
    <Route
      {...rest}
      render={
        (props) => userState.isLoggedIn === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default AuthenticatedRoute;