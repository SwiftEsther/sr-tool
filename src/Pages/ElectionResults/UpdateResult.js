import React, { useContext, useState } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateResult} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import ResultForm from './components/ResultForm';
import { ResultContext } from '../../contexts/ResultContext';

const UpdateResult = ({match, location, history}) => {
    const {result} = location.state;
    let data = {
        pollingUnit: result.pollingUnit.id,
        lga: result.lga.id,
        ward: result.ward.id,
        votingLevel: result.votingLevel.id,
        senatorialDistrict: result.senatorialDistrict.id,
        partyAgent: result.partyAgent.id,
        registeredVoters: result.registeredVotersCount,
        accreditedVoters: result.accreditedVotersCount,
        pdp: result.pdp || '',
        apc: result.apc || '',
        anpp: result.anpp || '',
        others: result.others || ''
    }
    const [resultState, dispatch] = useContext(ResultContext);
    const [currentResult, setCurrentResult] = useState(data);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_RESULT'});
        const requestBody = {
            electionId:1,
            votingLevelId: values.votingLevel,
            partyAgentId: values.partyAgent,
            lgaId: values.lga,
            wardId: values.ward,
            pollingUnitId: values.pollingUnit,
            accreditedVotersCount: values.accreditedVoters,
            registeredVotersCount: values.registeredVoters,
            senatorialDistrictId: values.senatorialDistrict
        }
         setSubmitting(true);
         apiRequest(`${updateResult}/${match.params.id}`, 'put', {...requestBody})
            .then((res) => {
                dispatch({type: 'UPDATE_RESULT_SUCCESS', payload: {response: res}});
                setSubmitting(false);
                history.push("/results");
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_RESULT_FAILURE', payload: {error: err}});
                setSubmitting(false);
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Couldn't fetch states. Please try again later."}`)
            });
    }
    return (
        <Layout location={location}>
            <Breadcrumbs className="w-full lg:px-3.5 px-1 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Results',
                pathname: "/results"}, {id: 2,title: 'Update Result',
                pathname: match.path}]}/>
            <div className="py-9 xl:px-3.5 px-1">
                <ResultForm formFields={currentResult} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateResult;
