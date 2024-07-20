export interface User {
  id: number;
  fullName: string;
  displayName: string;
  initials: string;
  email: string;
  phoneNumber: string;
  phoneCountryPrefix: string;
  teamIds: number[];
  image: string;
  address: {
    iri: string;
    id: number;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    country: string;
    postalCode: string;
    state: string | null;
  };
  isEmployee: boolean;
  functionName: string;
  userPermissions: any[];
}
