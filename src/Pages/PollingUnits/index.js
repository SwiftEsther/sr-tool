import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import Layout from "../../shared/Layout";
import {allPollingUnits, getPollingUnitByCode, filterPollingUnitByName} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import Uploader from "../../shared/components/Uploader";
import Downloader from "../../shared/components/Downloader";
import pickBy from 'lodash/pickBy'
import WardList from "./PollingUnitList";
import { PUContext } from "../../contexts/PollingUnitContext";
import Pagination from "../../shared/components/Pagination";

const PollingUnits = ({match, location}) => {
    const [search, setSearch] = useState('');
    const [puState, dispatch] = useContext(PUContext);
    const [filter, setFilter] = useState({senatorialDistrict: '', state: '', lga: ''});
    const [districts, setDistricts] = useState([]);
    const [states, setStates] = useState([]);
    const [lgas, setLgas] = useState([]);
    const [currentPollingUnits, setCurrentPollingUnits] = useState([]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const filterData = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFilter({...filter, [name]: value})
        let query = pickBy(filter);
        if(Object.keys(query).length) { dispatch({type: 'GET_POLLING_UNITS'});
        //  setSubmitting(true);
         apiRequest(allPollingUnits, 'get', {params: query})
            .then((res) => {
                dispatch({type: 'GET_POLLING_UNITS_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_POLLING_UNITS_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
        }
    }

    const handleSearch = () => {
        dispatch({type: 'SEARCH_POLLING_UNIT_BY_NAME'});
         apiRequest(filterPollingUnitByName, 'get', {params: {name: search}})
            .then((res) => {
                dispatch({type: 'SEARCH_POLLING_UNIT_BY_NAME_SUCCESS', payload: {response: res}});
                setCurrentPollingUnits(res.pollingUnits.slice(0, 11));
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'SEARCH_POLLING_UNIT_BY_NAME_FAILURE', payload: {error: err}});
                showToast('error', `${err.response.data.statusCode? err.response.data.statusCode : ""}: ${err.response.data.statusMessage?err.response.data.statusMessage : "Something went wrong. Please try again later."}`);
            });
    }

    const onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const units = puState.pollingUnits.slice(offset, offset + pageLimit);
        setCurrentPollingUnits(units);
        // this.setState({ currentPage, currentCountries, totalPages });
        console.log('Page changed',data)
    }

    const getAllPollingUnits = () => {
        dispatch({type: 'GET_POLLING_UNITS'});
         apiRequest(allPollingUnits, 'get')
            .then((res) => {
                dispatch({type: 'GET_POLLING_UNITS_SUCCESS', payload: {response: res}});
                setCurrentPollingUnits(res.pollingUnits.slice(0, 11));
                showToast('success', `${res.statusCode}: ${res.statusMessage}`)
            })
            .catch((err) => {
                dispatch({type: 'GET_POLLING_UNITS_FAILURE', payload: {error: err}});
                showToast('error', `${err.response.data.statusCode? err.response.data.statusCode : ""}: ${err.response.data.statusMessage?err.response.data.statusMessage : "Something went wrong. Please try again later."}`);
            });
    }

    useEffect(() => {
        getAllPollingUnits();
    }, []);

    return (
        <Layout location={location}>
            <Breadcrumbs className="shadow-container w-full px-3.5 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
            pathname: "/territories"}, {id: 2,title: 'Polling Units',
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
                    <Link className="bg-primary py-4 px-16 text-white font-bold rounded-sm" to="/territories/polling-units/create">
                        Add Polling Unit
                    </Link>
                </div>
                <div className="w-full flex mt-16 items-center px-1">
                    <div className="w-1/2">
                        <input className="border border-primary rounded-sm w-9.5/10 py-3 px-2 focus:outline-none" name="search" type="text" value={search} onChange={handleChange} placeholder="Search polling units by name"/>
                    </div>
                    <div className="w-1/2">
                        <button disabled={search.length < 1} className="bg-primary button-padding py-3.5 text-white font-bold rounded-lg focus:outline-none" onClick={handleSearch}>
                            search
                        </button>
                    </div>
                </div>
                <WardList pollingUnits={currentPollingUnits} loading={puState.loading} getPollingUnits={getAllPollingUnits}/>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex">
                        <Uploader dispatch={dispatch} action="UPLOAD_POLLING_UNITS_SUCCESS"/>
                        {puState.pollingUnits.length > 0 && <Downloader dispatch={dispatch} action="UPLOAD_POLLING_UNITS_SUCCESS" />}
                    </div>
                    {puState.response?.pollingUnits?.length > 0 && <div>
                        <Pagination totalRecords={puState.response?.pollingUnits?.length} pageLimit={10} pageNeighbours={2} onPageChanged={onPageChanged} />
                    </div>}
                </div>
            </div>
        </Layout>
    );
}

export default PollingUnits;
