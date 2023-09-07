import { PublicMenuItemKeys } from "./PublicMenuItemKeys.constants";
import { IRouteConstantItem } from "./models";

interface IPublicRouteConstants {
  publicHome: IRouteConstantItem;
  register: IRouteConstantItem;
  resetPassword: IRouteConstantItem;
  oauthCallback: IRouteConstantItem;
}

/**
 * @name PublicRouteConstants
 * @description Constants for the public React routes.
 */
export const PublicRouteConstants: IPublicRouteConstants = Object.freeze({
  publicHome: { key: PublicMenuItemKeys.publicHome, path: "/" },
  register: { key: PublicMenuItemKeys.publicHome, path: "/register" },
  resetPassword: {
    key: PublicMenuItemKeys.resetPassword,
    path: "/reset-password",
  },
  oauthCallback: { key: "oauth-callback", path: "/oauth-callback" },
});

/**
 * @name PublicRouteConstantsAsArray
 * @description Same as PublicRouteConstants but as an array for more easily lookup in some cases
 */
export const PublicRouteConstantsAsArray: IRouteConstantItem[] = Array.from(
  Object.keys(PublicRouteConstants)
).map((k) => {
  return (<any>PublicRouteConstants)[k] as IRouteConstantItem;
});

/**
 * @name AllPublicRoutePaths
 * @description An arrayw ith only all public route paths
 */
export const AllPublicRoutePaths = PublicRouteConstantsAsArray.map(
  (item) => item.path
);
