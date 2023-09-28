import { JwtHelpers } from "@/store/helpers/JwtHelpers";
import { IHistoricalDataApiClientConfig } from "@/app-config/models/AppConfig.interface";
import {
  HttpRequestType,
  IHttpRequestParams,
  UrlUtils,
  useHttpClient,
} from "@/http-client";
import { useAppConfig } from "@/app-config";
import {
  IFetchHistoricalDataParams,
  IFetchHistoricalDataResponse,
  IHistoricalDataApiClient,
  IHistoricalDataApiClientUrls,
} from ".";

/**
 * @Name HistoricalDataApiClient
 * @description
 * Implements the IHistoricalDataApiClient interface
 */
class HistoricalDataApiClient implements IHistoricalDataApiClient {
  private readonly urls!: IHistoricalDataApiClientUrls;
  private httpClient: <T>(params: any) => any;

  constructor(config: IHistoricalDataApiClientConfig, httpClient: () => any) {
    this.urls = config.apiUrls;
    this.httpClient = httpClient;
  }

  fetchHistoricalData(
    params: IFetchHistoricalDataParams
  ): Promise<IFetchHistoricalDataResponse> {
    const access_token = JwtHelpers.getAccessToken();
    const requestParameters: IHttpRequestParams = {
      requestType: HttpRequestType.get,
      url: this.urls.fetchHistoricalData,
      headers: {
        "Content-Type": "application/json",
        // apikey: useAppConfig().apiClient.apikey,
        Authorization: `Bearer ${access_token}`,
        "Access-Control-Allow-Origin": "*",
        credentials: "include",
      },
      payload: params as any,
      requiresToken: true,
    };

    return this.httpClient<IFetchHistoricalDataResponse>(requestParameters);
  }
}

export const createHistoricalDataApiClient = (
  config: IHistoricalDataApiClientConfig,
  httpClient: any
) => {
  return new HistoricalDataApiClient(config, httpClient);
};

// export singleton hook
let _liveInstance!: IHistoricalDataApiClient;
export const useLiveHistoricalDataApiClient = (): IHistoricalDataApiClient => {
  const appConfig = useAppConfig();
  const httpClient = useHttpClient().request;
  if (!_liveInstance) {
    _liveInstance = createHistoricalDataApiClient(
      appConfig.historicalData,
      httpClient
    );
  }
  return _liveInstance;
};
