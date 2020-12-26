import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {createWard} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import WardForm from './components/WardForm';
import { WardContext } from '../../contexts/WardContext';

const CreateWard = ({match}) => {
    const [wardState, dispatch] = useContext(WardContext);
    const handleCreate = (values, {setSubmitting}) => {
        dispatch({type: 'CREATE_WARD'});
         setSubmitting(true);
         apiRequest(createWard, 'post', {...values})
            .then((res) => {
                dispatch({type: 'CREATE_WARD_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'CREATE_WARD_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'Wards',
                pathname: "/territories/wards"}, {id: 3,title: 'Add Ward',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <WardForm handleFormSubmit={handleCreate}/>
            </div>
        </Layout>
    );
}

export default CreateWard;
