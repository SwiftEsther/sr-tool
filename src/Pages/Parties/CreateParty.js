import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import { UserContext, UserController } from '../../contexts/UserContext';
import Layout from '../../shared/Layout';
import {createParty} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import PartyForm from './components/Partyform';

const CreateParty = ({match, history}) => {
    const [userState, dispatch] = useContext(UserContext);
    const handleCreate = (values, {setSubmitting}) => {
        dispatch({type: 'CREATE_PARTY'});
         setSubmitting(true);
         apiRequest(createParty, 'post', {...values})
            .then((res) => {
                dispatch({type: 'CREATE_PARTY_SUCCESS', payload: {response: res}});
                setSubmitting(false);
                history.push("/parties");
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'CREATE_PARTY_FAILURE', payload: {error: err}});
                showToast('error', `${err.response.data.statusCode? err.response.data.statusCode : ""}: ${err.response.data.statusMessage?err.response.data.statusMessage : "Something went wrong while creating party. Please try again later."}`);
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Parties',
                pathname: "/parties"}, {id: 2,title: 'Add Party',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <PartyForm handleFormSubmit={handleCreate}/>
            </div>
        </Layout>
    );
}

export default CreateParty;
