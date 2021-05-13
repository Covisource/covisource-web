export default interface SessionSchema {
  name: string;
  email: string;
  picture: string;
  sub: string;
  jwt: string;
  location: Location;
  iat: number;
  exp: number;
}

interface Location {
  coordinates: string[];
  displayName: string;
}
