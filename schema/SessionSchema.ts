export default interface SessionSchema {
  name: string;
  email: string;
  picture: string;
  sub: string;
  jwt: string;
  iat: number;
  exp: number;
}
