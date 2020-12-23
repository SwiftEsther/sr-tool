import './App.css';
import "./styles/main.css";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch } from 'react-router';
import Results from './Pages/Results';
import Users from './Pages/Users';
import Login from './Pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import AuthenticatedRoute from './shared/AuthenticatedRoute';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import CreateUser from './Pages/Users/CreateUser';
import UpdateUser from './Pages/Users/UpdateUser';
import { UserController } from './contexts/UserContext';

function App() {
  const [userState, dispatch] = useContext(AuthContext);
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/results" component={Results} />
        <Route path="/users/create" render ={routerProps => <UserController><CreateUser {...routerProps}/></UserController>} />
        <Route path="/users/:id" render ={routerProps => <UserController><UpdateUser {...routerProps}/></UserController>} />
        <Route path="/users"  render ={routerProps => <UserController><Users {...routerProps}/></UserController>} />
      </Switch>
    </>
  );
}

export default App;
