import React, {useReducer, useMemo, createContext} from 'react';
import PropTypes from 'prop-types';

const initialState = {
  loading: false,
  success: false,
  user: null,
  error: null,
};

const initialContext = [{...initialState}, () => {}];

export const UserContext = createContext(initialContext);

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload.response,
      };
    case 'LOGIN_FAILURE':
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

export function UserController(props) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

UserController.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
