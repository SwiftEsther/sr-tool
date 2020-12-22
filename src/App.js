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
import { UserContext } from './contexts/UserContext';

function App() {
  const [userState, dispatch] = useContext(UserContext);
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/results" component={Results} />
        <Route path="/users"  component={Users} />
      </Switch>
    </>
  );
}

export default App;
