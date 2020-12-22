import './App.css';
import "./styles/main.css";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch } from 'react-router';
import Results from './Pages/Results/Index';
import Login from './Pages/Login/Login';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/results" component={Results} />
      </Switch>
    </>
  );
}

export default App;
