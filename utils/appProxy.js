import axios from 'axios';
import { getEnvironment } from './env';

const config = {
  local: {
    url: 'http://localhost:8090/',
  },
  production: {
    url: 'TBD',
  },
};

export function getConfig() {
  const env = getEnvironment();
  let conf = config[env];
  if (!conf) {
    conf = config.production;
  }

  return conf;
}

function resolveApiUrl(url) {
  const conf = getConfig();
  return `${conf.url}${url}`;
}

export function getGetRequest(url, params) {
  const apiUrl = resolveApiUrl(url);
  return axios
    .create({
      params,
    })
    .get(apiUrl)
    .then((response) => {
      return response.data;
    });
}

export function getPostRequest(url, data, params) {
  const apiUrl = resolveApiUrl(url);
  return axios
    .create({
      params,
    })
    .post(apiUrl, data)
    .then((response) => {
      return response.data;
    });
}

export function getDeleteRequest(url, data, params) {
  const apiUrl = resolveApiUrl(url);
  return axios
    .create({
      params,
    })
    .delete(apiUrl, data)
    .then((response) => {
      return response.data;
    });
}
