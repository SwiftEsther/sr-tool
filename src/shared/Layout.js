import React from "react";
import SideNav from "./SideNav";

const Layout = ({children, location}) => {
    return (
        <div id="layout">
            <div>
                <SideNav location={location}/>
                <div className="lg:ml-52 ml-2 pl-1.5 pt-2.5 pr-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;
