import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import Ellipsis from '../../shared/components/Ellipsis';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { deleteIncident } from '../../lib/url';
import Loader from '../../shared/components/Loader';
import { IncidentContext } from '../../contexts/IncidentContext';

const IncidentList = ({incidents, loading}) => {
    const some = incidents || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [incidentState, dispatch] = useContext(IncidentContext);
    const [showModal, setShowModal] = useState(false);
    const [currentIncident, setCurrentIncident] = useState('');
    console.log('some', some)
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
        dispatch({type: 'DELETE_INCIDENT'});
         apiRequest(deleteIncident, 'delete')
            .then((res) => {
                dispatch({type: 'DELETE_INCIDENT_SUCCESS', payload: {response: res}});
                setShowModal(false);
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'DELETE_INCIDENT_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setShowModal(false);
            });
    }

    const triggerDelete = (incident) => {
        setCurrentIncident(incident);
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
                <p className="text-darkerGray font-bold text-lg">Are you sure you want to delete {currentIncident}?</p>
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
                        <div className="table-header-data w-2/12">Incident Type</div>
                        <div className="table-header-data w-2/12">Incident Status</div>
                        <div className="table-header-data w-2/12">Local Government Area</div>
                        <div className="table-header-data w-1/12">Ward</div>
                        <div className="table-header-data w-2/12">Polling Unit</div>
                        <div className="table-header-data w-1/12">Location</div>
                        <div className="table-header-data w-1/12">Description</div>
                        <div className="table-header-data w-1/12"></div>
                    </div>
                    
                </div>
                {loading ? 
                    <div className="flex justify-center my-6">
                        <Loader />
                    </div> :
                    <div className="table-body">
                        {incidents.length > 0 ? 
                            some.map((s) => (<div key={s} className="custom-table-row w-full flex">
                                <div className="table-row-data w-2/12">{s.incidentType || 'LGA'}</div>
                                <div className="table-row-data w-2/12">{s.incidentStatus || 'Kano North'}</div>
                                <div className="table-row-data w-2/12">{s.lga || 'Gwale'}</div>
                                <div className="table-row-data w-1/12">{s.ward || 'KAno North'}</div>
                                <div className="table-row-data w-2/12">{s.pollingUnit || 'Gwale'}</div>
                                <div className="table-row-data w-1/12">{s.location || '1200'}</div>
                                <div className="table-row-data w-1/12">{s.description || '1200'}</div>
                                <div className="table-row-data w-1/12"> 
                                    <span data-tip data-for={`ellipsis-incident-${s.id}`} data-event='click'>
                                        <Ellipsis />
                                    </span>
                                    <ReactTooltip id={`ellipsis-incident-${s.id}`} place="bottom" type="light" effect="solid" border borderColor="#979797" clickable={true}>
                                        <Link to={{pathname: `/incidents/${s.number}`, state: {incident: s}}} className="text-sm text-darkerGray block text-left">Edit</Link>
                                        <button onClick={()=>triggerDelete(s)} className="text-sm text-textRed block text-left focus:outline-none">Delete</button>
                                    </ReactTooltip>
                                </div>
                            </div>))
                        : <div className="table-row-data w-full text-center my-4">There are no incidents to display</div>}
                    </div>}
            </div>
        </div>
    );
}

export default IncidentList;
