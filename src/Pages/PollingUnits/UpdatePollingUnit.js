import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updatePollingUnit} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import PollingUnitForm from './components/PollingUnitForm';
import { PUContext } from '../../contexts/PollingUnitContext';

const UpdatePollingUnit = ({match, location}) => {
    console.log(location)
    const [puState, dispatch] = useContext(PUContext);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_POLLING_UNIT'});
         setSubmitting(true);
         apiRequest(updatePollingUnit, 'put', {...values})
            .then((res) => {
                dispatch({type: 'UPDATE_POLLING_UNIT_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_POLLING_UNIT_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'Polling Units',
                pathname: "/territories/polling-units"}, {id: 3,title: 'Update Polling Unit',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <PollingUnitForm formFields={location.state.pollingUnit} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdatePollingUnit;
