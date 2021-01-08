import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {createIncident} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { IncidentContext } from '../../contexts/IncidentContext';
import IncidentForm from './components/IncidentForm';

const CreateIncident = ({match, location, history}) => {
    const [incidentState, dispatch] = useContext(IncidentContext);
    const handleCreate = (values, {setSubmitting}) => {
        console.log(values)
        const requestBody = {
            incidentLevelId: values.incidentLevel,
            incidentTypeId: values.incidentType,
            incidentStatusId: values.incidentStatus,
            lgaId: values.lga,
            wardId: values.ward,
            pollingUnitId: values.pollingUnit,
            reportedLocation: values.location,
            phoneNumberToContact: values.phoneNumber,
            description: values.description
        }
        dispatch({type: 'CREATE_INCIDENT'});
         setSubmitting(true);
         apiRequest(createIncident, 'post', {...requestBody})
            .then((res) => {
                dispatch({type: 'CREATE_INCIDENT_SUCCESS', payload: {response: res}});
                setSubmitting(false);
                history.push("/incidents");
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'CREATE_INCIDENT_FAILURE', payload: {error: err}});
                showToast('error', `${err.response?.data.statusCode || "Error"}: ${err.response?.data.statusMessage || "Something went wrong while creating agent. Please try again later."}`);
                setSubmitting(false);
            });
    }
    return (
        <Layout location={location}>
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
