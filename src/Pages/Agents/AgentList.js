import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import Ellipsis from '../../shared/components/Ellipsis';
import {apiRequest} from '../../lib/api.js';
import { showToast } from '../../helpers/showToast';
import { AgentContext } from '../../contexts/AgentContext';
import { deleteAgent } from '../../lib/url';
import Loader from '../../shared/components/Loader';
import Phone from '../../shared/assets/phone.svg';

const AgentList = ({agents, loading, getAgents}) => {
    const [agentState, dispatch] = useContext(AgentContext);
    const [showModal, setShowModal] = useState(false);
    const [currentAgent, setCurrentAgent] = useState('');
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
        dispatch({type: 'DELETE_AGENT'});
         apiRequest(`${deleteAgent}/${currentAgent.id}`, 'delete')
            .then((res) => {
                dispatch({type: 'DELETE_AGENT_SUCCESS', payload: {response: res}});
                setShowModal(false);
                showToast('success', `${res.statusCode}: ${res.statusMessage}`);
                getAgents();
            })
            .catch((err) => {
                dispatch({type: 'DELETE_AGENT_FAILURE', payload: {error: err}});
                setShowModal(false);
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            });
    }

    const triggerDelete = (agent) => {
        setCurrentAgent(agent);
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
                <p className="text-darkerGray font-bold text-lg">Are you sure you want to delete {currentAgent?.name}?</p>
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
                        <div className="table-header-data w-2/12">First Name</div>
                        <div className="table-header-data w-2/12">Last Name</div>
                        <div className="table-header-data w-3/12">Local Government Area</div>
                        <div className="table-header-data w-1/12">Ward</div>
                        <div className="table-header-data w-2/12">Polling Unit</div>
                        <div className="table-header-data w-2/12">Phone Number</div>
                        <div className="table-header-data w-2/10"></div>
                    </div>
                    
                </div>
                {loading ? 
                    <div className="flex justify-center my-6">
                        <Loader />
                    </div> :
                    <div className="table-body">
                        {agents.length > 0 ? 
                            agents.map((agent) => (<div key={agent.id} className="custom-table-row w-full flex">
                                <div className="table-row-data w-2/12">{agent.firstname || ''}</div>
                                <div className="table-row-data w-2/12">{agent.lastname || ''}</div>
                                <div className="table-row-data w-3/12">{agent.lga.name || ''}</div>
                                <div className="table-row-data w-1/12">{agent.ward.name || ''}</div>
                                <div className="table-row-data w-2/12">{agent.pollingUnit.name || ''}</div>
                                <div className="table-row-data w-2/12 flex">{agent.phone || ''}<img src={Phone} className="ml-1 inline"/></div>
                                <div className="table-row-data w-2/12"> 
                                    <span data-tip data-for={`ellipsis-agent-${agent.id}`} data-event='click'>
                                        <Ellipsis />
                                    </span>
                                    <ReactTooltip id={`ellipsis-agent-${agent.id}`} place="bottom" type="light" effect="solid" border borderColor="#979797" clickable={true}>
                                        <Link to={{pathname: `/agents/${agent.id}`, state: {agent: agent}}} className="text-sm text-darkerGray block text-left">Edit</Link>
                                        <button onClick={()=>triggerDelete(agent)} className="text-sm text-textRed block text-left focus:outline-none">Delete</button>
                                    </ReactTooltip>
                                </div>
                            </div>))
                        : <div className="table-row-data w-full text-center my-4">There are no Agents to display</div>}
                    </div>}
            </div>
        </div>
    );
}

export default AgentList;
