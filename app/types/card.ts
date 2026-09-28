import type { Object as Property } from '#shared/types/properties';

export type Card = Pick<
  Property,
  | 'Id'
  | 'Prijs'
  | 'Adres'
  | 'Woonoppervlakte'
  | 'Woonplaats'
  | 'Postcode'
  | 'AantalKamers'
  | 'Foto'
>;
