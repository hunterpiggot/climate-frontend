// import a reference to the app config
import {
  IHistoricalDataApiClient,
  useLiveHistoricalDataApiClient,
} from "@/api-client/models/historical-data";

// export singleton hook
let _mockInstance!: IHistoricalDataApiClient;
export const useMockHistoricalDataApiClient = (): IHistoricalDataApiClient => {
  _mockInstance = useLiveHistoricalDataApiClient();
  return _mockInstance;
};
