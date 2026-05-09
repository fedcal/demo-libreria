import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-sezioni',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, DecimalPipe, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Le nostre 12 sezioni</h1>
        <p>Oltre 35.000 volumi organizzati in sezioni specializzate. Dal fumetto al manuale universitario, trovi tutto alla Libreria del Porto.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="sezioni$ | async as data">
      <ul class="sezioni-list">
        <li *ngFor="let s of data.sezioni" class="sezione-item">
          <div class="sezione-item__header">
            <span class="sezione-item__icon" aria-hidden="true">{{ s.icona }}</span>
            <div class="sezione-item__title-group">
              <h2>{{ s.nome }}</h2>
              <span class="sezione-item__count">{{ s.numVolumi | number }} volumi</span>
            </div>
          </div>
          <p class="sezione-item__desc">{{ s.descrizione }}</p>
          <div class="sezione-item__meta">
            <span *ngIf="s.etaTarget" class="meta-badge">Età: {{ s.etaTarget }}</span>
            <span *ngIf="s.prezzoMin && s.prezzoMax" class="meta-badge">
              Da €{{ s.prezzoMin }} a €{{ s.prezzoMax }}
            </span>
            <ng-container *ngIf="s.lingueDisponibili">
              <span *ngFor="let lang of s.lingueDisponibili" class="meta-badge lang-badge">{{ lang }}</span>
            </ng-container>
          </div>
        </li>
      </ul>

      <aside class="ordini-box">
        <h2>Non trovi quello che cerchi?</h2>
        <p>Ordiniamo qualsiasi titolo disponibile in Italia o all'estero in 2–5 giorni lavorativi. Basta comunicarci ISBN, titolo o autore.</p>
        <a routerLink="/contatti" class="btn btn-primary">Ordina un libro</a>
      </aside>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .content {
        padding: 3rem 1rem;
      }
      .sezioni-list {
        list-style: none;
        margin: 0 0 3rem;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 1.25rem;
      }
      .sezione-item {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        background: var(--color-bg-default);
        transition: border-color 0.15s ease;
      }
      .sezione-item:hover {
        border-color: var(--color-accent);
      }
      .sezione-item__header {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
      }
      .sezione-item__icon {
        font-size: 2rem;
        flex-shrink: 0;
        line-height: 1;
      }
      .sezione-item__title-group {
        flex: 1;
      }
      .sezione-item__title-group h2 {
        margin: 0 0 0.15rem;
        font-size: 1.1rem;
      }
      .sezione-item__count {
        font-size: 0.8rem;
        color: var(--color-accent);
        font-weight: 600;
      }
      .sezione-item__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 1rem;
        line-height: 1.5;
      }
      .sezione-item__meta {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .meta-badge {
        font-size: 0.72rem;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        background: #fef3c7;
        color: var(--color-accent);
        font-weight: 600;
      }
      .lang-badge {
        background: var(--color-bg-subtle);
        color: var(--color-fg-muted);
      }
      .ordini-box {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2rem;
        text-align: center;
        max-width: 560px;
        margin: 0 auto;
      }
      .ordini-box h2 {
        margin: 0 0 0.75rem;
      }
      .ordini-box p {
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SezioniComponent {
  private readonly mockData = inject(MockDataService);

  readonly sezioni$ = this.mockData.sezioni$;
}
