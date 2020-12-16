import logo from './logo.svg';
import './App.css';
import "./styles/main.css";
import SideNav from './shared/SideNav';
import { Route, Switch } from 'react-router';
import { Router } from "react-router-dom";
import Results from './Pages/Results/Index';

function App() {
  return (
      <Switch>
        <Route path="/results" component={Results} />
      </Switch>
  );
}

export default App;
