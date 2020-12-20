import React from "react";
import SideNav from "./SideNav";

const Layout = ({children}) => {
    return (
        <div>
            <div>
                <SideNav />
                <div className="ml-44 pl-1.5 pt-2.5 pr-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;
