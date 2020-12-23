import { Formik } from "formik";
import React, { useState } from "react";

const UserForm = ({formFields, handleFormSubmit}) => {
    const [formValid, setFormValid] = useState(false);
    let initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        group: ''
    }

    const validate = (values) => {
        const errors = {};
        if (!values.first_name) {
            errors.first_name = 'First Name is required';
        }   else if (!values.last_name) {
            errors.last_name = 'Last Name is required';
        }   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }   else if(!values.password) {
            errors.password = 'Password is required';
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
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkGray font-medium text-sm"
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
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkGray font-medium text-sm"
                                placeholder="Last Name"
                            />
                            {errors.last_name && touched.last_name && <span className="text-xs text-red-600">{errors.last_name}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkGray font-medium text-sm"
                                placeholder="Email"
                            />
                            {errors.email && touched.email && <span className="text-xs text-red-600">{errors.email}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkGray font-medium text-sm"
                                placeholder="Password"
                            />
                            {errors.password && touched.password && <span className="text-xs text-red-600">{errors.password}</span>}
                        </div>
                        <div className="flex justify-between items-center">
                            <button type="submit" disabled={isSubmitting || !formValid} className="bg-primary py-4 px-16 text-white font-bold rounded-sm focus:outline-none">
                                {formFields ? 'Update' : 'Add'} User
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

export default UserForm;
