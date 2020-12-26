import React, {useReducer, useMemo, createContext} from 'react';
import PropTypes from 'prop-types';

const initialState = {
  loading: false,
  success: false,
  error: null,
  parties: [],
  party: null
};

const initialContext = [{...initialState}, () => {}];

export const PartyContext = createContext(initialContext);

const partyReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PARTIES':
      return {
        ...state,
        loading: true,
      };
    case 'GET_PARTIES_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        parties: action.payload.response,
      };
    case 'GET_PARTIES_FAILURE':
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      };
    case 'CREATE_PARTY':
      return {
        ...state,
        loading: true,
      };
    case 'CREATE_PARTY_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        party: action.payload.response,
      };
    case 'CREATE_PARTY_FAILURE':
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      };
    case 'UPDATE_PARTY':
      return {
        ...state,
        loading: true,
      };
    case 'UPDATE_PARTY_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        party: action.payload.response,
      };
    case 'UPDATE_PARTY_FAILURE':
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      };
    case 'DELETE_PARTY':
      return {
        ...state,
        loading: true,
      };
    case 'DELETE_PARTY_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        party: action.payload.response,
      };
    case 'DELETE_PARTY_FAILURE':
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      };
    case 'GET_PARTY_BY_CODE':
      return {
        ...state,
        loading: true,
      };
    case 'GET_PARTY_BY_CODE_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        party: action.payload.response,
      };
    case 'GET_PARTY_BY_CODE_FAILURE':
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

export function PartyController(props) {
  const [state, dispatch] = useReducer(partyReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return (
    <PartyContext.Provider value={value}>{props.children}</PartyContext.Provider>
  );
}

PartyController.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
