import { combineReducers } from "@reduxjs/toolkit";
import naturalEventsStore from "@/components/climate-dashboard/natural-events/natural-events-slice/NaturalEvents.slice";
export const rootReducer = combineReducers({
  naturalEvents: naturalEventsStore,
});
