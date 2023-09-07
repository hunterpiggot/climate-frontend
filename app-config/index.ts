// file: src/app-config/index.ts
// returns appropriate config based on env VITE_APP_CONFIG

import { merge } from "lodash";

// import a reference to the app config interface:
import { IAppConfig, IAppRuntimeInfo } from "./models/AppConfig.interface";

// import reference to configFilesMap
import { configFilesMap } from "./config-files-map";

// get helper method to retrieve env config key
import { getAppConfigKey, appRuntimeInfo } from "./config-utils";
// import { DiseaseIdsConstants } from "@/constants";

export { useEnvUtils } from "./env-utils";

let _instance!: IAppConfig & { runtimeInfo: IAppRuntimeInfo };

/**
 * @name useAppConfig
 * @description Hook to return the singleton app config instance
 * @param configKey: This is optional but needed for unit tests so we can test all scenarios
 * @returns the app config instance
 */
export const useAppConfig = (configKey?: string) => {
  let cleansedConfigKey = (configKey || "").trim();
  if (cleansedConfigKey.length < 1) {
    cleansedConfigKey = getAppConfigKey();
  }

  if (!configFilesMap.has(cleansedConfigKey)) {
    throw Error(`Could not find config for APP_CONFIG key "${configKey}"`);
  }

  if (!_instance) {
    const envConfig = configFilesMap.get(cleansedConfigKey) as IAppConfig;

    _instance = {
      runtimeInfo: {
        ...appRuntimeInfo,
      },
      ...envConfig,
    };

    const env = (<any>window).env;

    merge(_instance, (env && env.runtimeConfig) || {});
  }
  return _instance;
};
