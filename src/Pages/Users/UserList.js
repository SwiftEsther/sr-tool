import React from 'react';

const UserList = ({users}) => {
    return (
        <div className="py-4">
            <div className="table">
                <div className="table-header">
                    <div className="table-header-data w-2/10">First Name</div>
                    <div className="table-header-data w-2/10">Last Name</div>
                    <div className="table-header-data w-2/10">Email</div>
                    <div className="table-header-data w-2/10">Group</div>
                    <div className="table-header-data w-2/10"></div>
                </div>
                <div className="table-body">
                    <div className="custom-table-row w-full">
                        <div className="table-row-data w-2/10">Esther</div>
                        <div className="table-row-data w-2/10">Akinloose</div>
                        <div className="table-row-data w-2/10">esther.akinloose@gmail.com</div>
                        <div className="table-row-data w-2/10">Administrator</div>
                        <div className="table-row-data w-2/10">ellipsis</div>
                    </div>

                    <div className="custom-table-row w-full">
                        <div className="table-row-data w-2/10">Esther</div>
                        <div className="table-row-data w-2/10">Akinloose</div>
                        <div className="table-row-data w-2/10">esther.akinloose@gmail.com</div>
                        <div className="table-row-data w-2/10">Administrator</div>
                        <div className="table-row-data w-2/10">ellipsis</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserList;
