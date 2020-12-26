import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import Layout from "../../shared/Layout";
import {allWards, getWardByCode} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import Uploader from "../../shared/components/Uploader";
import Downloader from "../../shared/components/Downloader";
import pickBy from 'lodash/pickBy'
import { WardContext } from "../../contexts/WardContext";
import WardList from "./WardList";

const Wards = ({match}) => {
    const [search, setSearch] = useState('');
    const [wardState, dispatch] = useContext(WardContext);
    const [filter, setFilter] = useState({senatorialDistrict: '', state: '', lga: ''});
    const [districts, setDistricts] = useState([]);
    const [states, setStates] = useState([]);
    const [lgas, setLgas] = useState([]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const filterData = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFilter({...filter, [name]: value})
        let query = pickBy(filter);
        if(Object.keys(query).length) { dispatch({type: 'GET_WARDS'});
        //  setSubmitting(true);
         apiRequest(allWards, 'get', {params: query})
            .then((res) => {
                dispatch({type: 'GET_WARDS_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_WARDS_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
        }
    }

    const handleSearch = () => {
        dispatch({type: 'GET_WARD_BY_CODE'});
        //  setSubmitting(true);
         apiRequest(getWardByCode, 'get', {params: {code: search}})
            .then((res) => {
                dispatch({type: 'GET_WARD_BY_CODE_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_WARD_BY_CODE_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
    }

    useEffect(() => {
        dispatch({type: 'GET_WARDS'});
        //  setSubmitting(true);
         apiRequest(allWards, 'get')
            .then((res) => {
                dispatch({type: 'GET_WARDS_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_WARDS_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
    }, []);

    return (
        <Layout>
            <Breadcrumbs className="shadow-container w-full px-3.5 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
            pathname: "/territories"}, {id: 2,title: 'Wards',
            pathname: match.path}]}/>
            <div className="my-6 shadow-container pl-2.5 pr-7 py-6">
                <div className="flex justify-between items-center px-1">
                    <div className="flex items-center md:w-4/10">
                        <select 
                            name="state" 
                            onChange={filterData}
                            onBlur={filterData}
                            value={filter.state}
                            className="w-full border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                        >
                            <option value='' disabled>State</option>
                            {states.map(state => (<option key={state.id} value={state.code}>{state.name}</option>))}
                        </select>
                        <select 
                            name="senatorialDistrict" 
                            onChange={filterData}
                            onBlur={filterData}
                            value={filter.senatorialDistrict}
                            className="w-full border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm mx-4"
                        >
                            <option value='' disabled>Senatorial District</option>
                            {districts.map(district => (<option key={district.id} value={district.code}>{district.name}</option>))}
                        </select>
                        <select 
                            name="lga" 
                            onChange={filterData}
                            onBlur={filterData}
                            value={filter.lga}
                            className="w-full border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                        >
                            <option value='' disabled>LGA</option>
                            {lgas.map(lga => (<option key={lga.id} value={lga.code}>{lga.name}</option>))}
                        </select>
                    </div>
                    <Link className="bg-primary py-4 px-16 text-white font-bold rounded-sm" to="/territories/wards/create">
                        Add Ward
                    </Link>
                </div>
                <div className="w-full flex mt-16 items-center px-1">
                    <div className="w-1/2">
                        <input className="border border-primary rounded-sm w-9.5/10 py-3 px-2 focus:outline-none" name="search" type="text" value={search} onChange={handleChange} placeholder="Search wards by code"/>
                    </div>
                    <div className="w-1/2">
                        <button disabled={search.length < 1} className="bg-primary button-padding py-3.5 text-white font-bold rounded-lg focus:outline-none" onClick={handleSearch}>
                            search
                        </button>
                    </div>
                </div>
                <WardList wards={wardState.wards}/>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex">
                        <Uploader dispatch={dispatch} action="GET_WARDS_SUCCESS"/>
                        {wardState.wards.length > 0 && <Downloader dispatch={dispatch} action="GET_WARDS_SUCCESS" />}
                    </div>
                    {wardState.wards.length > 0 && <div>
                        Pagination
                    </div>}
                </div>
            </div>
        </Layout>
    );
}

export default Wards;
