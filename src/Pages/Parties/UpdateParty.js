import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateParty} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { PartyContext } from '../../contexts/PartyContext';
import PartyForm from './components/Partyform';

const UpdateParty = ({match, location}) => {
    console.log(location)
    const [partyState, dispatch] = useContext(PartyContext);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_PARTY'});
         setSubmitting(true);
         apiRequest(updateParty, 'put', {...values})
            .then((res) => {
                dispatch({type: 'UPDATE_PARTY_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_PARTY_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Parties',
                pathname: "/parties"}, {id: 2,title: 'Update Party',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <PartyForm handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateParty;
