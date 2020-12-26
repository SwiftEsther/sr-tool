import { Formik } from "formik";
import React, { useState } from "react";

const LgaForm = ({formFields, handleFormSubmit}) => {
    const [formValid, setFormValid] = useState(false);
    const states = ['LGA', 'LAG'];
    const districts = ['Distrits', 'Districts'];
    let initialValues = {
        state: '',
        senatorialDistrict: '',
        name: '',
        number: ''
    }

    const validate = (values) => {
        console.log(values);
        const errors = {};
        if (!values.state) {
            errors.first_name = 'State is required';
        }   else if (!values.senatorialDistrict) {
            errors.senatorialDistrict = 'Senatorial District is required is required';
        }   else if(!values.name) {
            errors.group = 'LGA name is required';
        }   else if(!values.number) {
            errors.password = 'Number is required';
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
                            <button type="submit" disabled={isSubmitting || !formValid} className="bg-primary py-4 px-16 text-white font-bold rounded-sm focus:outline-none">
                                {formFields ? 'Update' : 'Add'} LGA
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

export default LgaForm;
