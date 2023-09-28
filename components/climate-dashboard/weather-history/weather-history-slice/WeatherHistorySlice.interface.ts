import { IHistoricalData } from "@/models/IHistoricalData.interface";

export enum RequestState {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Failed = "failed",
}

export interface IWeatherHistoryChartData {
  id: number;
  time: string;
  temperature: number;
}

export interface IWeatherHistoryState {
  weatherHistoryStatus: RequestState;
  weatherHistoryFull: IHistoricalData;
  weatherHistoryChartData: IWeatherHistoryChartData[];
  error: any;
}
