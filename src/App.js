import './App.css';
import "./styles/main.css";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, Redirect } from 'react-router';
import Modal from 'react-modal';
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
import CreateParty from './Pages/Parties/CreateParty';
import UpdateParty from './Pages/Parties/UpdateParty';
import { AgentController } from './contexts/AgentContext';
import Agents from './Pages/Agents';
import CreateAgent from './Pages/Agents/CreateAgent';
import UpdateAgent from './Pages/Agents/UpdateAgent';
import { ResultController } from './contexts/ResultContext';
import Results from './Pages/ElectionResults';
import CreateResult from './Pages/ElectionResults/CreateResult';
import UpdateResult from './Pages/ElectionResults/UpdateResult';
import Incidents from './Pages/Incidents';
import CreateIncident from './Pages/Incidents/CreateIncident';
import UpdateIncident from './Pages/Incidents/UpdateIncident';
import { IncidentController } from './contexts/IncidentContext';
import ResultDashboard from './Pages/ResultDashboard';
import IncidentDashboard from './Pages/IncidentDashboard';

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

        <AuthenticatedRoute path="/territories/states/create" component ={routerProps => <StateController><CreateState {...routerProps}/></StateController>} />
        <AuthenticatedRoute path="/territories/states/:id" component ={routerProps => <StateController><UpdateState {...routerProps}/></StateController>} />
        <AuthenticatedRoute path="/territories/states" component ={routerProps => <StateController><States {...routerProps}/></StateController>} />
        
        {/* <Route path="/territories/states/create"  render ={routerProps => <StateController><CreateState {...routerProps}/></StateController>} />
        <Route path="/territories/states/:id" render ={routerProps => <StateController><UpdateState {...routerProps}/></StateController>} />
        <Route path="/territories/states"  render ={routerProps => <StateController><States {...routerProps}/></StateController>} /> */}

        <AuthenticatedRoute path="/territories/lgas/create" component ={routerProps => <LgaController><CreateLga {...routerProps}/></LgaController>} />
        <AuthenticatedRoute path="/territories/lgas/:id" component ={routerProps => <LgaController><UpdateLga {...routerProps}/></LgaController>} />
        <AuthenticatedRoute path="/territories/lgas" component ={routerProps => <LgaController><Lgas {...routerProps}/></LgaController>} />

        {/* <Route path="/territories/lgas/create"  render ={routerProps => <LgaController><CreateLga {...routerProps}/></LgaController>} />
        <Route path="/territories/lgas/:id" render ={routerProps => <LgaController><UpdateLga {...routerProps}/></LgaController>} />
        <Route path="/territories/lgas"  render ={routerProps => <LgaController><Lgas {...routerProps}/></LgaController>} /> */}

        <AuthenticatedRoute path="/territories/wards/create" component ={routerProps => <WardController><CreateWard {...routerProps}/></WardController>} />
        <AuthenticatedRoute path="/territories/wards/:id" component ={routerProps => <WardController><UpdateWard {...routerProps}/></WardController>} />
        <AuthenticatedRoute path="/territories/wards" component ={routerProps => <WardController><Wards {...routerProps}/></WardController>} />

        {/* <Route path="/territories/wards/create"  render ={routerProps => <WardController><CreateWard {...routerProps}/></WardController>} />
        <Route path="/territories/wards/:id" render ={routerProps => <WardController><UpdateWard {...routerProps}/></WardController>} />
        <Route path="/territories/wards"  render ={routerProps => <WardController><Wards {...routerProps}/></WardController>} /> */}

        <AuthenticatedRoute path="/territories/polling-units/create" component ={routerProps => <PUController><CreatePollingUnit {...routerProps}/></PUController>} />
        <AuthenticatedRoute path="/territories/polling-units/:id" component ={routerProps => <PUController><UpdatePollingUnit {...routerProps}/></PUController>} />
        <AuthenticatedRoute path="/territories/polling-units" component ={routerProps => <PUController><PollingUnits {...routerProps}/></PUController>} />

        {/* <Route path="/territories/polling-units/create"  render ={routerProps => <PUController><CreatePollingUnit {...routerProps}/></PUController>} />
        <Route path="/territories/polling-units/:id" render ={routerProps => <PUController><UpdatePollingUnit {...routerProps}/></PUController>} />
        <Route path="/territories/polling-units"  render ={routerProps => <PUController><PollingUnits {...routerProps}/></PUController>} /> */}
        
        <AuthenticatedRoute path="/parties/create" component ={routerProps => <PartyController><CreateParty {...routerProps}/></PartyController>} />
        <AuthenticatedRoute path="/parties/:id" component ={routerProps => <PartyController><UpdateParty {...routerProps}/></PartyController>} />
        <AuthenticatedRoute path="/parties" component ={routerProps => <PartyController><Parties {...routerProps}/></PartyController>} />

        {/* <Route path="/parties/create"  render ={routerProps => <PartyController><CreateParty {...routerProps}/></PartyController>} />
        <Route path="/parties/:id" render ={routerProps => <PartyController><UpdateParty {...routerProps}/></PartyController>} />
        <Route path="/parties"  render ={routerProps => <PartyController><Parties {...routerProps}/></PartyController>} /> */}

        <AuthenticatedRoute path="/agents/create" component ={routerProps => <AgentController><CreateAgent {...routerProps}/></AgentController>} />
        <AuthenticatedRoute path="/agents/:id" component ={routerProps => <AgentController><UpdateAgent {...routerProps}/></AgentController>} />
        <AuthenticatedRoute path="/agents" component ={routerProps => <AgentController><Agents {...routerProps}/></AgentController>} />

        {/* <Route path="/agents/create"  render ={routerProps => <AgentController><CreateAgent {...routerProps}/></AgentController>} />
        <Route path="/agents/:id" render ={routerProps => <AgentController><UpdateAgent {...routerProps}/></AgentController>} />
        <Route path="/agents"  render ={routerProps => <AgentController><Agents {...routerProps}/></AgentController>} /> */}

        {/* <Route path="/results/create"  render ={routerProps => <ResultController><CreateResult {...routerProps}/></ResultController>} />
        <Route path="/results/:id" render ={routerProps => <ResultController><UpdateResult {...routerProps}/></ResultController>} />
        <Route path="/results"  render ={routerProps => <ResultController><Results {...routerProps}/></ResultController>} /> */}

        <AuthenticatedRoute path="/results/create" component ={routerProps => <ResultController><CreateResult {...routerProps}/></ResultController>} />
        <AuthenticatedRoute path="/results/:id" component ={routerProps => <ResultController><UpdateResult {...routerProps}/></ResultController>} />
        <AuthenticatedRoute path="/results" component ={routerProps => <ResultController><Results {...routerProps}/></ResultController>} />

        {/* <Route path="/incidents/create"  render ={routerProps => <IncidentController><CreateIncident {...routerProps}/></IncidentController>} />
        <Route path="/incidents/:id" render ={routerProps => <IncidentController><UpdateIncident {...routerProps}/></IncidentController>} /> */}
        <AuthenticatedRoute path="/incidents/create" component ={routerProps => <IncidentController><CreateIncident {...routerProps}/></IncidentController>} />
        <AuthenticatedRoute path="/incidents/:id" component ={routerProps => <IncidentController><UpdateIncident {...routerProps}/></IncidentController>} />
        <AuthenticatedRoute path="/incidents" component ={routerProps => <IncidentController><Incidents {...routerProps}/></IncidentController>} />

        {/* <Route path="/dashboard/results"  render ={routerProps => <ResultController><ResultDashboard {...routerProps}/></ResultController>} />
        <Route path="/dashboard/incidents"  render ={routerProps => <IncidentController>
        <IncidentDashboard {...routerProps}/></IncidentController>} /> */}

        <AuthenticatedRoute path="/dashboard/results" component ={routerProps => <ResultController><ResultDashboard {...routerProps}/></ResultController>} />
        <AuthenticatedRoute path="/dashboard/incidents" component ={routerProps => <IncidentController><IncidentDashboard {...routerProps}/></IncidentController>} />
        <Redirect to="/login" />
      </Switch>
    </>
  );
}

export default App;
