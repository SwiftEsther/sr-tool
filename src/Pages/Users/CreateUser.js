import React from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import UserForm from './components/Userform';

const CreateUser = ({match}) => {
    console.log(match);
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Users',
                pathname: "/users"}, {id: 2,title: 'Add User',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <UserForm />
            </div>
        </Layout>
    );
}

export default CreateUser;
