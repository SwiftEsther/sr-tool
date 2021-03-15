import React, { useContext, useState } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateResult} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { IncidentContext } from '../../contexts/IncidentContext';
import IncidentForm from './components/IncidentForm';
import { values } from 'lodash';

const UpdateIncident = ({match, location, history}) => {
    const {incident} = location.state;
    let data = {
        pollingUnit: incident.pollingUnit.id,
        lga: incident.lga.id,
        ward: incident.ward.id,
        incidentLevel: incident.incidentLevel.id,
        incidentType: incident.incidentType.id,
        incidentStatus: incident.incidentStatus.id,
        location: incident.reportedLocation,
        phoneNumber: incident.phoneNumberToContact,
        description: incident.description
    };
    const [incidentState, dispatch] = useContext(IncidentContext);
    const [currentIncident, setCurrentIncident] = useState(data);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_INCIDENT'});
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
         setSubmitting(true);
         apiRequest(updateResult, 'put', {...requestBody})
            .then((res) => {
                dispatch({type: 'UPDATE_INCIDENT_SUCCESS', payload: {response: res}});
                setSubmitting(false);
                history.push("/incidents");
                // showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_INCIDENT_FAILURE', payload: {error: err}});
                setSubmitting(false);
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            });
    }
    return (
        <Layout location={location}>
            <Breadcrumbs className="w-full lg:px-3.5 px-1 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Incidents',
                pathname: "/incidents"}, {id: 2,title: 'Update Incident',
                pathname: match.path}]}/>
            <div className="py-9 xl:px-3.5 px-1">
                <IncidentForm formFields={currentIncident} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateIncident;
