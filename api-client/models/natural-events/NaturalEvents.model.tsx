import { JwtHelpers } from "@/store/helpers/JwtHelpers";
import { INaturalEventsApiClientConfig } from "@/app-config/models/AppConfig.interface";
import {
  HttpRequestType,
  IHttpRequestParams,
  UrlUtils,
  useHttpClient,
} from "@/http-client";
import { useAppConfig } from "@/app-config";
import {
  IFetchNaturalEventsResponse,
  INaturalEventsApiClient,
  INaturalEventsApiClientUrls,
} from ".";

/**
 * @Name NaturalEventsApiClient
 * @description
 * Implements the INaturalEventsApiClient interface
 */
class NaturalEventsApiClient implements INaturalEventsApiClient {
  private readonly urls!: INaturalEventsApiClientUrls;
  private httpClient: <T>(params: any) => any;

  constructor(config: INaturalEventsApiClientConfig, httpClient: () => any) {
    this.urls = config.apiUrls;
    this.httpClient = httpClient;
  }

  fetchNaturalEvents(): Promise<IFetchNaturalEventsResponse> {
    const access_token = JwtHelpers.getAccessToken();

    const requestParameters: IHttpRequestParams = {
      requestType: HttpRequestType.get,
      url: this.urls.fetchNaturalEvents,
      headers: {
        "Content-Type": "application/json",
        // apikey: useAppConfig().apiClient.apikey,
        Authorization: `Bearer ${access_token}`,
        "Access-Control-Allow-Origin": "*",
        credentials: "include",
      },
      requiresToken: true,
    };

    return this.httpClient<IFetchNaturalEventsResponse>(requestParameters);
  }
}

export const createNaturalEventsApiClient = (
  config: INaturalEventsApiClientConfig,
  httpClient: any
) => {
  return new NaturalEventsApiClient(config, httpClient);
};

// export singleton hook
let _liveInstance!: INaturalEventsApiClient;
export const useLiveNaturalEventsApiClient = (): INaturalEventsApiClient => {
  const appConfig = useAppConfig();
  const httpClient = useHttpClient().request;
  if (!_liveInstance) {
    _liveInstance = createNaturalEventsApiClient(
      appConfig.naturalEvents,
      httpClient
    );
  }
  return _liveInstance;
};
