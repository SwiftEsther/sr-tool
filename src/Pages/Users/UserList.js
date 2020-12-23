import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Ellipsis from '../../shared/components/Ellipsis';

const UserList = ({users}) => {
    const some = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <div className="py-4 px-1 overflow-auto">
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
                                <Link to={{pathname: `/users/${s}`, state: {user: s}}} className="text-sm text-darkGray block text-left">Edit</Link>
                                <Link to="/" className="text-sm text-textRed block text-left">Delete</Link>
                            </ReactTooltip>
                        </div>
                    </div>))}
                </div>
            </div>
        </div>
    );
}

export default UserList;
