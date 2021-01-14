import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import Ellipsis from '../../shared/components/Ellipsis';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { deleteResult } from '../../lib/url';
import Loader from '../../shared/components/Loader';
import { ResultContext } from '../../contexts/ResultContext';

const ResultList = ({results, loading, getResults}) => {
    const [resultState, dispatch] = useContext(ResultContext);
    const [showModal, setShowModal] = useState(false);
    const [currentResult, setCurrentResult] = useState('');
    const customStyles = {
        overlay: {
            backgroundColor: 'transparent'
        },
        content : {
            top : '50%',
            left : '50%',
            right : 'auto',
            width : '50%',
            bottom : 'auto',
            marginRight : '-50%',
            padding: '29px 16px 40px 36px',
            transform : 'translate(-50%, -50%)'
        }
    };

    const handleDelete = () => {
        dispatch({type: 'DELETE_RESULT'});
         apiRequest(`${deleteResult}/${currentResult.id}`, 'delete')
            .then((res) => {
                dispatch({type: 'DELETE_RESULT_SUCCESS', payload: {response: res}});
                setShowModal(false);
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
                getResults();
            })
            .catch((err) => {
                dispatch({type: 'DELETE_RESULT_FAILURE', payload: {error: err}});
                setShowModal(false);
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Couldn't fetch states. Please try again later."}`)
            });
    }

    const triggerDelete = (result) => {
        setCurrentResult(result);
        openModal();
    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }
    return (
        <div className="py-4 px-1 overflow-auto">
        <Modal
          isOpen={showModal}
          style={customStyles}
          onRequestClose={closeModal}
          contentLabel="Delete Modal"
        >
            <div className="flex justify-between items-center mb-12">
                <p className="text-darkerGray font-bold text-lg">Are you sure you want to delete {currentResult?.name}?</p>
                <button onClick={closeModal} className="focus:outline-none">close</button>
            </div>
          
          <div className="text-center my-4">Kindly note that this action is not reversible</div>
            <div className="flex justify-between items-center">
                <button className="bg-textRed py-4 px-16 text-white font-bold rounded-sm focus:outline-none" onClick={handleDelete}>Delete</button>
                <button className="border border-primary py-4 px-16 text-primary font-bold rounded-sm focus:outline-none" onClick={closeModal}>Cancel</button>
            </div>
        </Modal>
            <div className="table">
                <div className="table-header">
                    <div className="custom-table-row w-full flex">
                        <div className="table-header-data w-1/12">Voting Level</div>
                        <div className="table-header-data w-2/12">Senatorial District</div>
                        <div className="table-header-data w-2/12">Local Government Area</div>
                        <div className="table-header-data w-1/12">Ward</div>
                        <div className="table-header-data w-2/12">Polling Unit</div>
                        <div className="table-header-data w-1/12">APC</div>
                        <div className="table-header-data w-1/12">PDP</div>
                        <div className="table-header-data w-2/12">Other Parties</div>
                        <div className="table-header-data w-1/12"></div>
                    </div>
                    
                </div>
                {loading ? 
                    <div className="flex justify-center my-6">
                        <Loader />
                    </div> :
                    <div className="table-body">
                        {results.length > 0 ? 
                            results.map((result) => (<div key={result.id} className="custom-table-row w-full flex">
                                <div className="table-row-data w-1/12">{result.votingLevel.name || ''}</div>
                                <div className="table-row-data w-2/12">{result.senatorialDistrict.name || ''}</div>
                                <div className="table-row-data w-2/12">{result.lga.name || ''}</div>
                                <div className="table-row-data w-1/12">{result.ward.name || ''}</div>
                                <div className="table-row-data w-2/12">{result.pollingUnit.name || ''}</div>
                                <div className="table-row-data w-1/12">{result.apc || ''}</div>
                                <div className="table-row-data w-1/12">{result.pdp || ''}</div>
                                <div className="table-row-data w-2/12">{result.others || ''}</div>
                                <div className="table-row-data w-1/12"> 
                                    <span data-tip data-for={`ellipsis-result-${result.id}`} data-event='click'>
                                        <Ellipsis />
                                    </span>
                                    <ReactTooltip id={`ellipsis-result-${result.id}`} place="bottom" type="light" effect="solid" border borderColor="#979797" clickable={true}>
                                        <Link to={{pathname: `/results/${result.id}`, state: {result: result}}} className="text-sm text-darkerGray block text-left">Edit</Link>
                                        <button onClick={()=>triggerDelete(result)} className="text-sm text-textRed block text-left focus:outline-none">Delete</button>
                                    </ReactTooltip>
                                </div>
                            </div>))
                        : <div className="table-row-data w-full text-center my-4">There are no Results to display</div>}
                    </div>}
            </div>
        </div>
    );
}

export default ResultList;
