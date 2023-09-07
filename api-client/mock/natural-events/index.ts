// import a reference to the app config
import {
  INaturalEventsApiClient,
  useLiveNaturalEventsApiClient,
} from "@/api-client/models/natural-events";

// export singleton hook
let _mockInstance!: INaturalEventsApiClient;
export const useMockNaturalEventsApiClient = (): INaturalEventsApiClient => {
  _mockInstance = useLiveNaturalEventsApiClient();
  return _mockInstance;
};
