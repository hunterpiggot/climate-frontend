import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { IRootState } from "@/store/root";
import { useApiClient } from "@/api-client";
import {
  INaturalEventsState,
  RequestState,
} from "./NaturalEventsSlice.interface";
// import { useApiClient } from "@/api-client";

export const naturalEventsSelectionAdapter = createEntityAdapter<any>({
  selectId: (model) => model.id,
});

const initialState =
  naturalEventsSelectionAdapter.getInitialState<INaturalEventsState>({
    naturalEventsStatus: RequestState.Idle,
    naturalEventsList: [],
    selectedNaturalEvent: {},
    error: null,
  });

/**
 * thunks
 */

export const fetchNaturalEvents = createAsyncThunk<any>(
  "naturalEvents/list",
  async () => {
    const client = useApiClient();
    const response = await client.naturalEvents.fetchNaturalEvents();

    return {
      data: response,
    };
  }
);

/**
 * slice
 */

const naturalEventsSlice = createSlice({
  name: "naturalEvents",
  initialState,
  reducers: {
    naturalEventsListChanged: (state, action) => {
      state.naturalEventsList = action.payload;
    },
    selectedNaturalEventChanged: (state, action) => {
      state.selectedNaturalEvent = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNaturalEvents.pending, (state) => {
        state.naturalEventsStatus = RequestState.Loading;
      })
      .addCase(fetchNaturalEvents.fulfilled, (state, action) => {
        state.naturalEventsStatus = RequestState.Success;
        if (action?.payload?.data) {
          const data = action.payload.data;
          state.naturalEventsList = data;

          if (data.length) {
            state.selectedNaturalEvent = data[0];
          }
        }
      })
      .addCase(fetchNaturalEvents.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default naturalEventsSlice.reducer;
export const { naturalEventsListChanged, selectedNaturalEventChanged } =
  naturalEventsSlice.actions;

export const { selectAll: selectPatients, selectById: selectPatientById } =
  naturalEventsSelectionAdapter.getSelectors<IRootState>(
    (state) => state.naturalEvents
  );

export const selectNaturalEventsList = (state: IRootState) => {
  return state.naturalEvents.naturalEventsList;
};

export const selectNaturalEventsStatus = (state: IRootState) => {
  return state.naturalEvents.naturalEventsStatus;
};

export const selectSelectedNaturalEvent = (state: IRootState) => {
  return state.naturalEvents.selectedNaturalEvent;
};
