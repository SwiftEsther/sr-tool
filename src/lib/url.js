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
export const deleteLga = `${baseUrl}/api/v${version}/lga`;