import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateResult} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { IncidentContext } from '../../contexts/IncidentContext';
import IncidentForm from './components/IncidentForm';

const UpdateIncident = ({match, location}) => {
    console.log(location)
    const [incidentState, dispatch] = useContext(IncidentContext);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_INCIDENT'});
         setSubmitting(true);
         apiRequest(updateResult, 'put', {...values})
            .then((res) => {
                dispatch({type: 'UPDATE_INCIDENT_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_INCIDENT_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout location={location}>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Incidents',
                pathname: "/incidents"}, {id: 2,title: 'Update Incident',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <IncidentForm formFields={location.state.result} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateIncident;
