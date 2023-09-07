// file: src/http-client/index.ts
import { useAppConfig } from "@/app-config";
import { IHttpClient } from "./models/HttpClient.interface";
import { HttpClientFetch } from "./models/HttpClient.fetch";
import { IHttpClientConfig } from "@/app-config/models";
// also export all the interfaces/models/enums
export * from "./models";

let _instance!: IHttpClient;

/**
 * @name useHttpClient
 * @description hook that returns a singleton instance of IHttpClient
 * @param httpClientConfig: optional but needed for unit tests to cover different scenarios
 * @returns an instance of IHttpClient
 */

export const useHttpClient = (httpClientConfig?: IHttpClientConfig) => {
  const appConfig = useAppConfig();
  if (!httpClientConfig) {
    httpClientConfig = appConfig.httpClient;
  }

  if (!_instance) {
    // if you'd like to use another implementatoin of HttpClient, add "clientType": "[yourclienttype]" within the config files --- within "httpClient" section
    // if (httpClientConfig.clientType === '[yourclienttype]') {
    //   _instance = new HttpClient[Yourclienttype](httpClientConfig)
    // }

    // export instance of IHttpClient (by default is fetch)
    _instance = new HttpClientFetch(httpClientConfig);
  }
  return _instance;
};
