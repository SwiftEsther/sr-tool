import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs, Breadcrumb } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import { UserContext, UserController } from "../../contexts/UserContext";
import Layout from "../../shared/Layout";
import UserList from "./UserList";
import {users} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';

const Users = ({match, location}) => {
    const [search, setSearch] = useState('');
    const [userState, dispatch] = useContext(UserContext);

    const handleChange = (event) => {
        setSearch(event.target.value);
        console.log(event.target.value)
    }

    const handleSearch = () => {
        dispatch({type: 'GET_USER_BY_NAME'});
        //  setSubmitting(true);
         apiRequest(users, 'get', {params: {code: search}})
            .then((res) => {
                dispatch({type: 'GET_USER_BY_NAME_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_USER_BY_NAME_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
    }

    useEffect(() => {
        dispatch({type: 'GET_USERS'});
        //  setSubmitting(true);
         apiRequest(users, 'get')
            .then((res) => {
                dispatch({type: 'GET_USERS_SUCCESS', payload: {response: res}});
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'GET_USERS_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                // setSubmitting(false);
            });
    }, []);

    return (
        <UserController>
            <Layout location={location}>
                <Breadcrumbs className="shadow-container w-full lg:px-3.5 px-1 pt-7 pb-5 rounded-sm text-2xl font-bold"/>
                <Breadcrumb data={{
                    title: 'Users',
                    pathname: match.path
                }}>
                    <div className="my-6 shadow-container pl-2.5 pr-7 py-6">
                        <div className="flex justify-between px-1 mt-16">
                            <div className="w-8/10 flex items-center px-1">
                                <div className="w-7/10">
                                    <input className="border border-primary rounded-sm w-9.5/10 py-3 px-2 focus:outline-none" name="search" type="text" value={search} onChange={handleChange} placeholder="Search users by name"/>
                                </div>
                                <div className="w-3/10">
                                    <button disabled={search.length < 1} className="bg-primary button-padding py-3.5 text-white font-bold rounded-lg focus:outline-none" onClick={handleSearch}>
                                        search
                                    </button>
                                </div>
                            </div>
                            <Link className="bg-primary py-4 px-16 text-white font-bold rounded-sm" to="/users/create">
                                Add User
                            </Link>
                        </div>
                        <UserList users={userState.users}/>
                    </div>
                </Breadcrumb>
            </Layout>
        </UserController>
    );
}

export default Users;
