// @flow
// vendor
import axios from 'axios';
// custom

const getFeesByCountryId = (params: Object, callback: Function) => {
  const isProd = location.hostname.endsWith('evisa-vn.com');
  const apiServer = isProd
    ? 'http://api.evisa-vn.com'
    : 'http://localhost:8001';

  return axios
    .get(`${apiServer}/fees-by-country/${params.countryId}`)
    .then(response => {
      return callback(response.data);
    })
    .catch(error => {
      console.error('xxx', error);
    });
};

export { getFeesByCountryId };
