import React, { useContext } from 'react';
import { Breadcrumbs } from 'react-breadcrumbs';
import Layout from '../../shared/Layout';
import {updateResult} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import ResultForm from './components/ResultForm';
import { ResultContext } from '../../contexts/ResultContext';

const UpdateResult = ({match, location}) => {
    console.log(location)
    const [resultState, dispatch] = useContext(ResultContext);
    const handleUpdate = (values, {setSubmitting}) => {
        dispatch({type: 'UPDATE_RESULT'});
         setSubmitting(true);
         apiRequest(updateResult, 'put', {...values})
            .then((res) => {
                dispatch({type: 'UPDATE_RESULT_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'UPDATE_RESULT_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setSubmitting(false);
            });
    }
    return (
        <Layout>
            <Breadcrumbs className="w-full px-3.5 pt-7 pb-5 text-2xl font-bold" setCrumbs={() => [{id: 1,title: 'Results',
                pathname: "/results"}, {id: 2,title: 'Update Result',
                pathname: match.path}]}/>
            <div className="py-9 px-3.5">
                <ResultForm formFields={location.state.result} handleFormSubmit={handleUpdate}/>
            </div>
        </Layout>
    );
}

export default UpdateResult;
