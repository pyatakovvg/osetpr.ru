
import {
  BadRequestError,
  NetworkError,
  NotfoundError,
  ValidationError,
  UnauthorizedError,
} from '@packages/errors';

import qs from 'qs';
import axios from 'axios';


const defaultOptions = {
  method: 'get',
  url: '/',
  responseType: 'json',
};

let hostApi = null;
let dispatch = null;


export const middleware = (options) => (store) => (next) => (action) => {

  hostApi = options['host'];
  dispatch = store['dispatch'];

  return next(action);
};

const request = async (options) => {
  try {
    options = {
      ...defaultOptions,
      ...options,
    };

    let headers = {};

    if (options['headers']) {
      headers = options['headers'];
    }

    const instance = axios.create({
      baseURL: hostApi,
      timeout: 24000,
      headers: headers,
      withCredentials: true,
    });

    instance.interceptors.request.use(function (config) {
      config.paramsSerializer = (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
      return config;
    });

    const { data } = await instance(options);

    return data;
  }
  catch(error) {

    if (axios.isCancel(error)) {
      return { success: true, data: null };
    }

    if (error['response']) {
      const {status, data} = error['response'];

      if (status === 400) {
        return Promise.reject(new BadRequestError(data));
      } else if (status === 401) {
        dispatch({type: 'redirect', payload: null});
        return Promise.reject(new UnauthorizedError(data));
      } else if (status === 404) {
        return Promise.reject(new NotfoundError(data));
      } else if (status === 417) {
        return Promise.reject(new ValidationError(data));
      } else {
        return Promise.reject(new NetworkError(data));
      }
    } else {
      throw new NetworkError({code: '1.0.0', message: 'Сервис временно не доступен'});
    }
  }
};

export default request;

export function createCancelToken() {
  return axios.CancelToken.source();
}
