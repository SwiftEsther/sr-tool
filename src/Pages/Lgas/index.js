import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import Layout from "../../shared/Layout";
import {allLgas, getLgaByCode} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import LgaList from "./LgaList";
import { LgaContext, LgaController } from "../../contexts/LgaContext";
import Uploader from "../../shared/components/Uploader";
import Downloader from "../../shared/components/Downloader";
import pickBy from 'lodash/pickBy'
import Pagination from "../../shared/components/Pagination";

const Lgas = ({match}) => {
    const [search, setSearch] = useState('');
    const [lgaState, dispatch] = useContext(LgaContext);
    const [filter, setFilter] = useState({senatorialDistrict: '', state: ''});
    const [districts, setDistricts] = useState([]);
    const [states, setStates] = useState([]);
    const [currentLgas, setCurrentLgas] = useState([]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const filterData = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFilter({...filter, [name]: value})
        let query = pickBy(filter);
        if(Object.keys(query).length) { dispatch({type: 'GET_LGAS'});
        //  setSubmitting(true);
         apiRequest(allLgas, 'get', {params: query})
            .then((res) => {
                dispatch({type: 'GET_LGAS_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_LGAS_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
        }
    }

    const handleSearch = () => {
        dispatch({type: 'GET_LGA_BY_CODE'});
        //  setSubmitting(true);
         apiRequest(getLgaByCode, 'get', {params: {code: search}})
            .then((res) => {
                dispatch({type: 'GET_LGA_BY_CODE_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_LGA_BY_CODE_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
    }

    const onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const lgas = lgaState.lgas.slice(offset, offset + pageLimit);
        setCurrentLgas(lgas);
        // this.setState({ currentPage, currentCountries, totalPages });
        console.log('Page changed',data)
    }

    useEffect(() => {
        dispatch({type: 'GET_LGAS'});
        //  setSubmitting(true);
         apiRequest(allLgas, 'get')
            .then((res) => {
                dispatch({type: 'GET_LGAS_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_LGAS_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
    }, []);

    return (
        <LgaController>
            <Layout>
                <Breadcrumbs className="shadow-container w-full px-3.5 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'Lgas',
                pathname: match.path}]}/>
                <div className="my-6 shadow-container pl-2.5 pr-7 py-6">
                    <div className="flex justify-between items-center px-1">
                        <div className="flex items-center md:w-3/10">
                            <select 
                                name="state" 
                                onChange={filterData}
                                onBlur={filterData}
                                value={filter.state}
                                className="w-full border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm mr-4"
                            >
                                <option value='' disabled>State</option>
                                {states.map(state => (<option key={state.id} value={state.code}>{state.name}</option>))}
                            </select>
                            <select 
                                name="senatorialDistrict" 
                                onChange={filterData}
                                onBlur={filterData}
                                value={filter.senatorialDistrict}
                                className="w-full border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                            >
                                <option value='' disabled>Senatorial District</option>
                                {districts.map(district => (<option key={district.id} value={district.code}>{district.name}</option>))}
                            </select>
                        </div>
                        <Link className="bg-primary py-4 px-16 text-white font-bold rounded-sm" to="/territories/lgas/create">
                            Add Lga
                        </Link>
                    </div>
                    <div className="w-full flex mt-16 items-center px-1">
                        <div className="w-1/2">
                            <input className="border border-primary rounded-sm w-9.5/10 py-3 px-2 focus:outline-none" name="search" type="text" value={search} onChange={handleChange} placeholder="Search lgas by code"/>
                        </div>
                        <div className="w-1/2">
                            <button disabled={search.length < 1} className="bg-primary button-padding py-3.5 text-white font-bold rounded-lg focus:outline-none" onClick={handleSearch}>
                                search
                            </button>
                        </div>
                    </div>
                    <LgaList lgas={lgaState.lgas}/>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex">
                            <Uploader dispatch={dispatch} action="GET_LGAS_SUCCESS"/>
                            {lgaState.lgas.length > 0 && <Downloader dispatch={dispatch} action="GET_LGAS_SUCCESS" />}
                        </div>
                        {lgaState.lgas.length > 0 && <div>
                            <Pagination totalRecords={lgaState.lgas.length} pageLimit={10} pageNeighbours={2} onPageChanged={onPageChanged} />
                        </div>}
                    </div>
                </div>
            </Layout>
        </LgaController>
    );
}

export default Lgas;
