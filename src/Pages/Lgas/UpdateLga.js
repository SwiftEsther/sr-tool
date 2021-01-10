import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateLga, getLgaById} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import LgaForm from './components/LgaForm';
import { LgaContext } from '../../contexts/LgaContext';
import Loader from '../../shared/components/Loader';

const UpdateLga = ({match, location, history}) => {
    const {lga} = location.state;
    console.log(lga);
    const data = {
        state: lga.state.id,
        senatorialDistrict: lga.senatorialDistrict.id,
        name: lga.name,
        number: lga.code
    }
    const [lgaState, dispatch] = useContext(LgaContext);
    const [loading, setLoading] = useState(false);
    const [currentLga, setCurrentLga] = useState(data)
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_LGA'});
        const requestBody = {
            code: values.number,
            name: values.name,
            stateId: values.state,
            senatorialDistrictId: values.senatorialDistrict
        };
         setSubmitting(true);
         apiRequest(`${updateLga}/${match.params.id}`, 'put', {...requestBody})
            .then((res) => {
                dispatch({type: 'UPDATE_LGA_SUCCESS', payload: {response: res}});
                setSubmitting(false);
                history.push("/territories/lgas");
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_LGA_FAILURE', payload: {error: err}});
                showToast('error', `${err.response?.data.statusCode? err.response.data.statusCode : ""}: ${err.response?.data.statusMessage?err.response.data.statusMessage : "Something went wrong while updating lga. Please try again later."}`);
                setSubmitting(false);
            });
    }
    
    return (
        <Layout location={location}>
            <Breadcrumbs className="w-full lg:px-3.5 px-1 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'LGAs',
                pathname: "/territories/lgas"}, {id: 3,title: 'Update LGA',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                {loading ? 
                <Loader />
                :
                    <LgaForm formFields={currentLga} handleFormSubmit={handleUpdate}/>}
            </div>
        </Layout>
    );
}

export default UpdateLga;
