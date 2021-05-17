import React, {useEffect, useContext, useState} from 'react';
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const AuthenticatedRoute = ({component: Component, isLoggedIn, ...rest}) => {
  const [userState, dispatch] = useContext(AuthContext);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  useEffect(() => {
    console.log(token);
    if(!token){
      localStorage.clear();
    }
  }, [token])
  return (
    <Route
      {...rest}
      render={
        (props) => (token?.length) > 0 
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default AuthenticatedRoute;