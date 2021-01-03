import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateWard} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { WardContext } from '../../contexts/WardContext';
import WardForm from './components/WardForm';

const UpdateWard = ({match, location}) => {
    console.log(location)
    const [wardState, dispatch] = useContext(WardContext);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_WARD'});
         setSubmitting(true);
         apiRequest(updateWard, 'put', {...values})
            .then((res) => {
                dispatch({type: 'UPDATE_WARD_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_WARD_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout location={location}>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'Wards',
                pathname: "/territories/wards"}, {id: 3,title: 'Update Ward',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <WardForm formFields={location.state.ward} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateWard;
