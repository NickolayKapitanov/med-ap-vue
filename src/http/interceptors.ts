import { AxiosResponse, AxiosError } from 'axios';

const handleResponse = (response: AxiosResponse) => {
  if (response.headers['content-type'].indexOf('text/html') !== -1) {
    console.log('Error headers');
  }
  return response.data;
};

const handleError = (error: AxiosError) => {
  if (error.response?.status !== 200) {
    console.log('Error server or client');
  }
  return Promise.reject(error);
};

export default {
  handleResponse,
  handleError,
};