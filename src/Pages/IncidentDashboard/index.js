import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import { showToast } from '../../helpers/showToast';
import { apiRequest } from '../../lib/api';
import Layout from '../../shared/Layout';
import BarChart from './components/BarChart';
import { getIncidentDashboard, getDashboardByLga , getDashboard, allIncidents, getSenatorialDistrictsByStateId} from '../../lib/url.js';
import pickBy from 'lodash/pickBy';
import { IncidentContext } from '../../contexts/IncidentContext';
import IncidentsData from './components/IncidentsData';
import StackedBarChart from './components/StackedChart';

const IncidentDashboard = ({match, location}) => {
    const [incidentState, dispatch] = useContext (IncidentContext);
    const [senatorialDistricts, setSenatorialDistrict] = useState([]);
    const [lgas, setLgas] = useState([]);
    const [dashboard, setDashboard] = useState();
    const [filter, setFilter] = useState({lga: '', senatorialDistrict: ''});

     const getDashboardData = (stateid = 6) => {
        dispatch({type: 'GET_INCIDENT_DASHBOARD'});
         apiRequest(`${getIncidentDashboard}/${stateid}`, 'get')
            .then((res) => {
                dispatch({type: 'GET_INCIDENT_DASHBOARD_SUCCESS', payload: {response: res}});
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
                setDashboard(res);
            })
            .catch((err) => {
                dispatch({type: 'GET_INCIDENT_DASHBOARD_FAILURE', payload: {error: err}});
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Couldn't fetch states. Please try again later."}`)
            });
    }

    const filterData = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFilter({...filter, [name]: value})
        let query = pickBy(filter);
        if(Object.keys(query).length) { dispatch({type: 'GET_INCIDENTS'});
        //  setSubmitting(true);
         apiRequest(allIncidents, 'get', {params: query})
            .then((res) => {
                dispatch({type: 'GET_INCIDENTS_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_INCIDENTS_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
        }
    }

    useEffect(() => {
        getDashboardData();
    }, [])
    return(
        <Layout location={location}>
            <Breadcrumbs className="shadow-container w-full lg:px-3.5 px-1 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Dashboard', pathname: "/dashboard"}, 
                                        {id: 2,title: 'Incidents', pathname: match.path}]}/>
            <div className="w-full flex">
                <div className="w-7/10 mr-4">
                    <IncidentsData />
                </div>
                <div className="w-3/10">
                    <div>
                        <select 
                            name="senatorialDistrict" 
                            onChange={filterData}
                            onBlur={filterData}
                            value={filter.senatorialDistrict}
                            className="w-full border border-primary rounded-sm py-4 px-4 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-2xl mt-2"
                        >
                            <option value='' disabled>All Senatorial Districts</option>
                            {senatorialDistricts.map(district => (<option key={district.id} value={district.code}>{district.name}</option>))}
                        </select>
                        <select 
                            name="lga" 
                            onChange={filterData}
                            onBlur={filterData}
                            value={filter.lga}
                            className="w-full border border-primary rounded-sm py-4 px-4 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-2xl mt-6"
                        >
                            <option value='' disabled>All Lgas</option>
                            {lgas.map(lga => (<option key={lga.id} value={lga.code}>{lga.name}</option>))}
                        </select>
                    </div>
                    <div className="shadow-container my-7 pt-2 pb-7 px-9">
                        <p className="text-2xl font-bold text-darkerGray mb-3">153 Incidents</p>
                        <div className="font-light w-full flex text-xl"><span className="w-7/10">Ballot snatching</span><span className="w-3/10">{`20 (45%)`}</span></div>
                        <div className="font-light w-full flex text-xl"><span className="w-7/10">Absence of EC8 form</span><span className="w-3/10">{`10 (25%)`}</span></div>
                        <div className="font-light w-full flex text-xl"><span className="w-7/10">Armed Robbery</span><span className="w-3/10">{`9 (15%)`}</span></div>
                        <div className="font-light w-full flex text-xl"><span className="w-7/10">Civil unrest</span><span className="w-3/10">{`5 (10%)`}</span></div>
                    </div>
                </div>
            </div>
            <div className="w-full shadow-container pt-4">
                <div className="flex w-full justify-end">
                    <select 
                            name="senatorialDistrict" 
                            onChange={filterData}
                            onBlur={filterData}
                            value={filter.senatorialDistrict}
                            className="w-3/10 border border-primary rounded-sm py-4 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-2xl mt-2"
                        >
                            <option value='' disabled>All Senatorial Districts</option>
                            {senatorialDistricts.map(district => (<option key={district.id} value={district.code}>{district.name}</option>))}
                        </select>
                </div>
                <div className="mt-8 mb-5">
                    {/* <BarChart /> */}
                    <StackedBarChart keys={["form",  "ballot", "unrest", "robbery"]}/>
                </div>
            </div>
            
        </Layout>
    );
}

export default IncidentDashboard;