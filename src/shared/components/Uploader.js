import axios from 'axios';
import React from 'react';
import * as XLSX from 'xlsx';
import { showToast } from '../../helpers/showToast';

const Uploader = ({dispatch, action, action_success, action_error, url, refresh}) => {
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

    dispatch({type: action, payload: {response: list}});
        // setSubmitting(false);
  }
 
  // handle file upload
  const handleFileUpload = async e => {
    const file = e.target.files[0];
    if(file) {
      e.preventDefault();
        let formData = new FormData();
        formData.append('file', file)
        dispatch({type: action});
         await axios({
             method: 'post',
             url: url,
             data: formData,
             headers: {
                'Content-Type': 'multipart/form-data'
             }
         })
            .then((res) => {
                dispatch({type: action_success, payload: {response: res}});
                showToast('success', `${res.statusCode || 'Success'}: ${res.statusMessage || 'Data imported successfully'}`);
                refresh();
            })
            .catch((err) => {
                dispatch({type: action_error, payload: {error: err}});
                showToast('error', `${err.response?.data.statusCode || ""}: ${err.response?.data.statusMessage || "Something went wrong while importing data. Please try again later."}`);
            });
    } else {
      showToast('error', 'Kindly pick a file to upload');
    }
    
    // if(file){
        // const reader = new FileReader();
        // reader.onload = (evt) => {
        // /* Parse data */
        // const bstr = evt.target.result;
        // const wb = XLSX.read(bstr, { type: 'binary' });
        // /* Get first worksheet */
        // const wsname = wb.SheetNames[0];
        // const ws = wb.Sheets[wsname];
        // /* Convert array of arrays */
        // const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        //   processData(data);
        // // console.log(data)
        // };
        // reader.readAsBinaryString(file);
    // }
  }
  return (
    <input
        type="file"
        name="map"
        onChange={handleFileUpload}
        // onBlur={handleFileUpload}
        accept=".xlsx, .xls, .csv"
        className="bulk-upload-btn focus:outline-none w-36 text-white font-bold rounded-lg mr-3"
        placeholder="Bulk Upload"
    />
  )
}

export default Uploader;