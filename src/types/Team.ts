export interface Team {
  iri: string;
  id: number;
  name: string;
  color: string;
  abbreviation: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  teamPermission: any[];
}
