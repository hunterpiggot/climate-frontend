import { RequestState } from "./../../components/climate-dashboard/natural-events/natural-events-slice/NaturalEventsSlice.interface";
// file: src/store/root/Root.store.ts

import {
  combineReducers,
  configureStore,
  Action,
  AnyAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import naturalEventsStore from "@/components/climate-dashboard/natural-events/natural-events-slice/NaturalEvents.slice";
import weatherHistoryStore from "@/components/climate-dashboard/weather-history/weather-history-slice/WeatherHistory.slice";
import { IRootStore } from "./RootStore.interface";

const combinedReducer = combineReducers({
  naturalEvents: naturalEventsStore,
  weatherHistory: weatherHistoryStore,
});

// const initialState = {
//   naturalEvents: {
//     naturalEventsStatus: RequestState.Idle, // Use the correct enum or string literal here
//     naturalEventsList: [],
//     selectedNaturalEvent: {},
//     error: null,
//     ids: [],
//     entities: [],
//   },
//   weatherHistory: {
//     weatherHistoryStatus: RequestState.Idle,
//     weatherHistoryList: [],
//     error: null,
//     ids: [],
//     entities: [],
//   },
// };

const reducer = (state, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combinedReducer(state, action);
};

export const rootStore = () =>
  configureStore({
    reducer,
    // preloadedState: initialState,
  });

export type IAppStore = ReturnType<typeof rootStore>;
export type IRootState = ReturnType<IAppStore["getState"]>;
export type IAppDispatch = IAppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IRootState,
  unknown,
  Action<string>
>;

export function useAppStore(): IRootStore {
  const commit = useDispatch();
  return {
    naturalEventsState: {
      naturalEventsStatus: RequestState.Idle,
      naturalEventsList: [],
      selectedNaturalEvent: {},
      error: null,
    },
  };
}

export const wrapper = createWrapper<IAppStore>(rootStore);
