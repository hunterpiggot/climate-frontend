// file: src/api-client/live/index.ts
import { IApiClient } from "@/models/ApiClient.interface";
import { useMockNaturalEventsApiClient } from "./natural-events";

// create an instance of the main ApiClient that wraps the mock child clients
let _apiMockClient: IApiClient | undefined;

const initApiClient = () => {
  if (!_apiMockClient) {
    _apiMockClient = {
      get naturalEvents() {
        return useMockNaturalEventsApiClient();
      },
    };
  }
};

export const useMockApiClient = () => {
  if (!_apiMockClient) {
    initApiClient();
  }
  return _apiMockClient as IApiClient;
};
