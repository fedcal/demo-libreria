// Tipi TypeScript per i dati mock della Libreria del Porto

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziLibreria {
  ordiniOnline: boolean;
  ordiniLibriNonDisponibili: boolean;
  giftCard: boolean;
  scontoFedelta: boolean;
  accessibileDisabili: boolean;
  wifiGratuito: boolean;
  angoloCaffe: boolean;
  mq: number;
  volumi: number;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  fondazione: number;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  servizi: ServiziLibreria;
  metaSeo: MetaSeo;
}

export interface SezioneLibreria {
  id: string;
  nome: string;
  descrizione: string;
  icona: string;
  numVolumi: number;
  etaTarget?: string;
  lingueDisponibili?: string[];
  prezzoMin?: number;
  prezzoMax?: number;
}

export interface Sezioni {
  sezioni: SezioneLibreria[];
}

export interface Evento {
  id: number;
  tipo: string;
  titolo: string;
  autore: string;
  data: string;
  ora: string;
  luogo: string;
  descrizione: string;
  prezzo: number;
  postiDisponibili: number;
  immagine: string;
  libro?: string;
  editore?: string;
}

export interface Eventi {
  eventi: Evento[];
}

export interface Membro {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  specialita: string[];
}

export interface Team {
  team: Membro[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface Faq {
  faq: FaqItem[];
}
