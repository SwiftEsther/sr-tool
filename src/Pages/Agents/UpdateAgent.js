import React, { useContext, useState } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateAgent} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import AgentForm from './components/AgentForm';
import { AgentContext } from '../../contexts/AgentContext';

const UpdateAgent = ({match, location, history}) => {
    const {agent} = location.state;
    let data = {
        first_name: agent.firstname,
        last_name: agent.lastname,
        phoneNumber: agent.phone,
        lga: agent.lga.id,
        ward: agent.ward.id,
        pollingUnit: agent.pollingUnit.id
    }
    const [agentState, dispatch] = useContext(AgentContext);
    const [currentAgent, setCurrentAgent] = useState(data);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_AGENT'});
        const requestBody = {
            firstname:values.first_name,
            lastname: values.last_name,
            phone: values.phoneNumber,
            email: values.email || "dmimn@gmail.com",
            address: values.address || "Lagos, Nigeria",
            lgaId: values.lga,
            wardId: values.ward,
            pollingUnitId: values.pollingUnit,
            politicalPartyId: values.party || 2
        }
         setSubmitting(true);
         apiRequest(`${updateAgent}/${match.params.id}`, 'put', {...requestBody})
            .then((res) => {
                dispatch({type: 'UPDATE_AGENT_SUCCESS', payload: {response: res}});
                setSubmitting(false);
                history.push("/agents");
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_AGENT_FAILURE', payload: {error: err}});
                showToast('error', `${err.response?.data.statusCode || ""}: ${err.response?.data.statusMessage || "Something went wrong while creating agent. Please try again later."}`);
                setSubmitting(false);
            });
    }
    return (
        <Layout location={location}>
            <Breadcrumbs className="w-full lg:px-3.5 px-1 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Agents',
                pathname: "/agents"}, {id: 2,title: 'Update Agent',
                pathname: match.path}]}/>
            <div className="py-9 xl:px-3.5 px-1">
                <AgentForm formFields={currentAgent} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateAgent;
