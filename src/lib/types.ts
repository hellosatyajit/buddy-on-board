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

export interface AuthFormData {
  email: string;
  password: string;
}

export interface UserMetadata {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber?: string;
  countryOfResidence: string;
}

export type BookingStatus = "upcoming" | "requests" | "previous" | "canceled";
export type BookingRequestType = "travel" | "courier";

export interface TravelBuddy {
  id: string;
  name: string;
  profileImg: string;
  rating: number;
  languages: string[];
  departureTime: string;
  departureDate: string;
  departureLocation: string;
  arrivalTime: string;
  arrivalDate: string;
  arrivalLocation: string;
  type: BookingStatus;
  canceledDate?: string;
  requestInfo?: {
    sentDate: string;
    requestType: BookingRequestType;
    passengers?: number;
    documentType?: string;
  };
  ratingInfo?: {
    rated: boolean;
    userRating: number;
    comment: string;
  };
}
