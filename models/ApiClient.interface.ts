// file: src/api-client/models/ApiClient.interface.ts

import { INaturalEventsApiClient } from "@/api-client/models/natural-events";

/**
 * @Name IApiClient
 * @description
 * Interface wraps all api client modules into one places for keeping code organized.
 */
export interface IApiClient {
  naturalEvents: INaturalEventsApiClient;
}
