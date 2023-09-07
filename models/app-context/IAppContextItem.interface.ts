/**
 * @name IAppContextItem
 * @description Represent one item in the app-context items array
 */
export interface IAppContextItem {
  parameterKey: string
  parameterValue: Object //IParameterValue | { [key: string]: string[] }
}
