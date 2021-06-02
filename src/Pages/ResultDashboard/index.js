import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import { ResultContext } from '../../contexts/ResultContext';
import { showToast } from '../../helpers/showToast';
import { apiRequest } from '../../lib/api';
import Layout from '../../shared/Layout';
import BarChart from './components/BarChart';
import { getDashboardByState, getDashboardByLga , getDashboard, getLgasByStateId, allResults, getSenatorialDistrictsByStateId} from '../../lib/url.js';
import ResultCards from './components/ResultCards';
import Results from './components/Results';
import pickBy from 'lodash/pickBy';
import Loader from '../../shared/components/Loader';

const ResultDashboard = ({match, location}) => {
    const [dashboardState, dispatch] = useContext (ResultContext);
    const [senatorialDistricts, setSenatorialDistricts] = useState([]);
    const [lgas, setLgas] = useState([]);
    const [filter, setFilter] = useState({lga: '', senatorialDistrict: ''});
    const [dashboard, setDashboard] = useState(null);
// 2 dropdowns
// barchat
// Results card
// the map

     const getDashboardData = () => {
        dispatch({type: 'GET_DASHBOARD_BY_STATE'});
         apiRequest(`${getDashboardByState}/6`, 'get')
            .then((res) => {
                console.log('res',res)
                dispatch({type: 'GET_DASHBOARD_BY_STATE_SUCCESS', payload: {response: res}});
                setDashboard(res);
                // showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'GET_DASHBOARD_BY_STATE_FAILURE', payload: {error: err}});
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            });
    }

    const getDashboardLgaData = (lgaid) => {
        setFilter({...filter, lga: lgaid})
        dispatch({type: 'GET_DASHBOARD_BY_LGA'});
         apiRequest(`${getDashboardByLga}/${lgaid}`, 'get')
            .then((res) => {
                dispatch({type: 'GET_DASHBOARD_BY_LGA_SUCCESS', payload: {response: res}});
                setDashboard(res);
                // showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'GET_DASHBOARD_BY_LGA_FAILURE', payload: {error: err}});
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            });
    }

    const getDashboardSenDistrictData = (districtId) => {
        setFilter({...filter, senatorialDistrict: districtId})
        dispatch({type: 'GET_DASHBOARD_BY_SENATORIAL_DISTRICT'});
         apiRequest(`${getDashboardSenDistrictData}/${districtId}`, 'get')
            .then((res) => {
                dispatch({type: 'GET_DASHBOARD_BY_SENATORIAL_DISTRICT_SUCCESS', payload: {response: res}});
                setDashboard(res);
                // showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'GET_DASHBOARD_BY_SENATORIAL_DISTRICT_FAILURE', payload: {error: err}});
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
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

    const getSenatorialDistricts = (stateId = 1) => {
        if(stateId) {apiRequest(`${getSenatorialDistrictsByStateId}/${stateId}`, 'get')
            .then(res => {
                setSenatorialDistricts(res.senatorialDistricts);
            })
            .catch(err => {
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            })}
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

    useEffect(() => {
        getDashboardData();
    }, [])

    useEffect(() => {
        getSenatorialDistricts();
    }, [filter.senatorialDistrict])

    useEffect(() => {
        getLgas();
    }, [filter.lga])

    return(
        <Layout location={location}>
            <Breadcrumbs className="shadow-container w-full lg:px-3.5 px-1 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Dashboard',
                pathname: "/dashboard"}, {id: 2,title: 'Results',
                pathname: match.path}]}/>
            <div className="w-full flex">
                <div className="w-7/10 mr-4">
                    {/* {!dashboardState.loading &&  */}
                        <Results data={dashboard?.lgaResults || []} politicalParties={dashboard?.partyResult}/>
                    {/* } */}
                </div>
                <div className="w-3/10">
                    <div>
                        <select 
                            name="senatorialDistrict" 
                            onChange={(e) => getDashboardSenDistrictData(e.target.value)}
                            onBlur={(e) => getDashboardSenDistrictData(e.target.value)}
                            value={filter.senatorialDistrict}
                            className="w-full border border-primary rounded-sm py-4 px-4 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-2xl mt-2"
                        >
                            <option value='' disabled>All Senatorial Districts</option>
                            {senatorialDistricts.map(district => (<option key={district.id} value={district.code}>{district.name}</option>))}
                        </select>
                        <select 
                            name="lga" 
                            onChange={(e) => getDashboardLgaData(e.target.value)}
                            onBlur={(e) => getDashboardLgaData(e.target.value)}
                            value={filter.lga}
                            className="w-full border border-primary rounded-sm py-4 px-4 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-2xl mt-6"
                        >
                            <option value='' disabled>All Lgas</option>
                            {lgas.map(lga => (<option key={lga.id} value={lga.code}>{lga.name}</option>))}
                        </select>
                    </div>
                    <div className="mt-8 mb-5 shadow-container pt-4">
                        {dashboardState.loading ? 
                            <div className="flex justify-center my-6">
                                <Loader />
                            </div> :
                            <BarChart data={dashboard?.partyResult || []}/>
                        }
                    </div>
                    <ResultCards data={dashboardState.dashboard}/>
                </div>
            </div>
            
        </Layout>
    );
}

export default ResultDashboard;