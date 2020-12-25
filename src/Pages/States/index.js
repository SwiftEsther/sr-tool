import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs, Breadcrumb } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import { StateContext, StateController } from "../../contexts/StateContext";
import Layout from "../../shared/Layout";
import StateList from "./StateList";
import {states} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';

const States = ({match}) => {
    const [search, setSearch] = useState('');
    const [state, dispatch] = useContext(StateContext);

    const handleChange = (event) => {
        setSearch(event.target.value);
        console.log(event.target.value)
    }

    useEffect(() => {
        dispatch({type: 'GET_STATES'});
        //  setSubmitting(true);
         apiRequest(states, 'get')
            .then((res) => {
                dispatch({type: 'GET_STATES_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_STATES_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
    }, []);

    return (
        <StateController>
            <Layout>
                <Breadcrumbs className="shadow-container w-full px-3.5 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Election Territories',
                pathname: "/territories"}, {id: 2,title: 'States',
                pathname: match.path}]}/>
                <div className="my-6 shadow-container pl-2.5 pr-7 py-6">
                    <div className="flex justify-end px-1">
                        <Link className="bg-primary py-4 px-16 text-white font-bold rounded-sm" to="/territories/states/create">
                            Add State
                        </Link>
                    </div>
                    <div className="w-full flex mt-16 items-center px-1">
                        <div className="w-1/2">
                            <input className="border border-primary rounded-sm w-9.5/10 py-3 px-2 focus:outline-none" name="search" type="text" value={search} onChange={handleChange} placeholder="Search states by name"/>
                        </div>
                        <div className="w-1/2">
                            <button disabled={search.length < 1} className="bg-primary button-padding py-3.5 text-white font-bold rounded-lg focus:outline-none">
                                search
                            </button>
                        </div>
                    </div>
                    <StateList />
                </div>
            </Layout>
        </StateController>
    );
}

export default States;