import './App.css';
import "./styles/main.css";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch } from 'react-router';
import Modal from 'react-modal';
// import Results from './Pages/Results';
import Users from './Pages/Users';
import Login from './Pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import AuthenticatedRoute from './shared/AuthenticatedRoute';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import CreateUser from './Pages/Users/CreateUser';
import UpdateUser from './Pages/Users/UpdateUser';
import { UserController } from './contexts/UserContext';
import States from './Pages/States';
import { StateController } from './contexts/StateContext';
import CreateState from './Pages/States/CreateState';
import UpdateState from './Pages/States/UpdateState';

Modal.setAppElement("#root");

function App() {
  const [userState, dispatch] = useContext(AuthContext);
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/results" component={Results} /> */}
        <Route path="/users/create" render ={routerProps => <UserController><CreateUser {...routerProps}/></UserController>} />
        <Route path="/users/:id" render ={routerProps => <UserController><UpdateUser {...routerProps}/></UserController>} />
        <Route path="/users"  render ={routerProps => <UserController><Users {...routerProps}/></UserController>} />
        <Route path="/territories/states/create"  render ={routerProps => <StateController><CreateState {...routerProps}/></StateController>} />
        <Route path="/territories/states/:id" render ={routerProps => <StateController><UpdateState {...routerProps}/></StateController>} />
        <Route path="/territories/states"  render ={routerProps => <StateController><States {...routerProps}/></StateController>} />
      </Switch>
    </>
  );
}

export default App;
