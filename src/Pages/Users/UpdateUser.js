import React from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import UserForm from './components/Userform';

const UpdateUser = ({match}) => {
    const user = {
        first_name: "Esther",
        last_name: "Akinloose",
        email: "esther@mail.com",
        group: "LGA",
        password: "pass"
    }
    console.log(match);
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Users',
                pathname: "/users"}, {id: 2,title: 'Update',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <UserForm formFields={user}/>
            </div>
        </Layout>
    );
}

export default UpdateUser;
