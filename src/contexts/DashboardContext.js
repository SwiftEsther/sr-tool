import { createContext, useMemo, useReducer } from "react";

const initialState = {
    response: null,
    error: null,
    success: false,
    loading: false,
}

const initialContext = [{...initialState}, () => {}];

export const DashboardContxet = createContext(initialContext);

const dashboardReducer = (state, action) => {
    switch (action.type) {
        case 'GET_DASHBOARD':
            return {
                ...state,
                loading: true
            };
        case 'GET_DASHBOARD_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true,
                response: action.payload.response
            };
        case 'GET_DASHBOARD_FAILURE':
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload.error
            };
        case 'GET_DASHBOARD_BY_STATE':
            return {
                ...state,
                loading: true
            };
        case 'GET_DASHBOARD_BY_STATE_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true,
                response: action.payload.response
            };
        case 'GET_DASHBOARD_BY_STATE_FAILURE':
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload.error
            };
        case 'GET_DASHBOARD_BY_SENATORIAL_DISTRICT':
            return {
                ...state,
                loading: true
            };
        case 'GET_DASHBOARD_BY_SENATORIAL_DISTRICT_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true,
                response: action.payload.response
            };
        case 'GET_DASHBOARD_BY_SENATORIAL_DISTRICT_FAILURE':
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload.error
            };
        default:
            break;
    }
}

export function DashboardController(props) {
    const [state, dispatch] = useReducer(dashboardReducer, initialState);
    const value = useMemo(() => [state, dispatch], [state]);

    return (<DashboardContxet.Provider value={value}>{props.children}</DashboardContxet.Provider>);
}

DashboardController.propTypes = {
    children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
