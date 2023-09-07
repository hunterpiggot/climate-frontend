// file: RootStore.interface.ts

import { INaturalEventsState } from "@/components/climate-dashboard/natural-events/natural-events-slice";

/**
 * @name IRootState
 * @description Interface represents the global state manager
 */
export interface IRootStore {
  // additional domain store modules will be eventually added here
  naturalEventsState: INaturalEventsState;
}
