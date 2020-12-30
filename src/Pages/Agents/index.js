import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import Layout from "../../shared/Layout";
import {allAgents, searchAgentByName} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import Uploader from "../../shared/components/Uploader";
import Downloader from "../../shared/components/Downloader";
import pickBy from 'lodash/pickBy'
import { AgentContext } from "../../contexts/AgentContext";
import AgentList from "./AgentList";

const Agents = ({match}) => {
    const [search, setSearch] = useState('');
    const [agentState, dispatch] = useContext(AgentContext);
    const [filter, setFilter] = useState({lga: '', ward: '', pollingUnit: ''});
    const [lgas, setLgas] = useState([]);
    const [wards, setWards] = useState([]);
    const [pollingUnits, setPollingUnits] = useState([]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const filterData = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFilter({...filter, [name]: value})
        let query = pickBy(filter);
        if(Object.keys(query).length) { dispatch({type: 'GET_AGENTS'});
        //  setSubmitting(true);
         apiRequest(allAgents, 'get', {params: query})
            .then((res) => {
                dispatch({type: 'GET_AGENTS_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_AGENTS_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
        }
    }

    const handleSearch = () => {
        dispatch({type: 'SEARCH_AGENT_BY_NAME'});
        //  setSubmitting(true);
         apiRequest(searchAgentByName, 'get', {params: {code: search}})
            .then((res) => {
                dispatch({type: 'SEARCH_AGENT_BY_NAME_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'SEARCH_AGENT_BY_NAME_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
    }

    useEffect(() => {
        dispatch({type: 'GET_AGENTS'});
        //  setSubmitting(true);
         apiRequest(allAgents, 'get')
            .then((res) => {
                dispatch({type: 'GET_AGENTS_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_AGENTS_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
    }, []);

    return (
        <Layout>
            <Breadcrumbs className="shadow-container w-full px-3.5 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Agents',
            pathname: match.path}]}/>
            <div className="my-6 shadow-container pl-2.5 pr-7 py-6">
                <div className="flex justify-between items-center px-1">
                    <div className="flex items-center md:w-4/10">
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
                    <Link className="bg-primary py-4 px-16 text-white font-bold rounded-sm" to="/territories/lgas/create">
                        Add Agent
                    </Link>
                </div>
                <div className="w-full flex mt-16 items-center px-1">
                    <div className="w-1/2">
                        <input className="border border-primary rounded-sm w-9.5/10 py-3 px-2 focus:outline-none" name="search" type="text" value={search} onChange={handleChange} placeholder="Search agents by name"/>
                    </div>
                    <div className="w-1/2">
                        <button disabled={search.length < 1} className="bg-primary button-padding py-3.5 text-white font-bold rounded-lg focus:outline-none" onClick={handleSearch}>
                            search
                        </button>
                    </div>
                </div>
                <AgentList agents={agentState.agents}/>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex">
                        <Uploader dispatch={dispatch} action="GET_AGENTS_SUCCESS"/>
                        {agentState.agents.length > 0 && <Downloader dispatch={dispatch} action="GET_AGENTS_SUCCESS" />}
                    </div>
                    {agentState.agents.length > 0 && <div>
                        Pagination
                    </div>}
                </div>
            </div>
        </Layout>
    );
}

export default Agents;
