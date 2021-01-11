import { Formik } from "formik";
import React, { useState } from "react";
import ImageThumb from "../../../shared/components/ImageThumb";
import env from '../../../config/env.config';

const StateForm = ({formFields, handleFormSubmit}) => {
    const [formValid, setFormValid] = useState(false);
    const baseUrl = env().baseUrl;
    const version = env().version;
    let initialValues = {
        name: '',
        map: null
    }

    console.log(formFields)

    const validate = (values) => {
        console.log(values)
        const errors = {};
        if (!values.name) {
            errors.name = 'Name is required';
        }   else if (!values.svgUrl && !values.map) {
            errors.map = 'You are required to upload a map';
        }   else {
            setFormValid(true);
        }
        return errors;
    }

    return (
        <div className="lg:w-3/10 w-full">
            <Formik
                initialValues={formFields || initialValues}
                validate={values => validate(values)}
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
                    setFieldValue,
                    isSubmitting,
                    setSubmitting
                }) => (
                    <form onSubmit={(e) => handleFormSubmit(e, values, setSubmitting)} autoComplete="off">
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Name"
                            />
                            {errors.name && touched.name && <span className="text-xs text-red-600">{errors.name}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="file"
                                name="map"
                                onChange={(event) => {
                                   setFieldValue("map", event.currentTarget.files[0]);
                                }}
                                onBlur={(event) => {
                                    setFieldValue("map", event.currentTarget.files[0]);
                                }}
                                accept=".svg"
                                required={!formFields}
                                className="custom-file-input w-full focus:outline-none placeholder-darkerGray font-medium text-sm"
                                placeholder="Upload SVG"
                            />
                            {values.svgUrl && <img src={`${baseUrl}/api/v${version}${values.svgUrl}`} />}
                            {values.map && <ImageThumb image={values.map} />}
                            {errors.map && <span className="text-xs text-red-600">{errors.map}</span>}
                        </div>
                        <div className="flex justify-between items-center">
                            <button type="submit" disabled={isSubmitting || !formValid} className="bg-primary py-4 text-white font-bold rounded-sm focus:outline-none w-4/10">
                                {formFields ? 'Update' : 'Add'} State
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

export default StateForm;
