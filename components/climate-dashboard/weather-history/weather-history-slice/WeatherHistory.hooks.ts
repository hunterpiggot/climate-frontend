import { useAppDispatch, useAppSelector } from "@/shared-hooks/useAppSelector";
import { useEffect } from "react";
import {
  fetchWeatherHistory,
  selectWeatherHistoryChartData,
  selectWeatherHistoryFull,
  selectWeatherHistoryStatus,
} from "./WeatherHistory.slice";

export function useCallWeatherHistoryList() {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectWeatherHistoryStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWeatherHistory());
    }
  }, []);

  return {
    fullData: useAppSelector(selectWeatherHistoryFull),
    chartData: useAppSelector(selectWeatherHistoryChartData),
  };
}
