// file: src/app-config/models/AppConfig.interface.ts

import { IHistoricalDataApiClientUrls } from "@/api-client/models/historical-data";
import { INaturalEventsApiClientUrls } from "@/api-client/models/natural-events";

// import { IBloodGlucoseApiClientUrls } from '@/api-client/models/diabetes'

export interface IHttpClientConfig {
  tokenKey: string;
  clientType: string;
}

/**
 * @Name IAppConfig
 * @description
 * Describes the structure of a configuration file for the app
 */
export interface IAppConfig {
  global: {
    // ... things that are not specific to a single app domain
    version: number;
    prototyping: boolean; // only for local front-end dev so we can see some additoinal dev-only views
    consoleEnabled?: boolean; // enable console logging in the browser (usually only for local development)
  };
  httpClient: IHttpClientConfig;
  apiClient: {
    type: string;
    apikey: string;
  };
  naturalEvents: {
    apiUrls: INaturalEventsApiClientUrls;
  };
  historicalData: {
    apiUrls: IHistoricalDataApiClientUrls;
  };
}

export type INaturalEventsApiClientConfig = IAppConfig["naturalEvents"];
export type IHistoricalDataApiClientConfig = IAppConfig["historicalData"];
export type IGlobalConfig = IAppConfig["global"];
export type IApiClientConfig = IAppConfig["apiClient"];

export interface IAppRuntimeInfo {
  baseUrl: string;
  host: string;
  hostname: string;
  oauthCallbackUrl: string;
}
