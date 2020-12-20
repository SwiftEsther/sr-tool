import React from "react";
import { Breadcrumbs, Breadcrumb } from "react-breadcrumbs";
import Layout from "../../shared/Layout";

const Results = ({match}) => {
    return (
        <Layout>
            <Breadcrumbs className="breadcrumbs-container w-full px-3.5 pt-7 pb-5 rounded-sm text-2xl font-bold"/>
            <Breadcrumb data={{
                title: 'A title',
                pathname: "/"
            }}>
                <Breadcrumb data={{
                title: 'A title',
                pathname: "/some"
            }}>
                <div>Results Page</div>
            </Breadcrumb>
                <div>Results Page</div>
            </Breadcrumb>
            
        </Layout>
    );
}

export default Results;
