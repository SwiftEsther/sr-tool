import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import { UserContext, UserController } from '../../contexts/UserContext';
import Layout from '../../shared/Layout';
import UserForm from './components/Userform';
import {users} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';

const CreateUser = ({match}) => {
    const [userState, dispatch] = useContext(UserContext);
    const handleCreate = (values, {setSubmitting}) => {
        dispatch({type: 'CREATE_USER'});
         setSubmitting(true);
         apiRequest(users, 'post', {...values})
            .then((res) => {
                dispatch({type: 'CREATE_USER_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'CREATE_USER_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Users',
                pathname: "/users"}, {id: 2,title: 'Add User',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <UserForm handleFormSubmit={handleCreate}/>
            </div>
        </Layout>
    );
}

export default CreateUser;
