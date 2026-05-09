import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, CurrencyPipe, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>La libreria di Trieste dal 1972</h1>
        <p class="hero-tagline">Libri italiani, esteri, tecnici, fumetti e molto altro. Una libreria indipendente nel cuore del Porto Vecchio.</p>
        <div class="hero-actions">
          <a routerLink="/sezioni" class="btn btn-primary">Esplora le sezioni</a>
          <a routerLink="/eventi" class="btn btn-secondary">Prossimi eventi</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Libreria del Porto</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">📚</span>
          <h3>35.000 volumi</h3>
          <p>Uno dei più grandi cataloghi di Trieste, con 12 sezioni specializzate.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🌍</span>
          <h3>Libri stranieri</h3>
          "grazie alla posizione di frontiera: tedesco, sloveno, inglese, francese e altri."
          <p>Tradizione mitteleuropea.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🎭</span>
          <h3>Presentazioni libri</h3>
          <p>8 eventi l'anno con autori italiani e internazionali. Ingresso libero.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">♻️</span>
          <h3>Libri usati</h3>
          <p>Acquisto e vendita di libri usati. Una seconda vita per ogni volume.</p>
        </li>
      </ul>
    </section>

    <section class="featured-eventi demo-container" *ngIf="prossimiEventi$ | async as eventi">
      <div class="section-header">
        <h2>Prossimi eventi</h2>
        <a routerLink="/eventi" class="link-more">Tutti gli eventi →</a>
      </div>
      <ul class="eventi-grid">
        <li *ngFor="let ev of eventi" class="evento-card">
          <div class="evento-card__meta">
            <span class="evento-card__tipo">{{ ev.tipo }}</span>
            <span class="evento-card__data">{{ ev.data | date: 'dd/MM/yyyy' : '' : 'it' }}</span>
          </div>
          <h3 class="evento-card__titolo">{{ ev.titolo }}</h3>
          <p class="evento-card__autore">{{ ev.autore }}</p>
          <p class="evento-card__luogo">{{ ev.ora }} — {{ ev.luogo }}</p>
          <span class="evento-card__prezzo" [class.free]="ev.prezzo === 0">
            {{ ev.prezzo === 0 ? 'Ingresso libero' : (ev.prezzo | currency: 'EUR') }}
          </span>
        </li>
      </ul>
    </section>

    <section class="featured-sezioni demo-container" *ngIf="topSezioni$ | async as sezioni">
      <div class="section-header">
        <h2>Le nostre sezioni</h2>
        <a routerLink="/sezioni" class="link-more">Tutte le 12 sezioni →</a>
      </div>
      <ul class="sezioni-grid">
        <li *ngFor="let s of sezioni" class="sezione-card">
          <span class="sezione-card__icon" aria-hidden="true">{{ s.icona }}</span>
          <h3>{{ s.nome }}</h3>
          <p>{{ s.numVolumi | number }} volumi</p>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Ordina il tuo libro</h2>
        <p>Non trovi quello che cerchi? Ordiniamo qualsiasi titolo in 2–5 giorni lavorativi.</p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Fai un ordine</a>
          <a routerLink="/eventi" class="btn btn-secondary">Prossimi eventi</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #fef3c7 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #78350f;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .featured-eventi {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 2rem;
      }
      .featured-sezioni {
        padding: 4rem 1rem;
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .eventi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
      .evento-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .evento-card__meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      .evento-card__tipo {
        font-size: 0.75rem;
        font-weight: 700;
        background: #fef3c7;
        color: var(--color-accent);
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
      }
      .evento-card__data {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .evento-card__titolo {
        margin: 0 0 0.25rem;
        font-size: 1rem;
      }
      .evento-card__autore {
        margin: 0 0 0.25rem;
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--color-accent);
      }
      .evento-card__luogo {
        margin: 0 0 0.75rem;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .evento-card__prezzo {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--color-fg-muted);
      }
      .evento-card__prezzo.free {
        color: var(--color-success);
      }
      .sezioni-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 1rem;
      }
      .sezione-card {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
        background: var(--color-bg-default);
        transition: border-color 0.15s ease;
      }
      .sezione-card:hover {
        border-color: var(--color-accent);
      }
      .sezione-card__icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .sezione-card h3 {
        margin: 0 0 0.25rem;
        font-size: 0.95rem;
      }
      .sezione-card p {
        margin: 0;
        font-size: 0.8rem;
        color: var(--color-fg-muted);
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly prossimiEventi$ = this.mockData.eventi$.pipe(
    map((e) => e.eventi.slice(0, 3))
  );

  readonly topSezioni$ = this.mockData.sezioni$.pipe(
    map((s) => s.sezioni.slice(0, 6))
  );
}
