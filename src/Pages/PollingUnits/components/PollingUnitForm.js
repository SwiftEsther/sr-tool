import { Formik } from "formik";
import React, { useState } from "react";

const PollingUnitForm = ({formFields, handleFormSubmit}) => {
    const [formValid, setFormValid] = useState(false);
    const states = ['LGA', 'LAG'];
    const lgas = ['LGA', 'LAG'];
    const districts = ['Distrits', 'Districts'];
    const wards = ['Distrits', 'Districts'];
    let initialValues = {
        state: '',
        senatorialDistrict: '',
        name: '',
        number: '',
        lga: '',
        ward: ''
    }

    const validate = (values) => {
        console.log(values);
        const errors = {};
        if (!values.state) {
            errors.state = 'State is required';
        }   else if (!values.lga) {
            errors.lga = 'LGA is required';
        }   else if (!values.ward) {
            errors.ward = 'Ward is required';
        }   else if (!values.senatorialDistrict) {
            errors.senatorialDistrict = 'Senatorial District is required is required';
        }   else if(!values.name) {
            errors.name = 'Polling unit name is required';
        }   else if(!values.number) {
            errors.number = 'Number is required';
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
                            <select 
                                name="state" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.state}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>State</option>
                                {states.map(state => (<option key={state} value={state}>{state}</option>))}
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
                            >
                                <option value='' disabled>Senatorial District</option>
                                {districts.map(district => (<option key={district} value={district}>{district}</option>))}
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
                                <option value='' disabled>LGA</option>
                                {lgas.map(lga => (<option key={lga} value={lga}>{lga}</option>))}
                            </select>
                            {errors.lga && touched.lga && <span className="text-xs text-red-600">{errors.lga}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <select 
                                name="ward" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lga}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm text-darkerGray"
                            >
                                <option value='' disabled>Ward</option>
                                {wards.map(ward => (<option key={ward} value={ward}>{ward}</option>))}
                            </select>
                            {errors.ward && touched.ward && <span className="text-xs text-red-600">{errors.ward}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Polling Unit"
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
                            <button type="submit" disabled={isSubmitting || !formValid} className="bg-primary py-4 px-16 text-white font-bold rounded-sm focus:outline-none">
                                {formFields ? 'Update' : 'Add'} Polling Unit
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

export default PollingUnitForm;
