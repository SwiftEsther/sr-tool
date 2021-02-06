import axios from 'axios';

const baseApiCall = async (attrs) => {
  let token = localStorage.getItem('access_token');
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  console.log(token)
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  console.log(headers)
  const axiosInstance = axios.create({
    headers,
  });
  return axiosInstance;
};

export const login = async (payload) => {
  await localStorage.multiGet([
    ['user', JSON.stringify(payload.user)],
    ['access_token', JSON.stringify(payload.token)],
  ]);
};

export const logout = async () => {
  await localStorage.multiRemove(['user', 'access_token']);
};

const apiCall = async (url, httpMethod, body, additionalParams) => {
  const axiosInstance = await baseApiCall();
  switch (httpMethod) {
    case 'post':
    case 'put':
    case 'patch':
      return axiosInstance[httpMethod](url, body, additionalParams);
    case 'get':
      return axiosInstance[httpMethod](url, body);
    case 'delete':
      return axiosInstance[httpMethod](url);
    default:
      return axiosInstance[httpMethod](url);
  }
};

const apiRequest = async (
  url,
  httpMethod,
  body = {},
  additionalParams = {}
) => {
  return new Promise(function (resolve, reject) {
    apiCall(url, httpMethod, body, additionalParams)
      .then((response) => {
        if (response.data.status === 401) {
          return;
        }
        if (response.status < 400) {
          if (response.data.status !== 400) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        } else {
          reject(response.data);
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err);
        }
        if (err.response) {
          if (err.response.status === 404) {
            // log user out
            console.log('here', err.response.status);
            // return;
          }
          reject(err);
        }
        reject(err);
      });
  });
};

export {apiRequest};
