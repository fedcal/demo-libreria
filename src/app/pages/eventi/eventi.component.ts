import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';
import type { Evento } from '../../data/types';

@Component({
  selector: 'app-eventi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, DatePipe, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Presentazioni ed eventi</h1>
        <p>8 appuntamenti in programma. Presentazioni di libri con autori, reading e serate di divulgazione.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="eventi$ | async as data">
      <ul class="eventi-list">
        <li *ngFor="let ev of data.eventi" class="evento-item">
          <div class="evento-item__sidebar">
            <div class="evento-item__date">
              <span class="date-day">{{ ev.data | date: 'dd' }}</span>
              <span class="date-month">{{ ev.data | date: 'MMM' : '' : 'it' | uppercase }}</span>
            </div>
            <span class="evento-item__tipo">{{ ev.tipo }}</span>
          </div>
          <div class="evento-item__body">
            <h2>{{ ev.titolo }}</h2>
            <p class="autore">{{ ev.autore }}</p>
            <p class="dettagli">
              <span>{{ ev.ora }}</span>
              <span class="sep" aria-hidden="true">·</span>
              <span>{{ ev.luogo }}</span>
            </p>
            <p class="descrizione">{{ ev.descrizione }}</p>
            <div class="evento-item__footer">
              <span class="prezzo" [class.free]="ev.prezzo === 0">
                {{ ev.prezzo === 0 ? 'Ingresso libero' : (ev.prezzo | currency: 'EUR') }}
              </span>
              <span class="posti">{{ ev.postiDisponibili }} posti disponibili</span>
              <button
                type="button"
                class="btn btn-primary"
                (click)="apriPrenotazione(ev)"
                *ngIf="!prenotazioneInviata()"
              >
                {{ ev.prezzo === 0 ? 'Prenota posto' : 'Acquista biglietto' }}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </article>

    <div class="modal-overlay" *ngIf="eventoSelezionato()" (click)="chiudiModale($event)">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <ng-container *ngIf="!prenotazioneInviata(); else thankyouTpl">
          <h2 id="modal-title">Prenota per: {{ eventoSelezionato()?.titolo }}</h2>
          <p class="modal-meta">
            {{ eventoSelezionato()?.data | date: 'dd/MM/yyyy' }} alle {{ eventoSelezionato()?.ora }}
          </p>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="field">
              <label for="nome">Nome e cognome</label>
              <input id="nome" type="text" formControlName="nome" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" required />
            </div>
            <div class="field">
              <label for="posti">Numero di posti</label>
              <input id="posti" type="number" formControlName="posti" min="1" max="6" required />
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto la privacy policy per la ricezione della conferma di prenotazione.
              </label>
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Conferma prenotazione</button>
              <button type="button" class="btn btn-secondary" (click)="chiudiModale()">Annulla</button>
            </div>
            <p class="form-disclaimer">
              Demo non funzionale: nessuna prenotazione è realmente inviata.
            </p>
          </form>
        </ng-container>
        <ng-template #thankyouTpl>
          <div class="thankyou">
            <h3>Prenotazione confermata!</h3>
            <p>
              Grazie {{ form.value.nome }}. Hai riservato {{ form.value.posti }}
              {{ form.value.posti === 1 ? 'posto' : 'posti' }} per<br />
              <strong>{{ eventoSelezionato()?.titolo }}</strong>.
            </p>
            <p>In un sito reale riceveresti email di conferma all'indirizzo indicato.</p>
            <button type="button" class="btn btn-secondary" (click)="chiudiModale()">Chiudi</button>
          </div>
        </ng-template>
      </div>
    </div>
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
      }
      .content {
        padding: 3rem 1rem;
      }
      .eventi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .evento-item {
        display: grid;
        grid-template-columns: 80px 1fr;
        gap: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        background: var(--color-bg-default);
      }
      .evento-item__sidebar {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
      .evento-item__date {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--color-accent);
        color: #ffffff;
        border-radius: var(--radius-md);
        padding: 0.5rem 0.75rem;
        min-width: 56px;
      }
      .date-day {
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
      }
      .date-month {
        font-size: 0.7rem;
        font-weight: 600;
      }
      .evento-item__tipo {
        font-size: 0.7rem;
        text-align: center;
        color: var(--color-fg-muted);
        font-weight: 600;
      }
      .evento-item__body h2 {
        margin: 0 0 0.25rem;
        font-size: 1.1rem;
      }
      .autore {
        margin: 0 0 0.25rem;
        font-weight: 600;
        color: var(--color-accent);
        font-size: 0.9rem;
      }
      .dettagli {
        margin: 0 0 0.75rem;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        display: flex;
        gap: 0.4rem;
        align-items: center;
      }
      .sep {
        color: var(--color-border);
      }
      .descrizione {
        margin: 0 0 1rem;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.5;
      }
      .evento-item__footer {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .prezzo {
        font-weight: 700;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
      }
      .prezzo.free {
        color: var(--color-success);
      }
      .posti {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
      }
      .btn {
        display: inline-block;
        padding: 0.55rem 1.25rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        border: none;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #78350f;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 200;
        padding: 1rem;
      }
      .modal {
        background: var(--color-bg-default);
        border-radius: var(--radius-lg);
        padding: 2rem;
        max-width: 480px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
      }
      .modal h2 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }
      .modal-meta {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 1.5rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
      }
      .field input:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .modal-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-top: 1.25rem;
      }
      .form-disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.5rem;
      }
      .thankyou {
        text-align: center;
      }
      .thankyou h3 {
        color: var(--color-success);
      }
      @media (max-width: 600px) {
        .evento-item {
          grid-template-columns: 1fr;
        }
        .evento-item__sidebar {
          flex-direction: row;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly eventi$ = this.mockData.eventi$;
  readonly eventoSelezionato = signal<Evento | null>(null);
  readonly prenotazioneInviata = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    posti: [1, [Validators.required, Validators.min(1), Validators.max(6)]],
    privacy: [false, Validators.requiredTrue]
  });

  apriPrenotazione(ev: Evento): void {
    this.eventoSelezionato.set(ev);
    this.prenotazioneInviata.set(false);
    this.form.reset({ posti: 1, privacy: false });
  }

  chiudiModale(event?: Event): void {
    if (event && (event.target as HTMLElement).classList.contains('modal')) {
      return;
    }
    if (event && !(event.target as HTMLElement).classList.contains('modal-overlay')) {
      return;
    }
    this.eventoSelezionato.set(null);
    this.prenotazioneInviata.set(false);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.prenotazioneInviata.set(true);
    }
  }
}
