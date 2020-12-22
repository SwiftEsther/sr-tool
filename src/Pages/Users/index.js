import React, { useState } from "react";
import { Breadcrumbs, Breadcrumb } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import Layout from "../../shared/Layout";
import UserList from "./UserList";

const Results = ({match}) => {
    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        setSearch(event.target.value);
        console.log(event.target.value)
    }

    return (
        <Layout>
            <Breadcrumbs className="shadow-container w-full px-3.5 pt-7 pb-5 rounded-sm text-2xl font-bold"/>
            <Breadcrumb data={{
                title: 'Users',
                pathname: "/users"
            }}>
                {/* <Breadcrumb data={{
                    title: 'A title',
                    pathname: "/users/create"
                }}>
                    <div>Create USer</div>
                </Breadcrumb> */}
                <div className="my-6 shadow-container pl-3.5 pr-7 py-6">
                    <div className="flex justify-end">
                        <Link className="bg-primary py-4 px-16 text-white font-bold rounded-sm" to="/users/create">
                            Add User
                        </Link>
                    </div>
                    <div className="w-full flex mt-16">
                        <div className="w-1/2">
                            <input className="border border-primary rounded-sm w-9.5/10 py-3 px-2 focus:outline-none" name="search" type="text" value={search} onChange={handleChange} placeholder="Search users by name"/>
                        </div>
                        <div className="w-1/2">
                            <button disabled={search.length < 1} className="bg-primary button-padding py-3.5 text-white font-bold rounded-lg">
                                search
                            </button>
                        </div>
                    </div>
                    <UserList />
                </div>
            </Breadcrumb>
            
        </Layout>
    );
}

export default Results;
