import React from 'react';

const ResultCards = ({data}) => {
    return (
        <div>
            <div className="flex justify-between items-center py-1 shadow-container px-3 mt-0.5">
                <span className="text-lg">Results Received</span>
                <span className="text-4xl font-bold">{`${data?.resultReceived?.toFixed(2) || 0}%`}</span>
            </div>
            <div className="flex justify-between items-center py-6 shadow-container px-2.5 my-2">
                <div className="bg-oceanBlue py-4 text-center rounded-xsm .shadow-sm-container w-118">
                    <div className="text-4xl font-bold">{data?.lgaWithResults || 0}</div>
                    <div className="text-xs">LGAs with results</div>
                </div>
                <div className="bg-oceanBlue py-4 text-center mx-3 rounded-xsm .shadow-sm-container w-118">
                    <div className="text-4xl font-bold">{data?.wardsWithResults || 0}</div>
                    <div className="text-xs">Wards with results</div>
                </div>
                <div className="bg-oceanBlue py-4 text-center rounded-xsm .shadow-sm-container w-118">
                    <div className="text-4xl font-bold">{data?.pollingUnitsWithResults || 0}</div>
                    <div className="text-xs">PUs with results</div>
                </div>
            </div>

            <div className="flex justify-between items-center py-6 shadow-container px-2.5 my-2">
                {data?.partyLgaResults?.map((result) => {
                    if(result.partyName !== "others") {
                        return(
                        <div className="bg-oceanBlue py-4 text-center rounded-xsm .shadow-sm-container w-118">
                            <div className="text-4xl font-bold my-4">{result.lgaCount || 0}</div>
                            <div className="text-xs">LGAs won by  {result.partyName}</div>
                        </div>)
                    }
                })}
            </div>
        </div>
    )
}

export default ResultCards;