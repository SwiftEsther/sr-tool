import React, { useContext, useState } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateWard} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { WardContext } from '../../contexts/WardContext';
import WardForm from './components/WardForm';

const UpdateWard = ({match, location, history}) => {
    const {ward} = location.state;
    console.log(ward)
    let data = {
        state: ward.state.id,
        senatorialDistrict: ward.senatorialDistrict.id,
        name: ward.name,
        number: ward.code,
        lga: ward.lga.id
    }
    const [wardState, dispatch] = useContext(WardContext);
    const [currentWard, setCurrentWard] = useState(data);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_WARD'});
        const requestBody = {
            code: values.number,
            name: values.name,
            stateId: values.state,
            senatorialDistrictId: values.senatorialDistrict,
            lgaId: values.lga
        };
         setSubmitting(true);
         apiRequest(`${updateWard}/${match.params.id}`, 'put', {...requestBody})
            .then((res) => {
                dispatch({type: 'UPDATE_WARD_SUCCESS', payload: {response: res}});
                setSubmitting(false);
                history.push("/territories/wards");
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_WARD_FAILURE', payload: {error: err}});
                showToast('error', `${err.response?.data.statusCode || ""}: ${err.response?.data.statusMessage || "Something went wrong while updating lga. Please try again later."}`);
                setSubmitting(false);
            });
    }
    return (
        <Layout location={location}>
            <Breadcrumbs className="w-full lg:px-3.5 px-1 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'Wards',
                pathname: "/territories/wards"}, {id: 3,title: 'Update Ward',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <WardForm formFields={currentWard} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateWard;
