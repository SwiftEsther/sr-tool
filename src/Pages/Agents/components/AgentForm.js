import { Formik } from "formik";
import React, { useState } from "react";

const AgentForm = ({formFields, handleFormSubmit}) => {
    const [formValid, setFormValid] = useState(false);
    const wards = ['LGA', 'LAG'];
    const lgas = ['LGA', 'LAG'];
    const pollingUnits = ['Distrits', 'Districts'];
    let initialValues = {
        pollingUnit: '',
        lga: '',
        ward: '',
        first_name: '',
        last_name: '',
        phoneNumber: ''
    }

    const validate = (values) => {
        console.log(values);
        const errors = {};
        if (!values.first_name) {
            errors.first_name = 'First Name is required';
        }   else if (!values.last_name) {
            errors.last_name = 'Last Name is required';
        }   else if (!values.lga) {
            errors.lga = 'Local Government Area is required is required';
        }   else if(!values.pollingUnit) {
            errors.pollingUnit = 'Polling unit is required';
        }   else if(!values.phoneNumber) {
            errors.phoneNumber = 'Phone number is required';
        }   else {
            setFormValid(true);
        }
        return errors;
    }

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
                            <input
                                type="text"
                                name="first_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.first_name}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="First Name"
                            />
                            {errors.first_name && touched.first_name && <span className="text-xs text-red-600">{errors.first_name}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="last_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.last_name}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Last Name"
                            />
                            {errors.last_name && touched.last_name && <span className="text-xs text-red-600">{errors.last_name}</span>}
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
                                {lgas.map(lga => (<option key={lga} value={lga}>{lga}</option>))}
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
                                {wards.map(ward => (<option key={ward} value={ward}>{ward}</option>))}
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
                                {pollingUnits.map(unit => (<option key={unit} value={unit}>{unit}</option>))}
                            </select>
                            {errors.pollingUnit && touched.pollingUnit && <span className="text-xs text-red-600">{errors.pollingUnit}</span>}
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
                        <div className="flex justify-between items-center">
                            <button type="submit" disabled={isSubmitting || !formValid} className="bg-primary py-4 px-16 text-white font-bold rounded-sm focus:outline-none">
                                {formFields ? 'Update' : 'Add'} Agent
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

export default AgentForm;