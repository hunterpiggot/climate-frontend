// file: src/http-client/models/HttpRequestParams.interface.ts

import { HttpRequestType } from "./HttpRequestType.enum";

/**
 * @name IHttpRequestParams
 * @description
 * Interface represents an object we'll use to pass arguments into the HttpClient request method.
 * This allow us to specify the type of request we want to execute, the end-point url,
 * if the request should include an authentication token, and an optional payload (if POST or PUT for example)
 */
export interface IHttpRequestParams<P = void> {
  requestType: HttpRequestType;
  url: string;
  requiresToken: boolean;
  payload?: P;
  headers?: { [key: string]: string };
  handleReject?: boolean;
  dynamicContentType?: boolean; // if set fetch will attempt to dynamically set content type
  returnRawResponse?: boolean; // returns response object directly
  injectPayloadDirectly?: boolean; // HTTP won't attempt to convert to JSON
  mockDelay?: number;
  getServerResponse?: boolean;
  addOptions?: {
    mode?: string; // 'cors' or 'no-cors'
    credentials?: string;
  };
}
