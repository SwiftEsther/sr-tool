import env from '../config/env.config';

export const baseUrl = env().baseUrl;
export const version = env().version;

//----AUTH URLS----//
export const login = `${baseUrl}/api/v${version}/login`;

//----USER URLS----//
export const users = `${baseUrl}/api/v${version}/users`;

//----STATE URLS----//
export const allStates = `${baseUrl}/api/v${version}/states`;
export const createState = `${baseUrl}/api/v${version}/state`;
export const getStateById = `${baseUrl}/api/v${version}/state`;
export const getStateByCode = `${baseUrl}/api/v${version}/state`;
export const updateState = `${baseUrl}/api/v${version}/state`;
export const deleteState = `${baseUrl}/api/v${version}/state/delete`;
export const filterStateByName = `${baseUrl}/api/v${version}/state/filter`;

//----LGA URLS----//
export const allLgas = `${baseUrl}/api/v${version}/lgas`;
export const createLga = `${baseUrl}/api/v${version}/lga`;
export const getLgaById = `${baseUrl}/api/v${version}/lga`;
export const getLgaByCode = `${baseUrl}/api/v${version}/lga`;
export const updateLga = `${baseUrl}/api/v${version}/lga`;
export const deleteLga = `${baseUrl}/api/v${version}/lga/delete`;
export const filterLgaByName = `${baseUrl}/api/v${version}/lga/filter`;
export const getLgasByStateId = `${baseUrl}/api/v${version}/lga/state`;

//----WARD URLS----//
export const allWards = `${baseUrl}/api/v${version}/wards`;
export const createWard = `${baseUrl}/api/v${version}/ward`;
export const getWardById = `${baseUrl}/api/v${version}/ward`;
export const getWardByCode = `${baseUrl}/api/v${version}/ward`;
export const updateWard = `${baseUrl}/api/v${version}/ward`;
export const deleteWard = `${baseUrl}/api/v${version}/ward/delete`;
export const filterWardByName = `${baseUrl}/api/v${version}/ward/filter`;
export const getWardsByLgaId = `${baseUrl}/api/v${version}/ward/lga`;

//----POLLING UNIT URLS----//
export const allPollingUnits = `${baseUrl}/api/v${version}/polling-unit/all`;
export const createPollingUnit = `${baseUrl}/api/v${version}/polling-unit`;
export const getPollingUnitById = `${baseUrl}/api/v${version}/polling-unit`;
export const getPollingUnitByCode = `${baseUrl}/api/v${version}/polling-unit`;
export const updatePollingUnit = `${baseUrl}/api/v${version}/polling-unit`;
export const deletePollingUnit = `${baseUrl}/api/v${version}/polling-unit/delete`;
export const filterPollingUnitByName = `${baseUrl}/api/v${version}/polling-unit/filter`;
export const getPollingUnitsByWardId = `${baseUrl}/api/v${version}/polling-unit/ward`;

//----POLITICAL PARTY URLS----//
export const allParties = `${baseUrl}/api/v${version}/political-party/all`;
export const createParty = `${baseUrl}/api/v${version}/political-party`;
export const getPartyById = `${baseUrl}/api/v${version}/political-party`;
export const getPartyByCode = `${baseUrl}/api/v${version}/political-party`;
export const filterPartyByName = `${baseUrl}/api/v${version}/political-party/filter`;
export const updateParty = `${baseUrl}/api/v${version}/political-party`;
export const deleteParty = `${baseUrl}/api/v${version}/political-party/delete`;

//----AGENT URLS----//
export const allAgents = `${baseUrl}/api/v${version}/party-agent/all`;
export const createAgent = `${baseUrl}/api/v${version}/party-agent`;
export const getAgentByPhone = `${baseUrl}/api/v${version}/party-agent/phone`;
export const searchAgentByName = `${baseUrl}/api/v${version}/party-agent`;
export const getAgent = `${baseUrl}/api/v${version}/party-agent`;
export const updateAgent = `${baseUrl}/api/v${version}/party-agent`;
export const deleteAgent = `${baseUrl}/api/v${version}/party-agent/delete`;

//----RESULT URLS----//
export const allResults = `${baseUrl}/api/v${version}/result/all`;
export const createResult = `${baseUrl}/api/v${version}/result`;
export const getResultById = `${baseUrl}/api/v${version}/result`;
export const updateResult = `${baseUrl}/api/v${version}/result`;
export const deleteResult = `${baseUrl}/api/v${version}/result/delete`;

//----INCIDENT URLS----//
export const allIncidents = `${baseUrl}/api/v${version}/Incident/all`;
export const createIncident = `${baseUrl}/api/v${version}/Incident`;
export const getIncidentById = `${baseUrl}/api/v${version}/Incident`;
export const updateIncident = `${baseUrl}/api/v${version}/Incident`;
export const deleteIncident = `${baseUrl}/api/v${version}/result/delete`;

//----SENATORIAL DISTRICT URLS----//
export const getSenatorialDistrictsByStateId = `${baseUrl}/api/v${version}/senatorial-district/state`;