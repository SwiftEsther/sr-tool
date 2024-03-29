import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import Ellipsis from '../../shared/components/Ellipsis';
import {users} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { UserContext } from '../../contexts/UserContext';

const UserList = ({}) => {
    const some = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [userState, dispatch] = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
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
        dispatch({type: 'DELETE_USER'});
         apiRequest(users, 'delete')
            .then((res) => {
                dispatch({type: 'DELETE_USER_SUCCESS', payload: {response: res}});
                setShowModal(false);
                // setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'DELETE_USER_FAILURE', payload: {error: err}});
                showToast('error', 'Something went wrong. Please try again later')
                setShowModal(false);
            });
    }

    const triggerDelete = (user) => {
        setCurrentUser(user);
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
                <p className="text-darkerGray font-bold text-lg">Are you sure you want to delete {currentUser}?</p>
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
                        <div className="table-header-data w-2/10">First Name</div>
                        <div className="table-header-data w-2/10">Last Name</div>
                        <div className="table-header-data w-2/10">Email</div>
                        <div className="table-header-data w-2/10">Group</div>
                        <div className="table-header-data w-2/10"></div>
                    </div>
                    
                </div>
                <div className="table-body">
                    {some.map((s) => (<div key={s} className="custom-table-row w-full flex">
                        <div className="table-row-data w-2/10">Esther</div>
                        <div className="table-row-data w-2/10">Akinloose</div>
                        <div className="table-row-data w-2/10">esther.akinloose@gmail.com</div>
                        <div className="table-row-data w-2/10">Administrator</div>
                        <div className="table-row-data w-2/10"> 
                            <span data-tip data-for={`ellipsis-user-${s}`} data-event='click'>
                                <Ellipsis />
                            </span>
                            <ReactTooltip id={`ellipsis-user-${s}`} place="bottom" type="light" effect="solid" border borderColor="#979797" clickable={true}>
                                <Link to={{pathname: `/users/${s}`, state: {user: s}}} className="text-sm text-darkerGray block text-left">Edit</Link>
                                <button onClick={()=>triggerDelete(s)} className="text-sm text-textRed block text-left focus:outline-none">Delete</button>
                            </ReactTooltip>
                        </div>
                    </div>))}
                </div>
            </div>
        </div>
    );
}

export default UserList;
