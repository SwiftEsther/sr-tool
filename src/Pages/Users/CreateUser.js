import React from 'react';
import { Breadcrumb, Breadcrumbs } from 'react-breadcrumbs';
import Users from '.';
import Layout from '../../shared/Layout';

const CreateUser = ({match}) => {
    console.log(match);
    return (
        <Layout>
            <Breadcrumbs className="shadow-container w-full px-3.5 pt-7 pb-5 rounded-sm text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Users',
                pathname: "/users"}, {id: 2,title: 'Add User',
                pathname: match.path}]}/>
            {/* <Breadcrumb data={{
                title: 'Create',
                pathname: "/users/create"
            }}>
                <div>Create User Form</div>
            </Breadcrumb> */}
            
        </Layout>
    );
}

export default CreateUser;
