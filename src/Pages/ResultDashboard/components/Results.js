import React, { useContext, useEffect } from 'react';
import KanoMap from '../../../shared/assets/KanoMap.js';
import * as d3 from 'd3';
import { apiRequest } from '../../../lib/api.js';
import { getDashboardByState, getDashboardByLga } from '../../../lib/url.js';
import { showToast } from '../../../helpers/showToast.js';
import { ResultContext } from '../../../contexts/ResultContext.js';

const Results = () => {
    const [dashboardState, dispatch] = useContext(ResultContext);
    const parties = {
        'PDP': '#ff0000',
        'APC': '#00b0f0',
        'ANPP': '#eb5e00'
    }

    const data = {
        "statusCode": "00",
        "statusMessage": "Dashboard loaded.",
        "totalStates": 3,
        "totalLgas": 5,
        "totalSenatorialDistricts": 3,
        "totalRegisteredVotes": 6000,
        "totalAccreditedVotes": 4000,
        "totalVoteCounts": 680,
        "totalWards": 4,
        "totalPollingUnits": 6,
        "resultReceived": 17,
        "lgaWithResults": 1,
        "wardsWithResults": 1,
        "pollingUnitsWithResults": 2,
        "lgas": [
            {
                "id": 1,
                "slice": "STL700363",
                "partyResult": [
                    {
                        "politicalParty": {
                            "code": "APC",
                            "name": "Action People's congress",
                            "id": 1
                        },
                        "resultPerParty": null,
                        "totalVoteCount": 190,
                        "percent": 27.941176470588236
                    },
                    {
                        "politicalParty": {
                            "code": "PDP",
                            "name": "People's democratic party.",
                            "id": 2
                        },
                        "resultPerParty": null,
                        "totalVoteCount": 400,
                        "percent": 58.8235294117647
                    },
                    {
                        "politicalParty": {
                            "code": "ANPP",
                            "name": "People's democratic party.",
                            "id": 3
                        },
                        "resultPerParty": null,
                        "totalVoteCount": 90,
                        "percent": 13.235294117647058
                    }
                ]
            }
        ],
        "partyResult": [
            {
                "politicalParty": {
                    "code": "PDP",
                    "name": "People's democratic party.",
                    "id": 2
                },
                "resultPerParty": null,
                "totalVoteCount": 400,
                "percent": 58.8235294117647
            },
            {
                "politicalParty": {
                    "code": "APC",
                    "name": "Action People's congress",
                    "id": 1
                },
                "resultPerParty": null,
                "totalVoteCount": 190,
                "percent": 27.941176470588236
            },
            {
                "politicalParty": {
                    "code": "ANPP",
                    "name": "People's democratic party.",
                    "id": 3
                },
                "resultPerParty": null,
                "totalVoteCount": 90,
                "percent": 13.235294117647058
            }
        ]
        }
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

    const getDashboardLgaData = () => {
        dispatch({type: 'GET_DASHBOARD_BY_LGA'});
         apiRequest(`${getDashboardByLga}/4`, 'get')
            .then((res) => {
                dispatch({type: 'GET_DASHBOARD_BY_LGA_SUCCESS', payload: {response: res}});
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
            })
            .catch((err) => {
                dispatch({type: 'GET_DASHBOARD_BY_LGA_FAILURE', payload: {error: err}});
                showToast('error', `${err.response?.data.statusCode? err.response?.data.statusCode : ""}: ${err.response?.data.statusMessage?err.response.data.statusMessage : "Something went wrong. Please try again later."}`);
            });
    }

    useEffect(() => {
        // getDashboardData();
        getDashboardLgaData();
    }, []);

    const colorMap = () => {
        const svg = document.getElementById('kano');
        for(let i = 0; i < data.lgas.length; ++i) {
            const color = parties[data.lgas[i].partyResult[0].politicalParty.code];
            d3.select(svg).select(`#${data.lgas[i].slice}`)
            .attr('fill', color)
        }
    }

    useEffect(() => {
        colorMap();
    }, [])

    return (
        <div id="map" className="relative shadow-container rounded-sm my-4 ">
            <KanoMap />
            <div className="label absolute bottom-28 left-10">
                <div className="flex items-center">
                    <span className="w-5 h-5 rounded-full" style={{backgroundColor: parties[data.partyResult[0].politicalParty.code]}}></span>
                    <div className="ml-3">{data.partyResult[0].politicalParty.code}</div>
                </div>
                <div className="flex items-center">
                    <span className="w-5 h-5 rounded-full" style={{backgroundColor: parties[data.partyResult[1].politicalParty.code]}}></span>
                    <div className="ml-3">{data.partyResult[1].politicalParty.code}</div>
                </div>
                <div className="flex items-center">
                    <span className="w-5 h-5 rounded-full" style={{backgroundColor: parties[data.partyResult[2].politicalParty.code]}}></span>
                    <div className="ml-3">{data.partyResult[2].politicalParty.code}</div>
                </div>
            </div>
        </div>
    )
}

export default Results;