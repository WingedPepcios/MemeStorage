import Axios from 'axios';

const instance = Axios.create({
  baseURL: null,
  accept: 'appliaction/json',
  'Access-Control-Allow-Origin': 'origin, x-requested-with',
  'Access-Control-Allow-Headers': 'x',
});

const http = {
  get(url, params) {
    return instance.get(url, { params });
  },
  post(url, data) {
    return instance.post(url, data);
  },
  delete(url, data) {
    return instance.delete(url, data);
  },
};

export default http;
