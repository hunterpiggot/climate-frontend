import { IApiClient } from "@/models/ApiClient.interface";
// file: src/api-client/index.ts

import { useMockApiClient } from "./mock";
import { useLiveApiClient } from "./live";
import { useAppConfig } from "../app-config";

// return a single instance of our api client that will be either live or mock based on configuration
let _apiClient: IApiClient | undefined;

export const useApiClient = (clientType?: string) => {
  // this is to allow overriding from unit tests so we can cover some code through unit tests that would be otherwise uncovered
  const appConfig = useAppConfig();
  if (!clientType) {
    clientType = appConfig.apiClient.type;
  }

  const liveApiClient = useLiveApiClient();
  const mockApiClient = useLiveApiClient();
  if (!_apiClient) {
    if (clientType === "live") {
      _apiClient = liveApiClient;
    } else {
      _apiClient = mockApiClient;
    }
  }

  return _apiClient!;
};
