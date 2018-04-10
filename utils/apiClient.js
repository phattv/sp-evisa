// @flow
// vendor
import axios from 'axios';
// custom

const getFeesByCountryId = (params: Object, callback: Function) => {
  return axios
    .get(`${getApiServer()}/fees-by-country/${params.countryId}`)
    .then(response => {
      return callback(response.data);
    })
    .catch(error => {
      console.error('xxx', error);
      return callback(error.response.data);
    });
};

const login = (params: Object, callback: Function) => {
  return axios
    .post(`${getApiServer()}/login`, params)
    .then(response => {
      return callback(response.data);
    })
    .catch(error => {
      console.error('xxx', error);
      return callback(error.response.data);
    });
};

const register = (params: Object, callback: Function) => {
  return axios
    .post(`${getApiServer()}/register`, params)
    .then(response => {
      return callback(response.data);
    })
    .catch(error => {
      console.error('xxx', error);
      return callback(error.response.data);
    });
};

const getApiServer = () =>
  location.hostname.endsWith('evisa-vn.com')
    ? 'http://api.evisa-vn.com'
    : 'http://localhost:8001';

export { getFeesByCountryId, login, register };
