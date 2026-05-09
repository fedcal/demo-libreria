import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>La nostra storia</h1>
        <p>Cinquant'anni di libri nel cuore di Trieste. Una famiglia, una passione, una comunità.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>Libreria del Porto — dal 1972</h2>
        <p>
          Sergio Volpe apre la Libreria del Porto nel 1972, in un piccolo locale di Via del Porto Vecchio.
          Trieste, città di confine e crocevia culturale tra Italia, Austria e Sloveni, offre un contesto
          unico: lettori che leggono in quattro lingue, appassionati di letteratura mitteleuropea,
          commercianti con bisogno di testi tecnici e studenti universitari.
        </p>
        <p>
          Negli anni '80 la libreria cresce e si specializza nella sezione libri stranieri, con un catalogo
          in tedesco, sloveno, inglese e francese che non trova eguali in regione. Negli anni '90 arrivano
          i fumetti e i manga, affidati a Roberto Kern, che trasforma quella sezione in un punto di
          riferimento per i collezionisti di tutto il Friuli-Venezia Giulia.
        </p>
        <p>
          Oggi la Libreria del Porto occupa 420 mq, conta 35.000 volumi e un team di 5 librai specializzati.
          Marta, figlia di Sergio, gestisce la narrativa e i libri per ragazzi; Federica Dossi segue la
          sezione tecnico-scientifica; Danilo Russo è il custode dei libri usati e fuori catalogo.
          Il servizio rimane quello di sempre: ascolto, consiglio, passione.
        </p>
      </section>

      <section class="values">
        <h2>I nostri valori</h2>
        <ul class="values-grid">
          <li>
            <h3>Indipendenza</h3>
            <p>Siamo una libreria indipendente. Ogni consiglio è sincero, ogni selezione è nostra.</p>
          </li>
          <li>
            <h3>Radici triestine</h3>
            <p>Trieste è una città di lettori. La nostra selezione riflette questa identità culturale unica.</p>
          </li>
          <li>
            <h3>Plurilinguismo</h3>
            <p>Libri in italiano, tedesco, sloveno, inglese, francese e molte altre lingue. Nessuna frontiera.</p>
          </li>
          <li>
            <h3>Sostenibilità</h3>
            <p>Promuoviamo i libri usati e il riuso culturale. Ogni libro merita una seconda vita.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as team">
        <h2>Il nostro team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of team.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq" *ngIf="faq$ | async as faq">
        <h2>Domande frequenti</h2>
        <dl class="faq-list">
          <ng-container *ngFor="let item of faq.faq">
            <dt>{{ item.domanda }}</dt>
            <dd>{{ item.risposta }}</dd>
          </ng-container>
        </dl>
      </section>
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
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--color-accent);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
      }
      .team-card__role {
        margin: 0 0 0.75rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .team-card__bio {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.5;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: var(--color-fg-muted);
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: #fef3c7;
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-accent);
        font-weight: 600;
      }
      .faq {
        max-width: 720px;
        margin: 0 auto;
      }
      .faq h2 {
        margin-bottom: 1.5rem;
      }
      .faq-list {
        margin: 0;
        padding: 0;
      }
      .faq-list dt {
        font-weight: 600;
        margin-bottom: 0.5rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--color-border);
      }
      .faq-list dt:first-child {
        border-top: none;
        padding-top: 0;
      }
      .faq-list dd {
        margin: 0 0 0.5rem 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
