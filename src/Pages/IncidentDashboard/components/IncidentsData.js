import React, { useContext, useEffect } from 'react';
import KanoMap from '../../../shared/assets/KanoMap.js';
import * as d3 from 'd3';
import { apiRequest } from '../../../lib/api.js';
import { getDashboardByState, getDashboardByLga } from '../../../lib/url.js';
import { showToast } from '../../../helpers/showToast.js';
import { IncidentContext } from '../../../contexts/IncidentContext.js';

const IncidentsData = ({data}) => {
    const [incidentState, dispatch] = useContext(IncidentContext);
    const colors = {
        'level-1': '#fceaea',
        'level-2': '#fddbdb',
        'level-3': '#e6a4a4',
        'level-4': '#f85757',
        'level-5': '#f20101'
    }

    // const data = {
    //     "statusCode": "00",
    //     "statusMessage": "Dashboard loaded.",
    //     "totalStates": 3,
    //     "totalLgas": 5,
    //     "totalSenatorialDistricts": 3,
    //     "totalRegisteredVotes": 6000,
    //     "totalAccreditedVotes": 4000,
    //     "totalVoteCounts": 680,
    //     "totalWards": 4,
    //     "totalPollingUnits": 6,
    //     "resultReceived": 17,
    //     "lgaWithResults": 1,
    //     "wardsWithResults": 1,
    //     "pollingUnitsWithResults": 2,
    //     "lgas": [
    //         {
    //             "id": 1,
    //             "slice": "STL70363",
    //             "partyResult": [
    //                 {
    //                     "politicalParty": {
    //                         "code": "APC",
    //                         "name": "Action People's congress",
    //                         "id": 1
    //                     },
    //                     "resultPerParty": null,
    //                     "totalVoteCount": 190,
    //                     "percent": 27.941176470588236
    //                 },
    //                 {
    //                     "politicalParty": {
    //                         "code": "PDP",
    //                         "name": "People's democratic party.",
    //                         "id": 2
    //                     },
    //                     "resultPerParty": null,
    //                     "totalVoteCount": 400,
    //                     "percent": 58.8235294117647
    //                 },
    //                 {
    //                     "politicalParty": {
    //                         "code": "ANPP",
    //                         "name": "People's democratic party.",
    //                         "id": 3
    //                     },
    //                     "resultPerParty": null,
    //                     "totalVoteCount": 90,
    //                     "percent": 13.235294117647058
    //                 }
    //             ]
    //         }
    //     ],
    //     "partyResult": [
    //         {
    //             "politicalParty": {
    //                 "code": "PDP",
    //                 "name": "People's democratic party.",
    //                 "id": 2
    //             },
    //             "resultPerParty": null,
    //             "totalVoteCount": 400,
    //             "percent": 58.8235294117647
    //         },
    //         {
    //             "politicalParty": {
    //                 "code": "APC",
    //                 "name": "Action People's congress",
    //                 "id": 1
    //             },
    //             "resultPerParty": null,
    //             "totalVoteCount": 190,
    //             "percent": 27.941176470588236
    //         },
    //         {
    //             "politicalParty": {
    //                 "code": "ANPP",
    //                 "name": "People's democratic party.",
    //                 "id": 3
    //             },
    //             "resultPerParty": null,
    //             "totalVoteCount": 90,
    //             "percent": 13.235294117647058
    //         }
    //     ]
    //     }
    const getDashboardData = () => {
        dispatch({type: 'GET_DASHBOARD_BY_STATE'});
         apiRequest(`${getDashboardByState}/6`, 'get')
            .then((res) => {
                dispatch({type: 'GET_DASHBOARD_BY_STATE_SUCCESS', payload: {response: res}});
                // showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'GET_DASHBOARD_BY_STATE_FAILURE', payload: {error: err}});
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            });
    }

    const getDashboardLgaData = () => {
        dispatch({type: 'GET_DASHBOARD_BY_LGA'});
         apiRequest(`${getDashboardByLga}/4`, 'get')
            .then((res) => {
                dispatch({type: 'GET_DASHBOARD_BY_LGA_SUCCESS', payload: {response: res}});
                // showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'GET_DASHBOARD_BY_LGA_FAILURE', payload: {error: err}});
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            });
    }

    useEffect(() => {
        // getDashboardData();
        // getDashboardLgaData();
    }, []);

    const colorMap = () => {
        const svg = document.getElementById('kano');
        for(let i = 0, color= colors['level-5']; i < data.length; ++i) {
            if(data[i].count <= 10) {
                color = colors['level-1']
            }   else if(data[i].count <= 20) {
                color = colors['level-2']
            }   else if(data[i].count <= 40) {
                color = colors['level-3']
            }   else if(data[i].count <= 50) {
                color = colors['level-4']
            }   else if(data[i].count > 50) {
                color = colors['level-5']
            }
            d3.select(svg).select(`#kano-${data[i].lga.code}`)
            .attr('fill', color)
        }
    }

    useEffect(() => {
        colorMap();
    }, [data])

    return (
        <div id="map" className="relative shadow-container rounded-sm my-4 ">
            <KanoMap />
            <div className="label absolute bottom-7 left-10">
                <div className="flex items-center">
                    <span className="w-8 h-9" style={{backgroundColor: '#f20101'}}></span>
                    <div className="ml-3 font-light">High</div>
                </div>
                <div className="flex items-center">
                    <span className="w-8 h-9" style={{backgroundColor: '#f85757'}}></span>
                </div>
                <div className="flex items-center">
                    <span className="w-8 h-9" style={{backgroundColor: '#e6a4a4'}}></span>
                </div>
                <div className="flex items-center">
                    <span className="w-8 h-9" style={{backgroundColor: '#fddbdb'}}></span>
                </div>
                <div className="flex items-center">
                    <span className="w-8 h-12" style={{backgroundColor: '#fceaea'}}></span>
                    <div className="ml-3 font-light">Low</div>
                </div>
            </div>
        </div>
    )
}

export default IncidentsData;