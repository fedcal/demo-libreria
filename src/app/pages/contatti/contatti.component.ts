import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti e ordini</h1>
        <p>Ordina un libro, chiedi un consiglio o prenota posto per un evento. Siamo qui per te.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">
        <section class="info-block">
          <h2>Dove siamo</h2>
          <address class="address-block">
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            {{ info.indirizzo.regione }}
          </address>

          <h2>Contatti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Orari di apertura</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>{{ info.orari.domenica }}</span></li>
          </ul>

          <div class="servizi-chips">
            <span *ngIf="info.servizi.ordiniOnline" class="chip">Ordini online</span>
            <span *ngIf="info.servizi.giftCard" class="chip">Gift card</span>
            <span *ngIf="info.servizi.scontoFedelta" class="chip">Sconto fedeltà</span>
            <span *ngIf="info.servizi.angoloCaffe" class="chip">Angolo caffè</span>
            <span *ngIf="info.servizi.wifiGratuito" class="chip">Wi-Fi gratuito</span>
            <span *ngIf="info.servizi.accessibileDisabili" class="chip">Accessibile</span>
          </div>
        </section>

        <section class="form-block">
          <h2>Ordina un libro o scrivi un messaggio</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome</label>
              <input id="nome" type="text" formControlName="nome" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" required />
            </div>
            <div class="field">
              <label for="telefono">Telefono (opzionale)</label>
              <input id="telefono" type="tel" formControlName="telefono" />
            </div>
            <div class="field">
              <label for="tipo">Tipo richiesta</label>
              <select id="tipo" formControlName="tipo" required>
                <option value="">-- Seleziona --</option>
                <option value="ordine">Ordine libro specifico</option>
                <option value="consiglio">Consiglio libri regalo</option>
                <option value="evento">Prenotazione evento</option>
                <option value="usato">Valutazione libri usati</option>
                <option value="altro">Altro</option>
              </select>
            </div>
            <div class="field">
              <label for="messaggio">Messaggio</label>
              <textarea id="messaggio" formControlName="messaggio" rows="5" required></textarea>
              <span class="field-hint">Per ordini: indica titolo, autore o ISBN del libro.</span>
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto la privacy policy e il trattamento dei dati per rispondere alla mia richiesta.
              </label>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia messaggio</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun messaggio è realmente inviato.
            </p>
          </form>
          <ng-template #thankyou>
            <div class="thankyou">
              <h3>Messaggio inviato!</h3>
              <p>Grazie {{ form.value.nome }}, abbiamo ricevuto la tua richiesta di tipo <strong>{{ form.value.tipo }}</strong>.</p>
              <p>In un sito reale ti risponderemmo entro 24 ore all'indirizzo indicato.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuovo messaggio</button>
            </div>
          </ng-template>
        </section>
      </div>
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
      }
      .content {
        padding: 3rem 1rem;
      }
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.1rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .address-block {
        font-style: normal;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1.25rem;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .servizi-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
      .chip {
        font-size: 0.72rem;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        background: #fef3c7;
        color: var(--color-accent);
        font-weight: 600;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
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
      .field input,
      .field textarea,
      .field select {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: var(--color-bg-default);
      }
      .field input:focus,
      .field textarea:focus,
      .field select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field-hint {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        margin-top: 0.25rem;
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
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    tipo: ['', Validators.required],
    messaggio: ['', [Validators.required, Validators.minLength(10)]],
    privacy: [false, Validators.requiredTrue]
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacy: false });
    this.submitted.set(false);
  }
}
