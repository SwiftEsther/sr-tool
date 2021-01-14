import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {createResult} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { ResultContext } from '../../contexts/ResultContext';
import ResultForm from './components/ResultForm';

const CreateResult = ({match, location, history}) => {
    const [resultState, dispatch] = useContext(ResultContext);
    const handleCreate = (values, {setSubmitting}) => {
        console.log(values)
        const requestBody = {
            electionId:1,
            votingLevelId: values.votingLevel,
            partyAgentId: values.partyAgent,
            lgaId: values.lga,
            wardId: values.ward,
            pollingUnitId: values.pollingUnit,
            accreditedVotersCount: values.accreditedVoters,
            registeredVotersCount: values.registeredVoters,
            senatorialDistrictId: values.senatorialDistrict,
            pdp: values.pdp,
            apc: values.apc,
            anpp: values.anpp,
            others: values.others
        }
        dispatch({type: 'CREATE_RESULT'});
         setSubmitting(true);
         apiRequest(createResult, 'post', {...requestBody})
            .then((res) => {
                dispatch({type: 'CREATE_RESULT_SUCCESS', payload: {response: res}});
                setSubmitting(false);
                history.push("/results");
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'CREATE_RESULT_FAILURE', payload: {error: err}});
                setSubmitting(false);
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Couldn't fetch states. Please try again later."}`)
            });
    }
    return (
        <Layout location={location}>
            <Breadcrumbs className="shadow-container w-full lg:px-3.5 px-1 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Results',
                pathname: "/results"}, {id: 2,title: 'Add Result',
                pathname: match.path}]}/>
            <div className="py-9 xl:px-3.5 px-1">
                <ResultForm handleFormSubmit={handleCreate}/>
            </div>
        </Layout>
    );
}

export default CreateResult;
