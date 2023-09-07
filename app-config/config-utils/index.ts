// file: src/config/utils.ts

import { IAppRuntimeInfo } from "@/app-config/models/AppConfig.interface";
import { PublicRouteConstants } from "@/constants/PublicRoutes.constants";

export const appRuntimeInfo: IAppRuntimeInfo = {
  get baseUrl() {
    return document.location.origin;
  },
  get host() {
    return document.location.host;
  },
  get hostname() {
    return document.location.hostname;
  },
  get oauthCallbackUrl() {
    // build redirect url dynamically based on current base url from document.location.origin
    return `${document.location.origin}${PublicRouteConstants.oauthCallback.path}`;
  },
};

// helper to read the value of VITE_API_CLIENT
export function getAppConfigKey(): string {
  // @ts-ignore
  // let environment = (window.env?.environment || "mixed").trim();
  // if (environment.length > 0 && environment.indexOf("${") === -1) {
  //   return environment;
  // }
  return "mixed";
}
