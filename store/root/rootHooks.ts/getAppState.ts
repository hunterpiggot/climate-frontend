// import { IRootState, rootStore } from "../../Root.store";

import { IRootState, rootStore } from "..";

/**
 * @name getAppState
 * @description
 * This will be used mainly across store modules (i.e. global/security/localization/etc)
 * In components we'll usually use getters, not this.
 * @returns a copy of the current app state in its entirety
 */
export function _getAppState(): IRootState {
  const appState = rootStore().getState();
  return {
    ...appState,
  };
}
