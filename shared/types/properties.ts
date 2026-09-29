export interface Properties {
  AccountStatus: number;
  EmailNotConfirmed: boolean;
  ValidationFailed: boolean;
  ValidationReport: null;
  Website: number;
  Metadata: Metadata;
  Objects: PropertyObject[];
  Paging: Paging;
  TotaalAantalObjecten: number;
}

export interface Metadata {
  ObjectType: string;
  Omschrijving: string;
  Titel: string;
}

export interface PropertyObject {
  AangebodenSindsTekst: AangebodenSindsTekst;
  AanmeldDatum: AanmeldDatum;
  AantalBeschikbaar: null;
  AantalKamers: number;
  AantalKavels: null;
  Aanvaarding: Aanvaarding;
  Adres: string;
  Afstand: number;
  BronCode: BronCode;
  ChildrenObjects: any[];
  DatumAanvaarding: null;
  DatumOndertekeningAkte: null;
  Foto: string;
  FotoLarge: string;
  FotoLargest: string;
  FotoMedium: string;
  FotoSecure: string;
  GewijzigdDatum: null;
  GlobalId: number;
  GroupByObjectType: string;
  Heeft360GradenFoto: boolean;
  HeeftBrochure: boolean;
  HeeftOpenhuizenTopper: boolean;
  HeeftOverbruggingsgrarantie: boolean;
  HeeftPlattegrond: boolean;
  HeeftTophuis: boolean;
  HeeftVeiling: boolean;
  HeeftVideo: boolean;
  HuurPrijsTot: null;
  Huurprijs: null;
  HuurprijsFormaat: null;
  Id: string;
  InUnitsVanaf: null;
  IndProjectObjectType: boolean;
  IndTransactieMakelaarTonen: null;
  IsSearchable: boolean;
  IsVerhuurd: boolean;
  IsVerkocht: boolean;
  IsVerkochtOfVerhuurd: boolean;
  Koopprijs: number;
  KoopprijsFormaat: KoopprijsFormaat;
  KoopprijsTot: number;
  Land: null;
  MakelaarId: number;
  MakelaarNaam: string;
  MobileURL: string;
  Note: null;
  OpenHuis: string[];
  Oppervlakte: number;
  Perceeloppervlakte: number;
  Postcode: string;
  Prijs: ListingPrijs;
  PrijsGeformatteerdHtml: string;
  PrijsGeformatteerdTextHuur: string;
  PrijsGeformatteerdTextKoop: string;
  Producten: Producten[];
  Project: Project;
  ProjectNaam: null;
  PromoLabel: PromoLabel;
  PublicatieDatum: string;
  PublicatieStatus: number;
  SavedDate: null;
  'Soort-aanbod': SoortAanbod;
  SoortAanbod: number;
  StartOplevering: null;
  TimeAgoText: null;
  TransactieAfmeldDatum: null;
  TransactieMakelaarId: null;
  TransactieMakelaarNaam: null;
  TypeProject: number;
  URL: string;
  VerkoopStatus: VerkoopStatus;
  WGS84_X: number;
  WGS84_Y: number;
  WoonOppervlakteTot: number;
  Woonoppervlakte: number;
  Woonplaats: string;
  ZoekType: number[];
}

export enum AangebodenSindsTekst {
  SpanTitleLangerDan6Maanden6MaandenSpan = '<span title="langer dan 6 maanden">6+ maanden</span>',
  The5Maanden = '5 maanden',
}

export enum AanmeldDatum {
  Date12623004000000100 = '/Date(1262300400000+0100)/',
}

export enum Aanvaarding {
  InOverleg = 'InOverleg',
}

export enum BronCode {
  Lmv = 'LMV',
  Nvm = 'NVM',
  Vbo = 'VBO',
}

export enum KoopprijsFormaat {
  KoopPrijsKostenKoperKort = '<[KoopPrijs]> <{kosten koper|kort}>',
}

export interface ListingPrijs {
  GeenExtraKosten: boolean;
  HuurAbbreviation: string;
  Huurprijs: null;
  HuurprijsOpAanvraag: string;
  HuurprijsTot: null;
  KoopAbbreviation: KoopAbbreviation;
  Koopprijs: number;
  KoopprijsOpAanvraag: string;
  KoopprijsTot: number;
  OriginelePrijs: null;
  VeilingText: string;
}

export enum KoopAbbreviation {
  KK = 'k.k.',
}

export enum Producten {
  Brochure = 'Brochure',
  Featured = 'Featured',
  Plattegrond = 'Plattegrond',
  The360Fotos = '360-fotos',
  Video = 'Video',
}

export interface Project {
  AantalKamersTotEnMet: null;
  AantalKamersVan: null;
  AantalKavels: null;
  Adres: null;
  FriendlyUrl: null;
  GewijzigdDatum: null;
  GlobalId: null;
  HoofdFoto: HoofdFoto;
  IndIpix: boolean;
  IndPDF: boolean;
  IndPlattegrond: boolean;
  IndTop: boolean;
  IndVideo: boolean;
  InternalId: string;
  MaxWoonoppervlakte: null;
  MinWoonoppervlakte: null;
  Naam: null;
  Omschrijving: null;
  OpenHuizen: any[];
  Plaats: null;
  Prijs: null;
  PrijsGeformatteerd: null;
  PublicatieDatum: null;
  Type: number;
  Woningtypen: null;
}

export enum HoofdFoto {
  ImgThumbsThumbGeenFotoGIF = '/img/thumbs/thumb-geen-foto.gif',
}

export interface PromoLabel {
  HasPromotionLabel: boolean;
  PromotionPhotos: string[];
  PromotionPhotosSecure: string[] | null;
  PromotionType: number;
  RibbonColor: number;
  RibbonText: null;
  Tagline: null | string;
}

export enum SoortAanbod {
  Woonhuis = 'woonhuis',
}

export enum VerkoopStatus {
  StatusBeschikbaar = 'StatusBeschikbaar',
}

export interface Paging {
  AantalPaginas: number;
  HuidigePagina: number;
  VolgendeUrl: string;
  VorigeUrl: null;
}
