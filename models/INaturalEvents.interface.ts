export interface INaturalEvent {
  id: number;
  name: string;
  source: string;
  magnitude: {
    current: number;
    minimum: number;
    maximum: number;
  };
  date: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
