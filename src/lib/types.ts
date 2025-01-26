export interface Airport {
  id: number;
  name: string;
  iata_code: string;
  latitude: number;
  longitude: number;
  type: string;
  source: string;
  ident: string;
  elevation_ft: number;
  continent: string;
  iso_country: string;
  iso_region: string;
  municipality: string;
  gps_code: string;
  local_code: string;
  is_armforced: 1 | 0;
}
