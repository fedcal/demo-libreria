# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Libreria'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## Possibili Sviluppi Personalizzabili

Estendere il template libreria con feature di nicchia:

- **AI Book Recommendation Engine RediSearch**: dialogo qwen2.5 per genere/tema/lunghezza, smart carousel (140h)
- **Smart Inventory + Predictive Restocking**: LightGBM seasonal forecasting, supplier optimization (150h)
- **Author Engagement Platform**: CRM-lite dashboard, YouTube livestream, email automazione, royalty tracking (120h)
- **Multi-Supplier Inventory Orchestration**: Mondadori/Messaggerie/Feltrinelli real-time API, auto-reorder (180h)
- **Resale Used Books Marketplace**: LLaVA condition grading, Stripe escrow, sustainability badge (130h)
- **SEO Content Hub AI-Assisted**: RAG blog generator, CMS-lite, content calendar, backlink strategy (160h)
- **ISBN management evoluto**: collegamento Worldcat, identificazione edizioni multiple, binding type tracking (70h)
- **Goodreads sync**: importazione rating community, aggiunti serie libro (parte 1/2/3), reading progress (85h)
- **Reading challenge gamification**: 2026 reading goal, streak badges, social sharing "oggi ho finito", leaderboard (100h)
- **Bookclub features**: create club, discussion thread per capitolo, book selection voting (140h)
- **Author outreach**: contact form → email autore, interview submission, book launch coordination (60h)
- **Audio book integration**: Audible API, suggest audio version, bundle offer (40h)

Vedi [Tier & Funzionalità](/tier-features) per architettura completa moduli avanzati.

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `libreria` con nome cliente (`acme-pizzeria`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account
