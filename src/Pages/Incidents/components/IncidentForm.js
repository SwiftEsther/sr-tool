import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { showToast } from "../../../helpers/showToast";
import { apiRequest } from "../../../lib/api";
import { getPollingUnitsByWardId, getWardsByLgaId, getLgasByStateId, allIncidentLevels, allIncidentTypes, allIncidentStatuses } from "../../../lib/url";

const IncidentForm = ({formFields, handleFormSubmit}) => {
    const [formValid, setFormValid] = useState(false);
    const [wards, setWards] = useState([]);
    const [lgas, setLgas] = useState([]);
    const [pollingUnits, setPollingUnits] = useState([]);
    const [incidentLevels, setIncidentLevels] = useState([]);
    const [incidentTypes, setIncidentTypes] = useState([]);
    const incidentStatuses = ['Resolved', 'Unresolved'];
    let initialValues = {
        pollingUnit: '',
        lga: '',
        ward: '',
        incidentLevel: '',
        incidentType: '',
        incidentStatus: '',
        location: '',
        phoneNumber: '',
        description: ''
    }

    const [init, setInit] = useState(initialValues);

    const validate = (values) => {
        console.log(values);
        const errors = {};
        if (!values.ward) {
            errors.ward = 'Ward is required';
        }   else if (!values.incidentLevel) {
            errors.incidentLevel = 'Incident Level is required';
        }   else if (!values.incidentType) {
            errors.incidentType = 'Incident Type is required';
        }   else if (!values.incidentStatus) {
            errors.incidentStatus = 'Incident Status is required';
        }   else if (!values.lga) {
            errors.lga = 'Local Government Area is required is required';
        }   else if(!values.pollingUnit) {
            errors.pollingUnit = 'Polling unit is required';
        }   else if(!values.location) {
            errors.location = 'Location is required';
        }   else if(!values.phoneNumber) {
            errors.phoneNumber = 'Phone Number is required';
        }   else if(!values.description) {
            errors.description = 'Description is required';
        }   else {
            setFormValid(true);
        }
        return errors;
    }

    const getIncidentLevels = () => {
        apiRequest(`${allIncidentLevels}`, 'get')
            .then(res => {
                setIncidentLevels(res.incidentLevels);
            })
            .catch(err => {
                showToast('error', `${err.response?.data.statusCode || "Error"}: ${err.response?.data.statusMessage || "Couldn't fetch incident levels. Please try again later."}`)
            })
    }

    const getIncidentTypes = () => {
        apiRequest(`${allIncidentTypes}`, 'get')
            .then(res => {
                setIncidentTypes(res.incidentTypes);
            })
            .catch(err => {
                showToast('error', `${err.response?.data.statusCode || "Error"}: ${err.response?.data.statusMessage || "Couldn't fetch incident types. Please try again later."}`)
            })
    }

    const getLgas = (stateId=6) => {
        if(stateId) {apiRequest(`${getLgasByStateId}/${stateId}`, 'get')
            .then(res => {
                setLgas(res.lgas);
            })
            .catch(err => {
                showToast('error', `${err.response?.data.statusCode || "Error"}: ${err.response?.data.statusMessage || "Couldn't fetch lgas. Please try again later."}`)
            })}
    }

    const getWards = (lgaId) => {
        if(lgaId) {apiRequest(`${getWardsByLgaId}/${lgaId}`, 'get')
            .then(res => {
                setWards(res.wards);
            })
            .catch(err => {
                showToast('error', `${err.response?.data.statusCode || "Error"}: ${err.response?.data.statusMessage || "Couldn't fetch wards. Please try again later."}`)
            })}
    }

    const getPollingUnits = (wardId) =>{
        if(wardId){apiRequest(`${getPollingUnitsByWardId}/${wardId}`, 'get')
            .then((res) => {
                setPollingUnits(res.pollingUnits)
            })
            .catch((err) => {
                showToast('error', `${err.response?.data.statusCode || "Error"}: ${err.response?.data.statusMessage || "Couldn't fetch wards. Please try again later."}`)
            });}
    }

    const handleLgaChange = (event, setFieldValue) => {
        const lga =  event.currentTarget.value;
        console.log(lga)
        setFieldValue("lga", lga);
        getWards(lga);
    }

    const handleWardChange = (event, setFieldValue) => {
        const ward =  event.currentTarget.value;
        console.log(ward)
        setFieldValue("ward", ward);
        getPollingUnits(ward);
    }

    useEffect(() => {
        getIncidentLevels();
        getIncidentTypes();
    }, []);

    useEffect(() => {
        getIncidentLevels();
        getIncidentTypes();
        getLgas();
        getWards(init?.lga);
        getPollingUnits(init?.ward);
    }, [init]);

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
                    setFieldValue
                }) => (
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="mt-4 mb-12">
                            <select 
                                name="incidentLevel" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.incidentLevel}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Incident Level</option>
                                {incidentLevels.map(incidentLevel => (<option key={incidentLevel.id} value={incidentLevel.id}>{incidentLevel.name}</option>))}
                            </select>
                            {errors.incidentLevel && touched.incidentLevel && <span className="text-xs text-red-600">{errors.incidentLevel}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <select 
                                name="incidentType" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.incidentType}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Incident Type</option>
                                {incidentTypes.map(type => (<option key={type.id} value={type.id}>{type.name}</option>))}
                            </select>
                            {errors.incidentType && touched.incidentType && <span className="text-xs text-red-600">{errors.incidentType}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <select 
                                name="incidentStatus" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.incidentStatus}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Incident Status</option>
                                {incidentStatuses.map((status, index) => (<option key={index} value={status}>{status}</option>))}
                            </select>
                            {errors.incidentStatus && touched.incidentStatus && <span className="text-xs text-red-600">{errors.incidentStatus}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <select 
                                name="lga" 
                               onChange={(e)=>handleLgaChange(e, setFieldValue)}
                                onBlur={(e)=>handleLgaChange(e, setFieldValue)}
                                value={values.lga}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Local Government Area</option>
                                {lgas.map(lga => (<option key={lga.id} value={lga.id}>{lga.name}</option>))}
                            </select>
                            {errors.lga && touched.lga && <span className="text-xs text-red-600">{errors.lga}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <select 
                                name="ward" 
                                onChange={(e)=>handleWardChange(e, setFieldValue)}
                                onBlur={(e)=>handleWardChange(e, setFieldValue)}
                                value={values.ward}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Ward</option>
                                {wards.map(ward => (<option key={ward.id} value={ward.id}>{ward.name}</option>))}
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
                                {pollingUnits.map(unit => (<option key={unit.id} value={unit.id}>{unit.name}</option>))}
                            </select>
                            {errors.pollingUnit && touched.pollingUnit && <span className="text-xs text-red-600">{errors.pollingUnit}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="location"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.location}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Location"
                            />
                            {errors.location && touched.location && <span className="text-xs text-red-600">{errors.location}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="phoneNumber"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phoneNumber}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Phone Number"
                            />
                            {errors.phoneNumber && touched.phoneNumber && <span className="text-xs text-red-600">{errors.phoneNumber}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <textarea
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Description"
                            />
                            {errors.description && touched.description && <span className="text-xs text-red-600">{errors.description}</span>}
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <button type="submit" disabled={isSubmitting || !formValid} className="bg-primary py-4 text-white font-bold rounded-sm focus:outline-none w-4.5/10">
                                {formFields ? 'Update' : 'Add'} Incident
                            </button>
                            <button className="border border-primary py-4 text-primary font-bold rounded-sm focus:outline-none w-4.5/10" onClick={handleReset} >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default IncidentForm;
