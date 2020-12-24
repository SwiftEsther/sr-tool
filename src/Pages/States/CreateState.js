import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {states} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { StateContext } from '../../contexts/StateContext';
import StateForm from './components/Stateform';

const CreateState = ({match}) => {
    const [state, dispatch] = useContext(StateContext);
    const handleCreate = (values, {setSubmitting}) => {
        dispatch({type: 'CREATE_STATE'});
         setSubmitting(true);
         apiRequest(states, 'post', {...values})
            .then((res) => {
                dispatch({type: 'CREATE_STATE_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'CREATE_STATE_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'States',
                pathname: "/territories/states"}, {id: 3,title: 'New State',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <StateForm handleFormSubmit={handleCreate}/>
            </div>
        </Layout>
    );
}

export default CreateState;
