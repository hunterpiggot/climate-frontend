// file: src/app-config/config-files-map.ts

// import a reference to the config interface:
import { IAppConfig } from "./models/AppConfig.interface";

// individual environments configs:
import configMock from "./config-files/config.mock.json";
import configDev from "./config-files/config.dev.json";
import configLocal from "./config-files/config.localapis.json";
import configQA from "./config-files/config.qa.json";
import configStage from "./config-files/config.stage.json";
import configProduction from "./config-files/config.production.json";

import configMixed from "./config-files/config.mixed.json";

// config files map
export const configFilesMap: Map<string, IAppConfig> = new Map<
  string,
  IAppConfig
>([
  ["mock", configMock],
  ["dev", configDev],
  ["mixed", configMixed],
  ["localapis", configLocal],
  ["qa", configQA],
  ["stage", configStage],
  ["production", configProduction],
]);
