import React, { Fragment, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const BarChart = ({data}) => {
    const yRef = useRef("yAxis");
    console.log('var', data)
    // const [data, setData] = useState(partyResults);
    // let data = [{
    //             "name": "PDP",
    //             "value": 20,
    //     },
    //         {
    //             "name": "APC",
    //             "value": 12,
    //     },
    //         {
    //             "name": "ANPP",
    //             "value": 19,
    //     },
    // ]

    // let data = [{
    //     politicalParty: {
    //         percent: 42.52400548696845,
    //         politicalParty: {
    //             code: "PDP", 
    //             name: "People's Democratic Party Thanks", 
    //             id: 2
    //         },
    //         resultPerParty: null,
    //         totalVoteCount: 31000
    //     }
    // },
    // {
    //     politicalParty: {
    //         percent: 57.47599451303155,
    //         politicalParty: {
    //             code: "APC", 
    //             name: "HayPeeCee", 
    //             id: 3
    //         },
    //         resultPerParty: null,
    //         totalVoteCount: 41900
    //     }
    // }]
    const margin = {
        top: 8,
        right: 25,
        bottom: 8,
        left: 60
    };
    var rectHeight = 31;
    const width = 414 - margin.left - margin.right;
    const height = (rectHeight + margin.top + margin.bottom) * data.length ;
    data = data.sort((a, b) =>  d3.ascending(a.totalVoteCount, b.totalVoteCount));
    const x = d3.scaleLinear()
        .range([0, width-100])
        .domain([0, d3.max(data, d => d.totalVoteCount)]);

    const y = d3.scaleBand()
        .domain(data.map(d => d?.politicalParty?.code))
        .rangeRound([height, 0])
        .paddingInner(0.375);
    //sort bars based on value

    const percentege = (num) => {
        let sum = 0;
        for(let i = 0; i < data.length; ++i) {
            sum += data[i].totalVoteCount;
        }
        let result = (num/sum) * 100;
        return result.toFixed(2);
    }

    const parties = {
        'PDP': '#ff0000',
        'APC': '#00b0f0',
        'ANPP': '#eb5e00'
    }


    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    

    const ref = (svg) => {
        var width = 414 - margin.left - margin.right,
        height = (rectHeight + margin.top + margin.bottom) * data.length ;

    // var svg = d3.select("#graphic").append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //     .attr('transform', `translate(${margin.left},${margin.top})`);


    //make y axis to show bar names
    var yAxis = d3.axisLeft(y)
        .tickSize(0);

    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    // append rects
    bars = (rect) =>
        rect.attr("class", "bar")
            .attr("y", function (d) {
                return y(d?.politicalParty?.code);
            })
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.totalVoteCount);
            })
            .attr("fill", function (d) {
                return parties[d?.politicalParty?.code];
            })
            .call((text) => 
                text        .attr("class", "label")
                //y position of the label is halfway down the bar
                .attr("y", function (d) {
                    return y(d?.politicalParty?.code) + y.bandwidth() / 2 + 4;
                })
                //x position is 3 pixels to the right of the bar
                .attr("x", function (d) {
                    return x(d.totalVoteCount) + 3;
                })
                .text(function (d) {
                    return d.totalVoteCount;
                })
            )

    //add a value label to the right of each bar
    // bars.append("text")
    //     .attr("class", "label")
    //     //y position of the label is halfway down the bar
    //     .attr("y", function (d) {
    //         return y(d?.politicalParty?.code) + y.bandwidth() / 2 + 4;
    //     })
    //     //x position is 3 pixels to the right of the bar
    //     .attr("x", function (d) {
    //         return x(d.value) + 3;
    //     })
    //     .text(function (d) {
    //         return d.value;
    //     });
    }

    

    return (
        <div id="graphic">
            <svg
                width = {width + margin.left + margin.right}
                height = {height + margin.top + margin.bottom}
            >
                {/* <g fill="none" fontSize="1rem" fontFamily="GelionBold" textAnchor="end">
                    <path d="M0.5,141.5V0.5" stroke="#000" />
                    {
                        data.map(d => )
                    }
                </g> */}
                {
                    data.map(d => 
                        <Fragment key={d.id}>
                            {/* <g fill="#000" fontSize="1rem" fontFamily="GelionBold" textAnchor="end"> */}
                                <text y={y(d?.politicalParty?.code) + y.bandwidth() / 2 + 4} x={16} >{d?.politicalParty?.code}</text>
                            {/* </g> */}
                            
                            <rect className="bar" width={x(d.totalVoteCount)} height={y.bandwidth()} y={y(d?.politicalParty?.code)} x={60} fill={parties[d?.politicalParty?.code]}/>
                            <text y={y(d?.politicalParty?.code) + y.bandwidth() / 2 + 4} x={x(d.totalVoteCount) + 70} >{d.totalVoteCount} {`(${d?.percent ? d.percent.toFixed(2) : 0}%)`}</text>
                        </Fragment>
                    )
                }
            </svg>
        </div>
    );
}

export default BarChart;