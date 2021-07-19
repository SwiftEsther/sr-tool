import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import Layout from "../../shared/Layout";
import {allAgents, filterAgentByName, uploadAgent, filterAgents, getLgasByStateId, getWardsByLgaId, getPollingUnitsByWardId} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import Uploader from "../../shared/components/Uploader";
import Downloader from "../../shared/components/Downloader";
import pickBy from 'lodash/pickBy'
import { AgentContext } from "../../contexts/AgentContext";
import AgentList from "./AgentList";
import Pagination from "../../shared/components/Pagination";

const Agents = ({match, location, history}) => {
    const [search, setSearch] = useState('');
    const [agentState, dispatch] = useContext(AgentContext);
    const [filter, setFilter] = useState({lga: '', ward: '', 'polling-unit': ''});
    const [lgas, setLgas] = useState([]);
    const [wards, setWards] = useState([]);
    const [pollingUnits, setPollingUnits] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentAgents, setCurrentAgents] = useState([]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const headers = [
        { label: 'First Name', key: 'firstname' },
        { label: 'Last Name', key: 'lastname' },
        { label: 'Local Government Area', key: 'lga.name' },
        { label: 'Ward', key: 'ward.name' },
        { label: 'Polling Unit', key: 'pollingUnit.name' },
        { label: 'Phone Number', key: 'phone' }
    ];

    const filterData = (id,type) => {
        const url = `${filterAgents}/${type}`;
        setFilter({...filter, [type]: id});
        let query = pickBy(filter);
        if(Object.keys(query).length) { dispatch({type: 'FILTER_AGENTS'});
         apiRequest(`${url}/${id}`, 'get')
            .then((res) => {
                dispatch({type: 'FILTER_AGENTS_SUCCESS', payload: {response: res}});
                setCurrentAgents(res.partyAgents.slice(0, 11));
            })
            .catch((err) => {
                dispatch({type: 'FILTER_AGENTS_FAILURE', payload: {error: err}});
               showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`);
            });
        }
    }

    const handleSearch = () => {
       dispatch({type: 'SEARCH_AGENT_BY_NAME'});
         apiRequest(filterAgentByName, 'get', {params: {firstname: search}})
            .then((res) => {
                dispatch({type: 'SEARCH_AGENT_BY_NAME_SUCCESS', payload: {response: res}});
                setCurrentAgents(res.partyAgents.slice(0, 11));
                // showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'SEARCH_AGENT_BY_NAME_FAILURE', payload: {error: err}});
               showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            });
    }
    
    const getAllAgents = () => {
        dispatch({type: 'GET_AGENTS'});
         apiRequest(allAgents, 'get')
            .then((res) => {
                dispatch({type: 'GET_AGENTS_SUCCESS', payload: {response: res}});
                setCurrentAgents(res.partyAgents.slice(0, 11));
                // showToast('success', `${res.statusCode}: ${res.statusMessage}`)
            })
            .catch((err) => {
                dispatch({type: 'GET_AGENTS_FAILURE', payload: {error: err}});
                err.response.data.status == 401 ?
                history.replace("/login") :
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`);
            });
    }

    const getLgas = (stateId = 1) => {
        if(stateId) {apiRequest(`${getLgasByStateId}/${stateId}`, 'get')
            .then(res => {
                setLgas(res.lgas);
            })
            .catch(err => {
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            })}
    }

    const getWards = (lgaId) => {
        if(lgaId) {apiRequest(`${getWardsByLgaId}/${lgaId}`, 'get')
            .then(res => {
                setWards(res.wards);
            })
            .catch(err => {
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            })}
    }

    const getPollingUnits = (wardId) =>{
        if(wardId){apiRequest(`${getPollingUnitsByWardId}/${wardId}`, 'get')
            .then((res) => {
                setPollingUnits(res.pollingUnits)
            })
            .catch((err) => {
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            });}
    }

    const onPageChanged = data => {
        const allAgents = agentState.agents;
        const { currentPage, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const agents = allAgents?.slice(offset, offset + pageLimit);
        setCurrentPage(currentPage);
        setCurrentAgents(agents);
    }

    useEffect(() => {
        getAllAgents();
        getLgas();
    }, []);

    useEffect(() => {
        filterData(filter.ward, 'ward');
        getPollingUnits(filter.ward);
    }, [filter.ward])

    useEffect(() => {
        filterData(filter.lga, 'lga');
        getWards(filter.lga);
    }, [filter.lga])

    const clearFilter = () => {
        setFilter({lga: '', ward: '', 'polling-unit': ''});
        setSearch("");
        getAllAgents();
    }

    useEffect(() => {
        filterData(filter['polling-unit'], 'polling-unit');
    }, [filter['polling-unit']])
    
    return (
        <Layout location={location}>
            <Breadcrumbs className="shadow-container w-full lg:px-3.5 px-1 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Agents',
            pathname: match.path}]}/>
            <div className="my-6 shadow-container pl-2.5 lg:pr-7 pr-2.5 py-6">
                <div className="lg:flex justify-between items-center px-1">
                    <div className="xl:w-4.5/10 lg:w-6/10 flex items-center px-1 w-full">
                        <select 
                            name="lga" 
                            onChange={(e) => setFilter({...filter, lga: e.target.value})}
                            onBlur={(e) => setFilter({...filter, lga: e.target.value})}
                            value={filter.lga}
                            className="w-full border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                            disabled={agentState.loading || agentState.agents?.length <= 0}
                        >
                            <option value='' disabled>All Lgas</option>
                            {lgas.map(lga => (<option key={lga.id} value={lga.id}>{lga.name}</option>))}
                        </select>
                        <select 
                            name="ward" 
                            onChange={(e) => setFilter({...filter, ward: e.target.value})}
                            onBlur={(e) => setFilter({...filter, ward: e.target.value})}
                            value={filter.ward}
                            className="w-full border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm mx-4"
                            disabled={agentState.loading || !filter.lga}
                        >
                            <option value='' disabled>All Wards</option>
                            {wards.map(ward => (<option key={ward.id} value={ward.id}>{ward.name}</option>))}
                        </select>
                        <select 
                            name="polling-unit" 
                            onChange={(e) => setFilter({...filter, 'polling-unit': e.target.value})}
                            onBlur={(e) => setFilter({...filter, 'polling-unit': e.target.value})}
                            className="w-full border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                            disabled={agentState.loading || !filter.ward}
                        >
                            <option value='' disabled>All Polling Units</option>
                            {pollingUnits.map(pollingUnit => (<option key={pollingUnit.id} value={pollingUnit.id}>{pollingUnit.name}</option>))}
                        </select>
                        <div className="cursor-pointer" onClick={clearFilter}>clear</div>
                    </div>
                    <div className="xl:w-2/10 lg:w-3/10 flex items-center lg:justify-end px-1 w-full lg:mt-0 mt-4">
                    <Link className="bg-primary py-3.5 px-16 text-white font-bold rounded-sm" to="/agents/create">
                        Add Agent
                    </Link>
                    </div>
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
                <AgentList agents={currentAgents} loading={agentState.loading} getAgents={getAllAgents}/>
                {!agentState.loading && <div className="flex justify-between items-center mt-4">
                    <div className="flex">
                        <Uploader dispatch={dispatch} action="UPLOAD_AGENT" action_success="UPLOAD_AGENT_SUCCESS" action_error="UPLOAD_AGENT_FAILURE" url={uploadAgent} refresh={getAllAgents} logout={() => history.replace("/login")}/>
                            {/* {agentState.response?.agents?.length > 0 && <Downloader dispatch={dispatch} action="UPLOAD_AGENT_SUCCESS" />} */}
                            {agentState.agents?.length > 0 &&  <Downloader dispatch={dispatch} action="DOWNLOAD_AGENT_SUCCESS" headers={headers} data={agentState.agents || []} filename={'agents.csv'} /> }
                    </div>
                    {agentState.agents.length > 0 && <div>
                        <Pagination totalRecords={agentState.agents?.length} pageLimit={10} pageNeighbours={2} onPageChanged={onPageChanged} />
                    </div>}
                </div>}
            </div>
        </Layout>
    );
}

export default Agents;
