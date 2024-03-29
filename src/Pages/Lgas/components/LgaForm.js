import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { showToast } from "../../../helpers/showToast";
import { apiRequest } from "../../../lib/api";
import { allStates, getSenatorialDistrictsByStateId } from "../../../lib/url";

const LgaForm = ({formFields, handleFormSubmit}) => {
    const [formValid, setFormValid] = useState(false);
    const [states, setStates] = useState([]);
    const [senatorialDistricts, setSenatorialDistricts] = useState([]);
    let initialValues = {
        state: '',
        senatorialDistrict: '',
        name: '',
        number: ''
    }
    const [init, setInit] = useState(initialValues);

    const validate = (values) => {
        console.log(values);
        const errors = {};
        if (!values.state) {
            errors.state = 'State is required';
        }   else if (!values.senatorialDistrict) {
            errors.senatorialDistrict = 'Senatorial District is required is required';
        }   else if(!values.name) {
            errors.name = 'LGA name is required';
        }   else if(!values.number) {
            errors.number = 'Number is required';
        }   else {
            setFormValid(true);
        }
        return errors;
    }

    const getStates = () => {
        apiRequest(allStates, 'get')
            .then(res => {
                setStates(res.states);
            })
            .catch(err => {
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            })
    }

    const getSenatorialDistricts = (stateId) => {
        if(stateId){apiRequest(`${getSenatorialDistrictsByStateId}/${stateId}`, 'get')
            .then(res => {
                console.log(res)
                setSenatorialDistricts(res.senatorialDistricts);
            })
            .catch(err => {
                showToast('error', `${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`)
            })}
    }

    const handleStateChange = (event, setFieldValue) => {
        const state =  event.currentTarget.value;
        console.log(state)
        setFieldValue("state", state);
        getSenatorialDistricts(state);
    }

    useEffect(() => {
        setInit(formFields);
        getStates();
    }, []);

    useEffect(() => {
        getSenatorialDistricts(init?.state);
    }, [init])

    return (
        <div className="lg:w-3/10 w-full">
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
                                name="state" 
                                onChange={(e)=>handleStateChange(e, setFieldValue)}
                                onBlur={(e)=>handleStateChange(e,setFieldValue)}
                                value={values.state}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>State</option>
                                {states.map(state => (<option key={state.id} value={state.id}>{state.name}</option>))}
                            </select>
                            {errors.state && touched.state && <span className="text-xs text-red-600">{errors.state}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <select 
                                name="senatorialDistrict" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.senatorialDistrict}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                                disabled={!values.state}
                            >
                                <option value='' disabled>Senatorial District</option>
                                {senatorialDistricts.map(district => (<option key={district.id} value={district.id}>{district.name}</option>))}
                            </select>
                            {errors.senatorialDistrict && touched.senatorialDistrict && <span className="text-xs text-red-600">{errors.senatorialDistrict}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Local Government Area"
                            />
                            {errors.name && touched.name && <span className="text-xs text-red-600">{errors.name}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.number}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Number"
                            />
                            {errors.number && touched.number && <span className="text-xs text-red-600">{errors.number}</span>}
                        </div>
                        <div className="flex justify-between items-center">
                            <button type="submit" disabled={isSubmitting || !formValid} className="bg-primary py-4 text-white font-bold rounded-sm focus:outline-none w-4/10">
                                {formFields ? 'Update' : 'Add'} LGA
                            </button>
                            <button className="border border-primary py-4 text-primary font-bold rounded-sm focus:outline-none w-4/10" onClick={handleReset} >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default LgaForm;
