import React, { useContext, useState } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateParty} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { PartyContext } from '../../contexts/PartyContext';
import PartyForm from './components/Partyform';

const UpdateParty = ({match, location, history}) => {
    console.log(location)
    const [partyState, dispatch] = useContext(PartyContext);
    const [party, setParty] = useState(location.state?.party);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_PARTY'});
         setSubmitting(true);
         apiRequest(`${updateParty}/${party.id}`, 'put', {...values})
            .then((res) => {
                dispatch({type: 'UPDATE_PARTY_SUCCESS', payload: {response: res}});
                setSubmitting(false);
                history.push("/parties");
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);;
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_PARTY_FAILURE', payload: {error: err}});
                showToast('error', `${err.response.data.statusCode? err.response.data.statusCode : ""}: ${err.response.data.statusMessage?err.response.data.statusMessage : "Something went wrong while updating party. Please try again later."}`);
                setSubmitting(false);
            });
    }
    return (
        <Layout location={location}>
            <Breadcrumbs className="w-full lg:px-3.5 px-1 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Parties',
                pathname: "/parties"}, {id: 2,title: 'Update Party',
                pathname: match.path}]}/>
            <div className="py-9 xl:px-3.5 px-1">
                <PartyForm formFields={party} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateParty;
