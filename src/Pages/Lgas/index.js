import React, { useContext, useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Breadcrumbs, Breadcrumb } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import Layout from "../../shared/Layout";
import {lgas} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import LgaList from "./LgaList";
import { LgaContext, LgaController } from "../../contexts/LgaContext";
import Uploader from "../../shared/components/Uploader";
import Downloader from "../../shared/components/Downloader";

const Lgas = ({match}) => {
    const [search, setSearch] = useState('');
    const [lgaState, dispatch] = useContext(LgaContext);

    const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
 
  // process CSV data
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
 
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            let header = headers[j].split(" ");
            header[0] = header[0].toLowerCase();
            obj[header.join("")] = d;
          }
        }
 
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }

    console.log(headers,list)
 
    // prepare columns list from headers
    // const columns = headers.map(c => ({
    //   name: c,
    //   selector: c,
    // }));
 
    // setData(list);
    // setColumns(columns);

    dispatch({type: 'GET_LGAS_SUCCESS', payload: {response: list}});
        // setSubmitting(false);
  }
 
  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          processData(data);
        // console.log(data)
        };
        reader.readAsBinaryString(file);
    }
  }

    const handleChange = (event) => {
        setSearch(event.target.value);
        console.log(event.target.value)
    }

    useEffect(() => {
        dispatch({type: 'GET_LGAS'});
        //  setSubmitting(true);
         apiRequest(lgas, 'get')
            .then((res) => {
                dispatch({type: 'GET_LGAS_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_LGAS_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
    }, []);

    return (
        <LgaController>
            <Layout>
                <Breadcrumbs className="shadow-container w-full px-3.5 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'Lgas',
                pathname: match.path}]}/>
                <div className="my-6 shadow-container pl-2.5 pr-7 py-6">
                    <div className="flex justify-end px-1">
                        <Link className="bg-primary py-4 px-16 text-white font-bold rounded-sm" to="/lgas/create">
                            Add Lga
                        </Link>
                    </div>
                    <div className="w-full flex mt-16 items-center px-1">
                        <div className="w-1/2">
                            <input className="border border-primary rounded-sm w-9.5/10 py-3 px-2 focus:outline-none" name="search" type="text" value={search} onChange={handleChange} placeholder="Search lgas by name"/>
                        </div>
                        <div className="w-1/2">
                            <button disabled={search.length < 1} className="bg-primary button-padding py-3.5 text-white font-bold rounded-lg focus:outline-none">
                                search
                            </button>
                        </div>
                    </div>
                    <LgaList lgas={lgaState.lgas}/>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex">
                            {/* <button className="bg-primary button-padding py-3.5 px-8 text-white font-bold rounded-lg focus:outline-none mr-3">
                                Bulk Upload
                            </button> */}
                            {/* <input
                                type="file"
                                name="map"
                                onChange={handleFileUpload}
                                onBlur={handleFileUpload}
                                accept=".xlsx, .xls, .csv"
                                className="bulk-upload-btn focus:outline-none w-36 text-white font-bold rounded-lg mr-3"
                                placeholder="Bulk Upload"
                            /> */}
                            <Uploader dispatch={dispatch} action="GET_LGAS_SUCCESS"/>
                            <Downloader dispatch={dispatch} action="GET_LGAS_SUCCESS" />
                            {/* <button className="border border-primary py-4 px-8 text-primary font-bold rounded-lg focus:outline-none" onClick={()=>console.log('Download')}>Download</button> */}
                        </div>
                        <div>
                            Pagination
                        </div>
                    </div>
                </div>
            </Layout>
        </LgaController>
    );
}

export default Lgas;
