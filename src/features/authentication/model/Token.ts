export type Token = {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role":
    | "Admin"
    | "Client";

  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  jti: string;
};
