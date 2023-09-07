// file: src/api-client/live/index.ts
// import { IApiClient, useLiveDrinkFunctionsApiClient } from "../models";

import { useLiveNaturalEventsApiClient } from "@/api-client/models/natural-events";
import { IApiClient } from "@/models/ApiClient.interface";

// create an instance of the main ApiClient that wraps the live child clients
let _apiLiveClient: IApiClient | undefined;

const useInitApiClient = () => {
  const liveNaturalEventsApiClient = useLiveNaturalEventsApiClient();
  if (!_apiLiveClient) {
    _apiLiveClient = {
      get naturalEvents() {
        return liveNaturalEventsApiClient;
      },
    };
  }
};

export const useLiveApiClient = () => {
  const initApiClient = useInitApiClient;
  if (!_apiLiveClient) {
    initApiClient();
  }
  return _apiLiveClient as IApiClient;
};
