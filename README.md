# Budgeting App

A mobile-first monthly budget tracker built with Nuxt 4 and Vue 3. All data is stored in `localStorage` — no backend or account required.

## Features

- Track spending by category with budget targets
- Manage fixed expenses: bills, subscriptions, savings goals, and debt payments
- Dashboard summary showing amount left to budget and left to spend
- Expense breakdown chart (Chart.js)
- Multi-period support — switch between pay periods without losing history

## Setup

```bash
npm install
```

## Development

```bash
npm run dev      # http://localhost:3000
npm run build    # Production build
npm run preview  # Preview production build locally
npm run generate # Static site generation
```

## Stack

- [Nuxt 4](https://nuxt.com) + Vue 3 (SPA, SSR disabled)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Chart.js 4](https://www.chartjs.org)
- `localStorage` for persistence (no backend)
