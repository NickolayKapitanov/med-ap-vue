import axios, { AxiosInstance } from 'axios';
import interceptors from './interceptors';

/** Установка таймаута для запросов axios, по умолчанию 5 минут */
const TIMEOUT = 300000;

const { handleResponse, handleError } = interceptors;

export default abstract class Api {
  protected http: AxiosInstance;

  public constructor(url?: string) {
    this.http = axios.create({
      baseURL: `${url || ''}`,
      withCredentials: true,
      timeout: TIMEOUT,
    });

    axios.interceptors.request.use((request) => request);

    this.http.interceptors.response.use(handleResponse, handleError);
  }
}