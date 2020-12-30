import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateAgent} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { LgaContext } from '../../contexts/LgaContext';
import AgentForm from './components/AgentForm';

const UpdateAgent = ({match, location}) => {
    console.log(location)
    const [lgaState, dispatch] = useContext(LgaContext);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_AGENT'});
         setSubmitting(true);
         apiRequest(updateAgent, 'put', {...values})
            .then((res) => {
                dispatch({type: 'UPDATE_AGENT_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_AGENT_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Agents',
                pathname: "/agents"}, {id: 2,title: 'Update Agent',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <AgentForm formFields={location.state.agent} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateAgent;
