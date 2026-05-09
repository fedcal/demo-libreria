import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Libreria del Porto — Libri italiani, esteri, tecnici — Trieste dal 1972'
  },
  {
    path: 'sezioni',
    loadComponent: () => import('./pages/sezioni/sezioni.component').then((m) => m.SezioniComponent),
    title: 'Sezioni — Libreria del Porto'
  },
  {
    path: 'eventi',
    loadComponent: () => import('./pages/eventi/eventi.component').then((m) => m.EventiComponent),
    title: 'Presentazioni ed eventi — Libreria del Porto'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Libreria del Porto'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti e ordini — Libreria del Porto'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
