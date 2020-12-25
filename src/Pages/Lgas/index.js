import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs, Breadcrumb } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import Layout from "../../shared/Layout";
import {lgas} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import LgaList from "./LgaList";
import { LgaContext, LgaController } from "../../contexts/LgaContext";

const Lgas = ({match}) => {
    const [search, setSearch] = useState('');
    const [lgaState, dispatch] = useContext(LgaContext);

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
                            <button className="bg-primary button-padding py-3.5 px-8 text-white font-bold rounded-lg focus:outline-none mr-3">
                                Bulk Upload
                            </button>
                            <button className="border border-primary py-4 px-8 text-primary font-bold rounded-lg focus:outline-none" onClick={()=>console.log('Download')}>Download</button>
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
