import React, { useContext, useEffect } from 'react';
import KanoMap from '../../../shared/assets/KanoMap.js';
import * as d3 from 'd3';

const Results = ({data, politicalParties}) => {
    console.log(politicalParties,data)
    const parties = {
        'PDP': '#ff0000',
        'APC': '#00b0f0',
        'ANPP': '#eb5e00',
    }

    const colorMap = () => {
        const svg = document.getElementById('kano');
         if(data?.length > 0)   {
                for(let i = 0; i < data.length; ++i) {
                    const color = parties[data[i].partyResults[data[i].partyResults.length - 1]?.politicalParty?.code] || '#000';
                    console.log(color)
                    d3.select(svg).select(`#kano-${data[i].lga.code}`)
                    .attr('fill', color)
                }
            }
    }

    useEffect(() => {
        colorMap();
    }, [data, politicalParties])

    return (
        <div id="map" className="relative shadow-container rounded-sm my-4 ">
            <KanoMap />
            {data?.length > 0 &&<div className="label absolute bottom-28 left-10">
                {politicalParties.map((party) =><div className="flex items-center">
                    <span className="w-5 h-5 rounded-full" style={{backgroundColor: parties[party.politicalParty.code || ''] || '#000'}}></span>
                    <div className="ml-3">{party.politicalParty.code || ''}</div>
                </div>)}
            </div>}
        </div>
    )
}

export default Results;