import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { IRootState } from "@/store/root";
import { useApiClient } from "@/api-client";
import {
  IWeatherHistoryChartData,
  IWeatherHistoryState,
  RequestState,
} from "./WeatherHistorySlice.interface";
import { Aggregation } from "@/api-client/models/historical-data";
// import { useApiClient } from "@/api-client";

export const weatherHistorySelectionAdapter = createEntityAdapter<any>({
  selectId: (model) => model.id,
});

const initialState =
  weatherHistorySelectionAdapter.getInitialState<IWeatherHistoryState>(
    Object.freeze({
      weatherHistoryStatus: RequestState.Idle,
      weatherHistoryFull: {
        latitude: 0,
        longitude: 0,
        generationTimeMs: 0,
        utcOffsetSeconds: 0,
        timezone: "",
        timezoneAbbreviation: "",
        elevation: 0,
        hourlyUnits: {
          time: "",
          temperatureTwoM: "",
        },
        hourly: {
          time: [],
          temperatureTwoM: [],
        },
      },
      weatherHistoryChartData: [],
      error: null,
    })
  );

/**
 * thunks
 */

export const fetchWeatherHistory = createAsyncThunk<any>(
  "weatherHistory/list",
  async () => {
    const client = useApiClient();
    const response = await client.historicalData.fetchHistoricalData({
      aggregation: Aggregation.Year,
      startDateTime: "1967-09-05T21:03:43.877Z",
      endDateTime: "2023-09-25T21:03:43.877Z",
    });

    const chartData: IWeatherHistoryChartData[] = response.hourly.time.map(
      (item, index) => {
        const dataPoint = {
          id: index,
          time: item,
          temperature: response.hourly.temperatureTwoM[index],
        };
        return dataPoint;
      }
    );

    return {
      data: response,
      chartData,
    };
  }
);

/**
 * slice
 */

const weatherHistorySlice = createSlice({
  name: "weatherHistory",
  initialState,
  reducers: {
    weatherHistoryFullChanged: (state, action) => {
      state.weatherHistoryFull = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherHistory.pending, (state) => {
        state.weatherHistoryStatus = RequestState.Loading;
      })
      .addCase(fetchWeatherHistory.fulfilled, (state, action) => {
        state.weatherHistoryStatus = RequestState.Success;
        if (action?.payload?.data) {
          const fullData = action.payload.data;
          const chartData = action.payload.chartData;
          state.weatherHistoryFull = fullData;
          state.weatherHistoryChartData = chartData;
        }
      })
      .addCase(fetchWeatherHistory.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default weatherHistorySlice.reducer;
export const { weatherHistoryFullChanged } = weatherHistorySlice.actions;

// export const { selectAll: selectPatients, selectById: selectPatientById } =
//   weatherHistorySelectionAdapter.getSelectors<IRootState>(
//     (state) => state.weatherHistory
//   );

export const selectWeatherHistoryFull = (state: IRootState) => {
  return state.weatherHistory.weatherHistoryFull;
};
export const selectWeatherHistoryChartData = (state: IRootState) => {
  return state.weatherHistory.weatherHistoryChartData;
};

export const selectWeatherHistoryStatus = (state: IRootState): RequestState => {
  return state.weatherHistory.weatherHistoryStatus;
};

export const selectWeatherHistoryFullAndChartData = (state: IRootState) => {
  return {
    fullData: state.weatherHistory.weatherHistoryFull,
    chartData: state.weatherHistory.weatherHistoryChartData,
  };
};
