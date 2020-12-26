import env from '../config/env.config';

export const baseUrl = env().baseUrl;
export const version = env().version;

//----AUTH URLS----//
export const login = `${baseUrl}/api/v${version}/login`;

//----USER URLS----//
export const users = `${baseUrl}/api/v${version}/users`;

//----STATE URLS----//
export const states = `${baseUrl}/api/v${version}/states`;

//----LGA URLS----//
export const allLgas = `${baseUrl}/api/v${version}/lgas`;
export const createLga = `${baseUrl}/api/v${version}/lga`;
export const getLgaById = `${baseUrl}/api/v${version}/lga`;
export const getLgaByCode = `${baseUrl}/api/v${version}/lga`;
export const updateLga = `${baseUrl}/api/v${version}/lga`;
export const deleteLga = `${baseUrl}/api/v${version}/lga/delete`;

//----WARD URLS----//
export const allWards = `${baseUrl}/api/v${version}/wards`;
export const createWard = `${baseUrl}/api/v${version}/ward`;
export const getWardById = `${baseUrl}/api/v${version}/ward`;
export const getWardByCode = `${baseUrl}/api/v${version}/ward`;
export const updateWard = `${baseUrl}/api/v${version}/ward`;
export const deleteWard = `${baseUrl}/api/v${version}/ward/delete`;

//----POLLING UNITS URLS----//
export const allPollingUnits = `${baseUrl}/api/v${version}/pus`;
export const createPollingUnit = `${baseUrl}/api/v${version}/pu`;
export const getPollingUnitById = `${baseUrl}/api/v${version}/pu`;
export const getPollingUnitByCode = `${baseUrl}/api/v${version}/pu`;
export const updatePollingUnit = `${baseUrl}/api/v${version}/pu`;
export const deletePollingUnit = `${baseUrl}/api/v${version}/pu/delete`;