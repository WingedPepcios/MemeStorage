import Axios from 'axios';

const instance = Axios.create({
  baseURL: null,
  accept: 'appliaction/json',
  'Access-Control-Allow-Origin': 'origin, x-requested-with',
  'Access-Control-Allow-Headers': 'x',
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response;
    if (status === 401 || status === 404) {
      return {
        data,
      };
    }
    return error;
  },
);

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
