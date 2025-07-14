import { BASE_API_URL } from '../../constants/base';

import type { Response } from './types';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

type Method = (typeof METHODS)[keyof typeof METHODS];

type RequestOptions = {
  headers?: Record<string, string>;
  data?: unknown;
  timeout?: number;
  method?: Method;
};

type HTTPMethod = <R = unknown>(url: string, options?: RequestOptions) => Promise<Response<R>>

function queryStringify(data: Record<string, unknown> = {}): string {
  if (!data || typeof data !== 'object' || !Object.keys(data).length) {
    return '';
  }

  return (
    `?${Object.entries(data)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&')}`
  );
}

function hasContentTypeHeader(headers?: Record<string, string>): boolean {
  return Object.keys(headers ?? {}).some((key) => key.toLowerCase() === 'content-type');
}

const ERROR_STATUS_CODES = [400, 401, 403, 409, 500];

export class HTTPTransport {
  private apiUrl;

  constructor(apiPath: string) {
    this.apiUrl = `${BASE_API_URL}${apiPath}`;
  }

  get: HTTPMethod = (url, options = {}) => this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.GET }, options.timeout);

  put: HTTPMethod = (url, options = {}) => this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.PUT }, options.timeout);

  post: HTTPMethod = (url, options = {}) => this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.POST }, options.timeout);

  delete: HTTPMethod = (url, options = {}) => this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.DELETE }, options.timeout);

  request = <TResponse>(url: string, options: RequestOptions, timeout = 5000):
    Promise<Response<TResponse>> => {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method provided'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const handleError = () => reject(xhr);

      const preparedUrl = method === METHODS.GET
        ? `${url}${queryStringify(data as Record<string, unknown>)}`
        : url;

      xhr.open(method, preparedUrl);
      xhr.withCredentials = true;
      xhr.timeout = timeout;

      Object.entries(headers ?? {}).forEach(([header, value]) => {
        xhr.setRequestHeader(header, value);
      });

      xhr.onload = () => {
        try {
          let responseData;

          try {
            responseData = JSON.parse(xhr.responseText);
          } catch (e) {
            responseData = xhr.responseText;
            console.error('error while parsing response json, returning responseText as it is', e);
          }

          const statusCode = xhr.status;
          const response = {
            statusCode,
            data: responseData as TResponse,
          };

          if (!ERROR_STATUS_CODES.includes(statusCode)) {
            resolve(response);
          } else {
            throw response;
          }
        } catch (e) {
          reject(e);
        }
      };

      xhr.onabort = handleError;
      xhr.ontimeout = handleError;
      xhr.onerror = handleError;

      if (data instanceof FormData) {
        xhr.send(data);
        return;
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        if (!hasContentTypeHeader(headers)) {
          xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        }
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
