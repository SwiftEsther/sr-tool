import { Formik } from "formik";
import React, { useState } from "react";
import ImageThumb from "../../../shared/components/ImageThumb";

const StateForm = ({formFields, handleFormSubmit}) => {
    const [formValid, setFormValid] = useState(false);
    const [file, setFile] = useState("");
    const [name, setName] = useState("");
    let initialValues = {
        name: '',
        map: null
    }

    const validate = (values) => {
        console.log(values)
        const errors = {};
        if (!values.name) {
            errors.name = 'Name is required';
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
                    setFieldValue,
                    isSubmitting,
                }) => (
                    <form onSubmit={() => handleSubmit({name, file})} autoComplete="off">
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
                                accept="image/*"
                                // multiple
                                // onChange={(event) => setFile(event.target.files[0])}
                                // value={values.name}
                                className="custom-file-input w-full focus:outline-none placeholder-darkerGray font-medium text-sm"
                                placeholder="Upload SVG"
                            />
                            {values.map && <ImageThumb image={values.map} />}
                            {/* {values.map && <p >{values.map.name}</p>} */}
                            {/* {errors.name && touched.name && <span className="text-xs text-red-600">{errors.name}</span>} */}
                        </div>
                        <div className="flex justify-between items-center">
                            <button type="submit" disabled={isSubmitting || !formValid} className="bg-primary py-4 px-16 text-white font-bold rounded-sm focus:outline-none">
                                {formFields ? 'Update' : 'Add'} State
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

export default StateForm;
