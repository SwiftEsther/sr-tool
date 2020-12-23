import env from '../config/env.config';

export const baseUrl = env().baseUrl;
export const version = env().version;

//----AUTH URLS----//
export const login = `${baseUrl}/login`;

//----USER URLS----//
export const users = `${baseUrl}/users`;