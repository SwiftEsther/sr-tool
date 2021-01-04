import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs, Breadcrumb } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import { StateContext, StateController } from "../../contexts/StateContext";
import Layout from "../../shared/Layout";
import StateList from "./StateList";
import {allStates, filterStateByName, getLgasByStateId} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import Pagination from "../../shared/components/Pagination";

const States = ({match, location}) => {
    const [search, setSearch] = useState('');
    const [state, dispatch] = useContext(StateContext);
    const [currentStates, setCurrentStates] = useState([]);

    const handleChange = (event) => {
        setSearch(event.target.value);
        console.log(event.target.value)
    }

    const handleSearch = () => {
        dispatch({type: 'SEARCH_STATE_BY_NAME'});
         apiRequest(filterStateByName, 'get', {params: {name: search}})
            .then((res) => {
                dispatch({type: 'SEARCH_STATE_BY_NAME_SUCCESS', payload: {response: res}});
                setCurrentStates([res.state]);
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'SEARCH_STATE_BY_NAME_FAILURE', payload: {error: err}});
                showToast('error', `${err.response?.data.statusCode? err.response?.data.statusCode : ""}: ${err.response?.data.statusMessage?err.response.data.statusMessage : "Something went wrong. Please try again later."}`);
            });
    }

    const onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const states = state.response.states.slice(offset, offset + pageLimit);
        setCurrentStates(states);
        // this.setState({ currentPage, currentCountries, totalPages });
        console.log('Page changed',data)
    }
    
    const getLgas = async (stateId) => {
        let count = 0;
        await apiRequest(`${getLgasByStateId}/${stateId}`, 'get')
            .then(res => {
                count = res.count;
            })
            .catch(err => {
                showToast('error', `${err.response?.data.statusCode? err.response.data.statusCode : ""}: ${err.response?.data.statusMessage?err.response.data.statusMessage : "Couldn't fetch lgas. Please try again later."}`)
            })
        return count;
    }

    const getAllStates = () => {
        dispatch({type: 'GET_STATES'});
         apiRequest(allStates, 'get')
            .then(async (res) => {
                for(let i = 0; i < res.count; 
                    ++i)  {
                    const lgaCount = await getLgas(res.states[i].id);
                    console.log(lgaCount)
                    res.states[i] = {...res.states[i], lgas: lgaCount || 0}
                }
                    dispatch({type: 'GET_STATES_SUCCESS', payload: {response: res}});
                setCurrentStates(res.states.slice(0, 11));
                showToast('success', `${res.statusCode}: ${res.statusMessage}`)
            })
            .catch((err) => {
                dispatch({type: 'GET_STATES_FAILURE', payload: {error: err}});
                showToast('error', `${err.response?.data.statusCode? err.response.data.statusCode : "Error"}: ${err.response?.data.statusMessage? err.response.data.statusMessage : "Something went wrong. Please try again later."}`);
            });
    }

    useEffect(() => {
        getAllStates();
    }, []);

    return (
        <StateController>
            <Layout location={location}>
                <Breadcrumbs className="shadow-container w-full px-3.5 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'States',
                pathname: match.path}]}/>
                <div className="my-6 shadow-container pl-2.5 pr-7 py-6">
                    <div className="flex justify-between px-1 mt-16">
                        <div className="w-8/10 flex items-center px-1">
                            <div className="w-7/10">
                                <input className="border border-primary rounded-sm w-9.5/10 py-3 px-2 focus:outline-none" name="search" type="text" value={search} onChange={handleChange} placeholder="Search states by name"/>
                            </div>
                            <div className="w-3/10">
                                <button disabled={search.length < 1} className="bg-primary button-padding py-3.5 text-white font-bold rounded-lg focus:outline-none" onClick={handleSearch}>
                                    search
                                </button>
                            </div>
                        </div>
                        <Link className="bg-primary py-4 px-16 text-white font-bold rounded-sm" to="/territories/states/create">
                            Add State
                        </Link>
                    </div>
                    <StateList states={currentStates} loading={state.loading} getStates={getAllStates}/>
                    {!state.loading && <div className="flex justify-end items-center mt-4">
                            {state.response?.states?.length > 0 && <div>
                                <Pagination totalRecords={state.response?.states?.length} pageLimit={10} pageNeighbours={2} onPageChanged={onPageChanged} />
                            </div>}
                        </div>}
                </div>
            </Layout>
        </StateController>
    );
}

export default States;
