import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateLga} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { UserContext } from '../../contexts/UserContext';
import LgaForm from './components/LgaForm';

const UpdateLga = ({match, location}) => {
    console.log(location)
    const [userState, dispatch] = useContext(UserContext);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_LGA'});
         setSubmitting(true);
         apiRequest(updateLga, 'put', {...values})
            .then((res) => {
                dispatch({type: 'UPDATE_LGA_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_LGA_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'LGAs',
                pathname: "/territories/states"}, {id: 3,title: 'Update LGA',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <LgaForm formFields={location.state.lga} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateLga;
