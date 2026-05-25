# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run preview    # Preview production build locally
npm run generate   # Static site generation
```

No linting or test commands are configured.

## Architecture

**Nuxt 4 SPA** (SSR disabled) — mobile-first monthly budget tracker. All data persists in `localStorage`; no backend.

### Data flow

```
localStorage  ←→  utils/storage.ts  ←→  usePayPeriods.ts  ←→  usePeriodTotals.ts  →  pages/components
```

1. **`app/utils/storage.ts`** — thin `localStorage` wrapper keyed by `payDate` (ISO string)
2. **`app/composables/usePayPeriods.ts`** — singleton composable holding all `PayPeriod` state; auto-saves via Vue watchers on every mutation
3. **`app/composables/usePeriodTotals.ts`** — reactive computed totals (spent, bills, subscriptions, savings, debt, `leftToBudget`, `leftToSpend`) derived from the active period
4. **`app/pages/`** — one page per category (index/dashboard, spending, bills, subscriptions, savings, debt)
5. **`app/components/`** — shared UI: modals, entry rows, summary strips, bottom nav, chart

### Data model (`app/utils/types.ts`)

`PayPeriod` is the top-level container, keyed by `payDate`:
- `SpendingEntry` — individual transactions (category, date, cost)
- `SpendingCategory` — budget targets per category
- `Bill`, `Subscription`, `Savings`, `Debt` — named fixed expenses with amounts and due dates

### Tech stack

| Layer | Library |
|---|---|
| Framework | Nuxt 4 + Vue 3 |
| CSS | Tailwind CSS 4 (Vite plugin) |
| Charts | Chart.js 4 (`ExpenseBreakdownChart.vue`) |
| IDs | `app/utils/id.ts` (UUID helper) |
| Formatting | `app/utils/format.ts` (EUR via `Intl.NumberFormat`, date utils) |

### UI conventions

- Max width 430px — designed for mobile viewport
- Minimum tap targets 44px
- Bottom navigation (`BottomNav.vue`) links all six sections
- `leftToSpend` colored green (positive) / red (negative) in `SummaryStrip.vue`
