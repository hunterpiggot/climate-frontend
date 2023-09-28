export interface IHistoricalData {
  latitude: number;
  longitude: number;
  generationTimeMs: number;
  utcOffsetSeconds: number;
  timezone: string;
  timezoneAbbreviation: string;
  elevation: number;
  hourlyUnits: {
    time: string;
    temperatureTwoM: string;
  };
  hourly: {
    time: string[];
    temperatureTwoM: number | null[];
  };
}
