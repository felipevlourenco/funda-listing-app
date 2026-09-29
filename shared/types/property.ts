export interface Property {
  AangebodenSinds: string;
  AangebodenSindsTekst: string;
  AantalBadkamers: number;
  AantalKamers: number;
  AantalSlaapkamers: null;
  AantalWoonlagen: string;
  Aanvaarding: string;
  Adres: string;
  AfgekochtDatum: null;
  BalkonDakterras: null;
  BedrijfsruimteCombinatieObject: null;
  BezichtingDagdelen: BezichtingDag[];
  BezichtingDagen: BezichtingDag[];
  BijdrageVVE: null;
  Bijzonderheden: null;
  Bouwjaar: string;
  Bouwvorm: string;
  BronCode: string;
  ContactpersoonEmail: null;
  ContactpersoonTelefoon: null;
  Cv: string;
  DatumOndertekeningAkte: null;
  Deeplink: null;
  DetailInfo: DetailInfo;
  EigendomsSituatie: null;
  Energielabel: Energielabel;
  ErfpachtBedrag: null;
  Garage: string;
  GarageIsolatie: string;
  GarageVoorzieningen: null;
  GelegenOp: null;
  GewijzigdDatum: string;
  HoofdFoto: string;
  HoofdFotoSecure: string;
  HoofdTuinType: string;
  Id: number;
  IndBasisPlaatsing: boolean;
  IndFotos: boolean;
  IndIpix: boolean;
  IndOpenhuizenTopper: boolean;
  IndPDF: boolean;
  IndPlattegrond: boolean;
  IndTop: boolean;
  IndVeilingProduct: boolean;
  IndVideo: boolean;
  Inhoud: number;
  InternalId: string;
  IsIngetrokken: boolean;
  IsVerhuurd: boolean;
  IsVerkocht: boolean;
  Isolatie: string;
  Kenmerken: KenmerkenKort[];
  KenmerkenKort: KenmerkenKort;
  KenmerkenTitel: null;
  Ligging: string;
  MLIUrl: string;
  Makelaar: string;
  MakelaarId: number;
  MakelaarTelefoon: string;
  MedeAanbieders: unknown[];
  Media: Media[];
  'Media-Foto': string[];
  MobileURL: string;
  ObjectType: string;
  ObjectTypeMetVoorvoegsel: string;
  OpenHuizen: OpenHuizen[];
  PerceelOppervlakte: number;
  PermanenteBewoning: string;
  Plaats: string;
  Postcode: string;
  Prijs: Prijs;
  PrijsGeformatteerd: string;
  Project: null;
  ProjectNaam: null;
  PublicatieDatum: string;
  PublicatieStatus: number;
  SchuurBerging: string;
  SchuurBergingIsolatie: string;
  SchuurBergingVoorzieningen: string;
  ScrambledId: string;
  ServiceKosten: number;
  SoortAanbod: number;
  SoortDak: string;
  SoortGarage: string;
  SoortParkeergelegenheid: string;
  SoortPlaatsing: number;
  SoortWoning: string;
  Titels: Titel[];
  ToonBezichtigingMaken: boolean;
  ToonBrochureAanvraag: boolean;
  ToonMakelaarWoningaanbod: boolean;
  ToonReageren: boolean;
  TransactieAfmeldDatum: null;
  TransactieMakelaarId: null;
  TransactieMakelaarNaam: null;
  TuinLigging: string;
  TypeProject: number;
  URL: string;
  Veiling: Veiling;
  VerkoopStatus: string;
  Verwarming: string;
  Video: null;
  VolledigeOmschrijving: string;
  Voorzieningen: string;
  WGS84_X: number;
  WGS84_Y: number;
  WarmWater: string;
  WoonOppervlakte: number;
  EersteHuurPrijs: null;
  EersteHuurPrijsLang: null;
  EersteKoopPrijs: number;
  EersteKoopPrijsLang: string;
  HuurPrijs: null;
  HuurPrijsLang: null;
  HuurPrijsTot: null;
  Huurprijs: null;
  HuurprijsFormaat: null;
  KoopPrijs: number;
  KoopPrijsLang: string;
  Koopprijs: number;
  KoopprijsFormaat: string;
  KoopprijsTot: null;
  ShortURL: string;
  Tuin: string;
  VeilingGeformatteerd: null;
}

export interface BezichtingDag {
  Naam: string;
  Waarde: string;
}

export interface DetailInfo {
  HasPromotionLabel: boolean;
  PromotionLabelType: number;
  RibbonColor: number;
  RibbonText: null;
  Tagline: string;
}

export interface Energielabel {
  Definitief: boolean;
  Index: null;
  Label: string;
  NietBeschikbaar: boolean;
  NietVerplicht: boolean;
}

export interface KenmerkenKort {
  Ad: null | string;
  Kenmerken: Kenmerken[];
  LokNummer: number;
  SubKenmerk: KenmerkenKort | null;
  Titel: null | string;
}

export interface Kenmerken {
  Naam: string;
  NaamCss: null | string;
  Waarde: string;
  WaardeCss: null | string;
}

export interface Media {
  Categorie: number;
  ContentType: number;
  Id: string;
  IndexNumber: number;
  MediaItems: MediaItem[];
  Metadata: null | string;
  Omschrijving: null | string;
  RegistratieVerplicht: boolean;
  Soort: number;
}

export interface MediaItem {
  Category: number;
  Height: number;
  Url: string;
  UrlSecure: null | string;
  Width: number;
}

export interface OpenHuizen {
  Datum: string;
  EindTijd: number;
  OpenHuisTekst: string;
  StartTijd: number;
}

export interface Prijs {
  GeenExtraKosten: null;
  HuurAbbreviation: string;
  Huurprijs: null;
  HuurprijsOpAanvraag: string;
  HuurprijsTot: null;
  KoopAbbreviation: string;
  Koopprijs: number;
  KoopprijsOpAanvraag: string;
  KoopprijsTot: null;
  OriginelePrijs: null;
  VeilingText: string;
}

export interface Titel {
  Omschrijving: string;
  Pagina: number;
}

export interface Veiling {
  EindDatum: null;
  Link: null;
  StartDatum: null;
  VeilingPartij: null;
}
