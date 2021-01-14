import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import Layout from "../../shared/Layout";
import {allResults, uploadResult} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import Uploader from "../../shared/components/Uploader";
import Downloader from "../../shared/components/Downloader";
import pickBy from 'lodash/pickBy';
import Pagination from "../../shared/components/Pagination";
import { ResultContext } from "../../contexts/ResultContext";
import ResultList from "./ResultList";

const Results = ({match, location}) => {
    const [search, setSearch] = useState('');
    const [resultState, dispatch] = useContext(ResultContext);
    const [filter, setFilter] = useState({lga: '', ward: '', pollingUnit: ''});
    const [lgas, setLgas] = useState([]);
    const [wards, setWards] = useState([]);
    const [pollingUnits, setPollingUnits] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentResults, setCurrentResults] = useState([]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const filterData = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFilter({...filter, [name]: value})
        let query = pickBy(filter);
        if(Object.keys(query).length) { dispatch({type: 'GET_RESULTS'});
        //  setSubmitting(true);
         apiRequest(allResults, 'get', {params: query})
            .then((res) => {
                dispatch({type: 'GET_RESULTS_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_RESULTS_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
        }
    }

    const handleSearch = () => {
        dispatch({type: 'SEARCH_RESULT_BY_NAME'});
        //  setSubmitting(true);
         apiRequest(allResults, 'get', {params: {code: search}})
            .then((res) => {
                dispatch({type: 'SEARCH_RESULT_BY_NAME_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'SEARCH_RESULT_BY_NAME_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
    }

    const onPageChanged = data => {
        // const { allCountries } = this.state;
        // const { currentPage, totalPages, pageLimit } = data;
        // const offset = (currentPage - 1) * pageLimit;
        // const currentCountries = allCountries.slice(offset, offset + pageLimit);

        // this.setState({ currentPage, currentCountries, totalPages });
        console.log('Page changed',data)
    }
    
    const getAllResults = () => {
        dispatch({type: 'GET_RESULTS'});
         apiRequest(allResults, 'get')
            .then((res) => {
                dispatch({type: 'GET_RESULTS_SUCCESS', payload: {response: res}});
                setCurrentResults(res.results.slice(0, 11));
                showToast('success', `${res.statusCode}: ${res.statusMessage}`)
            })
            .catch((err) => {
                dispatch({type: 'GET_RESULTS_FAILURE', payload: {error: err}});
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            });
    }

    useEffect(() => {
        getAllResults();
    }, []);

    return (
        <Layout location={location}>
            <Breadcrumbs className="shadow-container w-full lg:px-3.5 px-1 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Results',
            pathname: match.path}]}/>
            <div className="my-6 shadow-container pl-2.5 lg:pr-7 pr-2.5 py-6">
                <div className="lg:flex justify-between items-center px-1">
                    <div className="xl:w-4/10 lg:w-6/10 flex items-center px-1 w-full">
                        <select 
                            name="lga" 
                            onChange={filterData}
                            onBlur={filterData}
                            value={filter.lga}
                            className="w-full border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                        >
                            <option value='' disabled>All Lgas</option>
                            {lgas.map(lga => (<option key={lga.id} value={lga.code}>{lga.name}</option>))}
                        </select>
                        <select 
                            name="ward" 
                            onChange={filterData}
                            onBlur={filterData}
                            value={filter.ward}
                            className="w-full border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm mx-4"
                        >
                            <option value='' disabled>All Wards</option>
                            {wards.map(ward => (<option key={ward.id} value={ward.code}>{ward.name}</option>))}
                        </select>
                        <select 
                            name="pollingUnit" 
                            onChange={filterData}
                            onBlur={filterData}
                            value={filter.pollingUnit}
                            className="w-full border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                        >
                            <option value='' disabled>All Polling Units</option>
                            {pollingUnits.map(pollingUnit => (<option key={pollingUnit.id} value={pollingUnit.code}>{pollingUnit.name}</option>))}
                        </select>
                    </div>
                    <div className="xl:w-2/10 lg:w-3/10 flex items-center lg:justify-end px-1 w-full lg:mt-0 mt-4">
                    <Link className="bg-primary py-4 px-16 text-white font-bold rounded-sm" to="/results/create">
                        Add Result
                    </Link>
                    </div>
                </div>
                <div className="w-full flex mt-16 items-center px-1">
                    <div className="w-1/2">
                        <input className="border border-primary rounded-sm w-9.5/10 py-3 px-2 focus:outline-none" name="search" type="text" value={search} onChange={handleChange} placeholder="Search results by name"/>
                    </div>
                    <div className="w-1/2">
                        <button disabled={search.length < 1} className="bg-primary button-padding py-3.5 text-white font-bold rounded-lg focus:outline-none" onClick={handleSearch}>
                            search
                        </button>
                    </div>
                </div>
                <ResultList results={currentResults} loading={resultState.loading} getResults={getAllResults}/>
                {!resultState.loading && <div className="flex justify-between items-center mt-4">
                    <div className="flex">
                        <Uploader dispatch={dispatch} action="UPLOAD_RESULT" action_success="UPLOAD_RESULT_SUCCESS" action_error="UPLOAD_RESULT_FAILURE" url={uploadResult} refresh={getAllResults}/>
                        {resultState.response?.results?.length > 0 && <Downloader dispatch={dispatch} action="DOWNLOAD_RESULT_SUCCESS" />}
                    </div>
                    {resultState.results.length > 0 && <div>
                        <Pagination totalRecords={resultState.results.length} pageLimit={10} pageNeighbours={2} onPageChanged={onPageChanged} />
                    </div>}
                </div>}
            </div>
        </Layout>
    );
}

export default Results;
