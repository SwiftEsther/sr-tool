import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import Ellipsis from '../../shared/components/Ellipsis';
import {lgas} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { LgaContext } from '../../contexts/LgaContext';

const LgaList = ({lgas}) => {
    const some = lgas || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [lgaState, dispatch] = useContext(LgaContext);
    const [showModal, setShowModal] = useState(false);
    const [currentLga, setCurrentLga] = useState('');
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
        dispatch({type: 'DELETE_LGA'});
         apiRequest(lgas, 'delete')
            .then((res) => {
                dispatch({type: 'DELETE_LGA_SUCCESS', payload: {response: res}});
                setShowModal(false);
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'DELETE_LGA_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setShowModal(false);
            });
    }

    const triggerDelete = (lga) => {
        setCurrentLga(lga);
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
                <p className="text-darkerGray font-bold text-lg">Are you sure you want to delete {currentLga}?</p>
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
                        <div className="table-header-data w-2/10">LGA</div>
                        <div className="table-header-data w-2/10">Senatorial District</div>
                        <div className="table-header-data w-2/10">State</div>
                        <div className="table-header-data w-2/10">Number</div>
                        <div className="table-header-data w-2/10"></div>
                    </div>
                    
                </div>
                <div className="table-body">
                    {lgas.length > 0 ? 
                        some.map((s) => (<div key={s} className="custom-table-row w-full flex">
                            <div className="table-row-data w-2/10">{s.lga || 'LGA'}</div>
                            <div className="table-row-data w-2/10">{s.senatorialDistrict || 'KAno North'}</div>
                            <div className="table-row-data w-2/10">{s.state || 'Gwale'}</div>
                            <div className="table-row-data w-2/10">{s.number || 1200}</div>
                            <div className="table-row-data w-2/10"> 
                                <span data-tip data-for={`ellipsis-lga-${s.number}`} data-event='click'>
                                    <Ellipsis />
                                </span>
                                <ReactTooltip id={`ellipsis-lga-${s.number}`} place="bottom" type="light" effect="solid" border borderColor="#979797" clickable={true}>
                                    <Link to={{pathname: `/territories/lgas/${s.number}`, state: {lga: s}}} className="text-sm text-darkerGray block text-left">Edit</Link>
                                    <button onClick={()=>triggerDelete(s)} className="text-sm text-textRed block text-left focus:outline-none">Delete</button>
                                </ReactTooltip>
                            </div>
                        </div>))
                    : <div className="table-row-data w-full text-center my-4">There are no LGAs to display</div>}
                </div>
            </div>
        </div>
    );
}

export default LgaList;
