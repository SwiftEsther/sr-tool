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
import Lgas from './Pages/Lgas';
import { LgaController } from './contexts/LgaContext';
import CreateLga from './Pages/Lgas/CreateLga';
import UpdateLga from './Pages/Lgas/UpdateLga';
import { WardController } from './contexts/WardContext';
import Wards from './Pages/Wards';
import CreateWard from './Pages/Wards/CreateWard';
import UpdateWard from './Pages/Wards/UpdateWard';
import { PUController } from './contexts/PollingUnitContext';
import PollingUnits from './Pages/PollingUnits';
import CreatePollingUnit from './Pages/PollingUnits/CreatePollingUnit';
import UpdatePollingUnit from './Pages/PollingUnits/UpdatePollingUnit';
import Parties from './Pages/Parties';
import { PartyController } from './contexts/PartyContext';

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

        <Route path="/territories/lgas/create"  render ={routerProps => <LgaController><CreateLga {...routerProps}/></LgaController>} />
        <Route path="/territories/lgas/:id" render ={routerProps => <LgaController><UpdateLga {...routerProps}/></LgaController>} />
        <Route path="/territories/lgas"  render ={routerProps => <LgaController><Lgas {...routerProps}/></LgaController>} />

        <Route path="/territories/wards/create"  render ={routerProps => <WardController><CreateWard {...routerProps}/></WardController>} />
        <Route path="/territories/wards/:id" render ={routerProps => <WardController><UpdateWard {...routerProps}/></WardController>} />
        <Route path="/territories/wards"  render ={routerProps => <WardController><Wards {...routerProps}/></WardController>} />

        <Route path="/territories/polling-units/create"  render ={routerProps => <PUController><CreatePollingUnit {...routerProps}/></PUController>} />
        <Route path="/territories/polling-units/:id" render ={routerProps => <PUController><UpdatePollingUnit {...routerProps}/></PUController>} />
        <Route path="/territories/polling-units"  render ={routerProps => <PUController><PollingUnits {...routerProps}/></PUController>} />

        <Route path="/territories/polling-units/create"  render ={routerProps => <PartyController><CreatePollingUnit {...routerProps}/></PartyController>} />
        <Route path="/territories/polling-units/:id" render ={routerProps => <PartyController><UpdatePollingUnit {...routerProps}/></PartyController>} />
        <Route path="/parties"  render ={routerProps => <PartyController><Parties {...routerProps}/></PartyController>} />
      </Switch>
    </>
  );
}

export default App;
