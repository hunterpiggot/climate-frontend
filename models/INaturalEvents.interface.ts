export interface INaturalEvent {
  id: number;
  name: string;
  source: string;
  magnitude: {
    current: number;
    minimum: number;
    maximum: number;
  };
  date: Date;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
