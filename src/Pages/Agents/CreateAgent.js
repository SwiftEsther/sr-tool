import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {createAgent} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { AgentContext } from '../../contexts/AgentContext';
import AgentForm from './components/AgentForm';

const CreateAgent = ({match}) => {
    const [agentState, dispatch] = useContext(AgentContext);
    const handleCreate = (values, {setSubmitting}) => {
        dispatch({type: 'CREATE_AGENT'});
         setSubmitting(true);
         apiRequest(createAgent, 'post', {...values})
            .then((res) => {
                dispatch({type: 'CREATE_AGENTA_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'CREATE_AGENT_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Agents',
                pathname: "/agents"}, {id: 2,title: 'Add Agent',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <AgentForm handleFormSubmit={handleCreate}/>
            </div>
        </Layout>
    );
}

export default CreateAgent;
