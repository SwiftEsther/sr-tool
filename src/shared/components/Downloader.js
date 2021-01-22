import React from 'react';
import { apiRequest } from '../../lib/api';
import { CSVLink } from "react-csv";

const lgas = "https://dl.dropboxusercontent.com/s/eui3rl43yf2m8nv/nuevo_test.csv";

const Downloader = ({dispatch, action, action_success, action_error, headers, data, filename}) => {
    const csvReport = {
        data: data,
        headers: headers,
        filename: filename
    };

    // const downloadCSV = async (url, name) => {
    //     dispatch(action);
    //     apiRequest(lgas, 'get')
    //         .then(res => {
    //             let data = res.text();
    //             let blob = new Blob([data], { type: "data:text/csv;charset=utf-8," });
    //             const blobURL = window.URL.createObjectURL(blob);
    //             // Create new tag for download file
    //             const anchor = document.createElement("a");
    //             anchor.download = name;
    //             anchor.href = blobURL;
    //             anchor.dataset.downloadurl = ["text/csv", anchor.download, anchor.href].join(
    //                 ":"
    //             );
    //             anchor.click();
    //             // Remove URL.createObjectURL. The browser should not save the reference to the file.
    //             setTimeout(() => {
    //                 // For Firefox it is necessary to delay revoking the ObjectURL
    //                 URL.revokeObjectURL(blobURL);
    //             }, 100);
    //             dispatch({type: action_success, payload: {response: "Donload successfull"}});
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             dispatch({type: action_error, payload: {error: err}});
    //         })
    // };

    return (
        // <button className="border border-primary py-4 px-8 text-primary font-bold rounded-lg focus:outline-none" onClick={downloadCSV}>Download</button>
        <CSVLink data={data} headers={headers} filename={filename}>Download</CSVLink>
    )
}

export default Downloader;