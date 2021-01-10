import React, { useContext, useEffect } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import { ResultContext } from '../../contexts/ResultContext';
import { showToast } from '../../helpers/showToast';
import { apiRequest } from '../../lib/api';
import Layout from '../../shared/Layout';
import BarChart from './components/BarChart';
import { getDashboardByState, getDashboardByLga , getDashboard} from '../../lib/url.js';
import ResultCards from './components/ResultCards';
import Results from './components/Results';

const ResultDashboard = ({match, location}) => {
    const [dashboardState, dispatch] = useContext (ResultContext);
// 2 dropdowns
// barchat
// Results card
// the map

     const getDashboardData = () => {
        dispatch({type: 'GET_DASHBOARD_BY_STATE'});
         apiRequest(`${getDashboardByState}/6`, 'get')
            .then((res) => {
                dispatch({type: 'GET_DASHBOARD_BY_STATE_SUCCESS', payload: {response: res}});
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'GET_DASHBOARD_BY_STATE_FAILURE', payload: {error: err}});
                showToast('error', `${err.response?.data.statusCode? err.response?.data.statusCode : ""}: ${err.response?.data.statusMessage?err.response.data.statusMessage : "Something went wrong. Please try again later."}`);
            });
    }

    useEffect(() => {
        getDashboardData();
    }, [])
    return(
        <Layout location={location}>
            <Breadcrumbs className="shadow-container w-full lg:px-3.5 px-1 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Dashboard',
                pathname: "/dashboard"}, {id: 2,title: 'Results',
                pathname: match.path}]}/>
            <div className="w-full flex">
                <div className="w-7/10 mr-4">
                    <Results />
                </div>
                <div className="w-3/10">
                    <div>dropdowns</div>
                    <div>Bar chat</div>
                    <ResultCards data={dashboardState.dashboard}/>
                </div>
            </div>
            
        </Layout>
    );
}

export default ResultDashboard;