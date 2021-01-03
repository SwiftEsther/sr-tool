import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import UserForm from './components/Userform';
import {users} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { UserContext } from '../../contexts/UserContext';

const UpdateUser = ({match, location}) => {
    const user = {
        first_name: "Esther",
        last_name: "Akinloose",
        email: "esther@mail.com",
        group: "LGA",
        password: "pass"
    }
    console.log(location)
    const [userState, dispatch] = useContext(UserContext);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_USER'});
         setSubmitting(true);
         apiRequest(users, 'put', {...values})
            .then((res) => {
                dispatch({type: 'UPDATE_USER_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_USER_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout location={location}>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Users',
                pathname: "/users"}, {id: 2,title: 'Update',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <UserForm formFields={user} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateUser;
