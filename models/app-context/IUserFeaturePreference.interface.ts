export interface IUserFeaturePreference {
  attributeName: string
  attributeValue: any
}

export interface IUserFeaturePreferences {
  featureName: string
  preferences: IUserFeaturePreference[]
}
