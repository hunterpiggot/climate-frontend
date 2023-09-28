/**
 * @Name IDrinkFunctionsApiClientUrls
 * @description
 * Interface for the Diabetes urls used to avoid hard-coded strings
 */

export enum Aggregation {
  Hour = "hour",
  Day = "day",
  Week = "week",
  Month = "month",
  Year = "year",
  Decade = "decade",
  None = "none",
}
export interface IFetchHistoricalDataParams {
  startDateTime: string;
  endDateTime: string;
  aggregation: Aggregation;
}
export interface IFetchHistoricalDataResponse {
  latitude: number;
  longitude: number;
  generationTimeMs: number;
  utcOffsetSeconds: number;
  timezone: string;
  timezoneAbbreviation: string;
  elevation: number;
  hourlyUnits: {
    time: string;
    temperatureTwoM: string;
  };
  hourly: {
    time: string[];
    temperatureTwoM: number | null[];
  };
}
export interface IHistoricalDataApiClientUrls {
  fetchHistoricalData: string;
}

/**
 * @Name IDrinkFunctionsApiClient
 * @description
 * Interface for the Diabetes api client module
 */
export interface IHistoricalDataApiClient {
  fetchHistoricalData(
    params: IFetchHistoricalDataParams
  ): Promise<IFetchHistoricalDataResponse>;
}
