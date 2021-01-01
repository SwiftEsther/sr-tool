import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {createResult} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { IncidentContext } from '../../contexts/IncidentContext';
import IncidentForm from './components/IncidentForm';

const CreateIncident = ({match}) => {
    const [incidentState, dispatch] = useContext(IncidentContext);
    const handleCreate = (values, {setSubmitting}) => {
        console.log(values)
        const requestBody = {
            firstname:values.first_name,
            lastname: values.last_name,
            phone: values.phoneNumber,
            // email: values.email,
            // address: values.address,
            lgaId: values.lga.id,
            wardId: values.ward.id,
            pollingUnitId: values.pollingUnit.id,
            // politicalPartyId: values.party.id
        }
        dispatch({type: 'CREATE_INCIDENT'});
         setSubmitting(true);
         apiRequest(createResult, 'post', {...requestBody})
            .then((res) => {
                dispatch({type: 'CREATE_INCIDENT_SUCCESS', payload: {response: res}});
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'CREATE_INCIDENT_FAILURE', payload: {error: err}});
                showToast('error', `${err.response.data.statusCode? err.response.data.statusCode : ""}: ${err.response.data.statusMessage?err.response.data.statusMessage : "Something went wrong while creating agent. Please try again later."}`);
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="shadow-container w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Incidents',
                pathname: "/incidents"}, {id: 2,title: 'Add Incident',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <IncidentForm handleFormSubmit={handleCreate}/>
            </div>
        </Layout>
    );
}

export default CreateIncident;
