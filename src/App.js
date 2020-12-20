import './App.css';
import "./styles/main.css";
import { Route, Switch } from 'react-router';
import Results from './Pages/Results/Index';
import Login from './Pages/Login/Login';

function App() {
  return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/results" component={Results} />
      </Switch>
  );
}

export default App;
