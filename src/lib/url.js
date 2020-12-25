import env from '../config/env.config';

export const baseUrl = env().baseUrl;
export const version = env().version;

//----AUTH URLS----//
export const login = `${baseUrl}/login`;

//----USER URLS----//
export const users = `${baseUrl}/users`;

//----STATE URLS----//
export const states = `${baseUrl}/states`;

//----LGA URLS----//
export const lgas = `${baseUrl}/lgas`;