import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {createLga} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { LgaContext } from '../../contexts/LgaContext';
import LgaForm from './components/LgaForm';

const CreateLga = ({match, history}) => {
    const [lgaState, dispatch] = useContext(LgaContext);
    const handleCreate = (values, {setSubmitting}) => {
        dispatch({type: 'CREATE_LGA'});
        const requestBody = {
            code: values.name,
            name: values.name,
            stateId: values.state,
            senatorialDistrictId: values.senatorialDistrict
        };
         setSubmitting(true);
         apiRequest(createLga, 'post', {...requestBody})
            .then((res) => {
                dispatch({type: 'CREATE_LGA_SUCCESS', payload: {response: res}});
                setSubmitting(false);
                history.push("/territories/lgas");
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'CREATE_LGA_FAILURE', payload: {error: err}});
                showToast('error', `${err.response.data.statusCode? err.response.data.statusCode : ""}: ${err.response.data.statusMessage?err.response.data.statusMessage : "Something went wrong while creating lga. Please try again later."}`);
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'LGAs',
                pathname: "/territories/lgas"}, {id: 3,title: 'Add LGA',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <LgaForm handleFormSubmit={handleCreate}/>
            </div>
        </Layout>
    );
}

export default CreateLga;
