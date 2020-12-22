import React, { useContext } from 'react';
import { Formik } from 'formik';
import { UserContext } from '../../contexts/UserContext';
import {login} from '../../lib/url.js';
import {apiRequest} from '../../lib/api.js';
import { toast } from 'react-toastify';
 
 const Login = () => {
     const [userState, dispatch] = useContext(UserContext);
     const handleLogin = (values, {setSubmitting}) => {
         dispatch({type: 'LOGIN'});
         setSubmitting(true);
         apiRequest(login, 'post')
            .then((res) => {
                dispatch({type: 'LOGIN_SUCCESS', payload: {response: res}});
                setSubmitting(false);
            })
            .catch((err) => {
                dispatch({type: 'LOGIN_FAILURE', payload: {error: err}});
                toast.error('Something went wrong. Please try again later', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setSubmitting(false);
            });
     }
      return (
        <div className="bg-red-300 h-screen flex justify-center items-center">
            <div className="xl:w-3.5/10 lg:w-6/12 xs:w-9/10 text-center">
                <h1 className="text-5xl md:text-6.5xl text-primary font-bold mb-6">Welcome Back</h1>
                    <div className="shadow-sm p-8 md:p-16 bg-white">
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.username) {
                                    errors.username = 'Username is required';
                                } else if(!values.password) {
                                    errors.password = 'Password is required';
                                }else if (
                                    values.username.length < 3
                                ) {
                                    errors.username = 'Invalid username';
                                }
                                return errors;
                            }}
                            onSubmit={handleLogin}
                            >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit} autoComplete="off">
                                    <div className="mt-4 mb-12">
                                        <input
                                            type="text"
                                            name="username"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                            className="w-full border-b border-primary py-2 focus:outline-none bg-transparent placeholder-lightGray font-medium text-sm"
                                            placeholder="Username"
                                        />
                                        {errors.username && touched.username && <span className="text-xs text-red-600">{errors.username}</span>}
                                    </div>
                                    <div className="mt-4 mb-12">
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            className="w-full border-b border-primary py-2 focus:outline-none bg-transparent placeholder-lightGray font-medium text-sm"
                                            placeholder="Password"
                                        />
                                        {errors.password && touched.password && <span className="text-xs text-red-600">{errors.password}</span>}
                                    </div>
                                    <button type="submit" disabled={isSubmitting || errors.password?.length > 0 || errors.username?.length > 0} className="bg-primary w-9.5/10 m-auto py-3 sm:py-6 text-white font-bold rounded-xl">
                                        Sign in
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                    
                </div>
        </div>
    );
 }

 
 export default Login;
