import React, {useReducer, useMemo, createContext} from 'react';
import PropTypes from 'prop-types';

const initialState = {
  loading: false,
  success: false,
  error: null,
  lgas: [],
  lga: null
};

const initialContext = [{...initialState}, () => {}];

export const LgaContext = createContext(initialContext);

const lgaReducer = (state, action) => {
  switch (action.type) {
    case 'GET_LGAS':
      return {
        ...state,
        loading: true,
      };
    case 'GET_LGAS_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        lgas: action.payload.response,
      };
    case 'GET_LGAS_FAILURE':
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      };
    case 'CREATE_LGA':
      return {
        ...state,
        loading: true,
      };
    case 'CREATE_LGA_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        lga: action.payload.response,
      };
    case 'CREATE_LGA_FAILURE':
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      };
    case 'UPDATE_LGA':
      return {
        ...state,
        loading: true,
      };
    case 'UPDATE_LGA_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        lga: action.payload.response,
      };
    case 'UPDATE_LGA_FAILURE':
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      };
    case 'DELETE_LGA':
      return {
        ...state,
        loading: true,
      };
    case 'DELETE_LGA_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        lga: action.payload.response,
      };
    case 'DELETE_LGA_FAILURE':
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      };
    default:
      return {
        ...initialState,
      };
  }
};

export function LgaController(props) {
  const [state, dispatch] = useReducer(lgaReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return (
    <LgaContext.Provider value={value}>{props.children}</LgaContext.Provider>
  );
}

LgaController.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};