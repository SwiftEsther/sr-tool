import env from '../config/env.config';

export const baseUrl = env().baseUrl;
export const version = env().version;

//----USER/AUTH URLS----//
export const login = `${baseUrl}/login`;