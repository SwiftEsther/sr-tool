import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { showToast } from "../../../helpers/showToast";
import { apiRequest } from "../../../lib/api";
import { allLgas, allPollingUnits, allWards } from "../../../lib/url";

const ResultForm = ({formFields, handleFormSubmit}) => {
    const [formValid, setFormValid] = useState(false);
    const [wards, setWards] = useState([]);
    const [lgas, setLgas] = useState([]);
    const [pollingUnits, setPollingUnits] = useState([]);
    const [votingLevels, setVotingLevels] = useState([]);
    const [agents, setAgents] = useState([]);
    const [senatorialDistricts, setSenatorialDistricts] = useState([]);
    let initialValues = {
        pollingUnit: '',
        lga: '',
        ward: '',
        votingLevel: '',
        senatorialDistrict: '',
        partyAgent: '',
        registeredVoters: '',
        accreditedVoters: '',
        pdp: '',
        apc: '',
        anpp: '',
        others: ''
    }

    const validate = (values) => {
        console.log(values);
        const errors = {};
        if (!values.ward) {
            errors.ward = 'Ward is required';
        }   else if (!values.votingLevel) {
            errors.votingLevel = 'Voting Level is required';
        }   else if (!values.lga) {
            errors.lga = 'Local Government Area is required is required';
        }   else if(!values.pollingUnit) {
            errors.pollingUnit = 'Polling unit is required';
        }   else if(!values.registeredVoters) {
            errors.registeredVoters = 'Registered Voters is required';
        }   else if(!values.accreditedVoters) {
            errors.accreditedVoters = 'Accredited Voters is required';
        }   else if(!values.pdp) {
            errors.pdp = 'PDP Votes is required';
        }   else if(!values.apc) {
            errors.apc = 'APC Votes is required';
        }   else if(!values.anpp) {
            errors.anpp = 'ANPP Votes is required';
        }   else if(!values.others) {
            errors.others = 'Other Votes is required';
        }   else {
            setFormValid(true);
        }
        return errors;
    }

    const getLgas = () =>{
        apiRequest(allLgas, 'get')
            .then((res) => {
                setLgas(res.lgas)
            })
            .catch((err) => {
                showToast('error', 'Couldn\'t fetch Local Government Areas. Kindly reload the page')
            });
    }

    const getWards = () =>{
        apiRequest(allWards, 'get')
            .then((res) => {
                setWards(res.wards)
            })
            .catch((err) => {
                showToast('error', 'Couldn\'t fetch Wards. Kindly reload the page')
            });
    }

    const getPollingUnits = () =>{
        apiRequest(allPollingUnits, 'get')
            .then((res) => {
                setPollingUnits(res.pollingUnits)
            })
            .catch((err) => {
                showToast('error', 'Couldn\'t fetch Polling Units. Kindly reload the page');
            });
    }

    useEffect(() => {
        getLgas();
        getWards();
        getPollingUnits();
    }, []);

    return (
        <div className="w-3/10">
            <Formik
                initialValues={formFields || initialValues}
                validate={values => validate(values)}
                onSubmit={handleFormSubmit}
                handleReset
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleReset,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="mt-4 mb-12">
                            <select 
                                name="votingLevel" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.votingLevel}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Voting Level</option>
                                {votingLevels.map(votingLevel => (<option key={votingLevel.id} value={votingLevel.code}>{votingLevel.name}</option>))}
                            </select>
                            {errors.votingLevel && touched.votingLevel && <span className="text-xs text-red-600">{errors.votingLevel}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <select 
                                name="partyAgent" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.partyAgent}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Party Agent</option>
                                {agents.map(agent => (<option key={agent.id} value={agent.code}>{agent.name}</option>))}
                            </select>
                            {errors.partyAgent && touched.partyAgent && <span className="text-xs text-red-600">{errors.partyAgent}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <select 
                                name="senatorialDistrict" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.senatorialDistrict}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Senatorial District</option>
                                {senatorialDistricts.map(district => (<option key={district.id} value={district.code}>{district.name}</option>))}
                            </select>
                            {errors.senatorialDistrict && touched.senatorialDistrict && <span className="text-xs text-red-600">{errors.senatorialDistrict}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <select 
                                name="lga" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lga}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Local Government Area</option>
                                {lgas.map(lga => (<option key={lga.id} value={lga.code}>{lga.name}</option>))}
                            </select>
                            {errors.lga && touched.lga && <span className="text-xs text-red-600">{errors.lga}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <select 
                                name="ward" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.ward}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Ward</option>
                                {wards.map(ward => (<option key={ward.id} value={ward.code}>{ward.name}</option>))}
                            </select>
                            {errors.ward && touched.ward && <span className="text-xs text-red-600">{errors.ward}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <select 
                                name="pollingUnit" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pollingUnit}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Polling Unit</option>
                                {pollingUnits.map(unit => (<option key={unit.id} value={unit.code}>{unit.name}</option>))}
                            </select>
                            {errors.pollingUnit && touched.pollingUnit && <span className="text-xs text-red-600">{errors.pollingUnit}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="registeredVoters"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.registeredVoters}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Registered Voters"
                            />
                            {errors.registeredVoters && touched.registeredVoters && <span className="text-xs text-red-600">{errors.registeredVoters}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="accreditedVoters"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.accreditedVoters}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Accredited Voters"
                            />
                            {errors.accreditedVoters && touched.accreditedVoters && <span className="text-xs text-red-600">{errors.accreditedVoters}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="pdp"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pdp}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="PDP Votes"
                            />
                            {errors.pdp && touched.pdp && <span className="text-xs text-red-600">{errors.pdp}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="apc"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.apc}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="APC Votes"
                            />
                            {errors.apc && touched.apc && <span className="text-xs text-red-600">{errors.apc}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="anpp"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.anpp}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="ANPP Votes"
                            />
                            {errors.anpp && touched.anpp && <span className="text-xs text-red-600">{errors.anpp}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="others"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.others}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Other Votes"
                            />
                            {errors.others && touched.others && <span className="text-xs text-red-600">{errors.others}</span>}
                        </div>
                        <div className="flex justify-between items-center">
                            <button type="submit" disabled={isSubmitting || !formValid} className="bg-primary py-4 px-16 text-white font-bold rounded-sm focus:outline-none">
                                {formFields ? 'Update' : 'Add'} Result
                            </button>
                            <button className="border border-primary py-4 px-16 text-primary font-bold rounded-sm focus:outline-none" onClick={handleReset} >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default ResultForm;
