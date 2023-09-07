/**
 * @Name IDrinkFunctionsApiClientUrls
 * @description
 * Interface for the Diabetes urls used to avoid hard-coded strings
 */

export interface IFetchNaturalEventsResponse {
  events: any[];
}
export interface INaturalEventsApiClientUrls {
  fetchNaturalEvents: string;
}

/**
 * @Name IDrinkFunctionsApiClient
 * @description
 * Interface for the Diabetes api client module
 */
export interface INaturalEventsApiClient {
  fetchNaturalEvents(): Promise<IFetchNaturalEventsResponse>;
}
