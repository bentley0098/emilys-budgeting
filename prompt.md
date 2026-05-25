Create a Nuxt 3 application for monthly budget tracking, optimised for mobile UI. 
Use localStorage for data persistence. No backend required.

---

## DATA MODEL

Infer all relationships from the section descriptions below.

**PayPeriod** (top-level container for everything)
- payDate (date)
- nextPayDate (date)
- inAccount (number) — the amount currently in the account
- Fields derived from children: spending, leftToBudget, leftToSpend

**SpendingEntry** (belongs to PayPeriod)
- date, expense (name), category, cost, checked (bool)

**SpendingCategory** (belongs to PayPeriod)
- category name, budgeted amount, actual amount (actual = sum of SpendingEntries in that category), checked (bool)

**Bill** (belongs to PayPeriod)
- name, dueDate, budgeted amount, actual amount, checked (bool)

**Subscription** (belongs to PayPeriod)
- name, dueDate, budgeted amount, actual amount, checked (bool)

**Saving** (belongs to PayPeriod)
- name, dueDate, budgeted amount, actual amount, checked (bool)

**Debt** (belongs to PayPeriod)
- name, dueDate, budgeted amount, actual amount, checked (bool)

---

## DERIVED TOTALS (computed, not stored)

- **SPENDING** = sum of all SpendingEntry costs
- **BILLS** = sum of Bill actual amounts
- **SUBSCRIPTIONS** = sum of Subscription actual amounts  
- **SAVINGS** = sum of Saving actual amounts
- **DEBT** = sum of Debt actual amounts
- **LEFT TO BUDGET** = inAccount - (BILLS + SUBSCRIPTIONS + SAVINGS + DEBT)
- **LEFT TO SPEND** = LEFT TO BUDGET - SPENDING

---

## PAGES & LAYOUT

**Dashboard / Summary (home page)**
- Pay date + next pay date display
- "In Account" figure (editable inline)
- Summary strip: Spending | Left to Budget | Left to Spend
- Fixed expense totals strip: Bills | Subscriptions | Savings | Debt
- Donut or bar chart showing Total Expense Breakdown by category (mirror the chart in the PDF)
- Quick-nav buttons to each section

**Spending Page**
- Add/edit/delete spending entries (date, expense name, category, cost, ✔ toggle)
- Category summary table: category | budgeted | actual — with inline add/edit/delete
- Running total shown at bottom

**Bills Page**
- Add/edit/delete bills (name, due date, budgeted, actual, ✔ toggle)
- Running total row

**Subscriptions Page**
- Same structure as Bills

**Savings Page**
- Same structure as Bills

**Debt Page**
- Same structure as Bills

---

## UI REQUIREMENTS

- Nuxt 4 with Vue 3 Composition API
- Tailwind CSS for styling
- Mobile-first, max content width ~430px, large tap targets (min 44px)
- Bottom navigation bar for switching between Dashboard / Spending / Bills / Subscriptions / Savings / Debt
- Currency formatted as EUR (€) with 2 decimal places throughout
- Positive "left to spend" shown in green, negative in red
- ✔ checkbox column on all entry tables — checked rows visually dimmed
- Inline row editing preferred over modal dialogs where possible; modals acceptable for new entry forms
- Chart on dashboard using Chart.js or a lightweight Vue chart library

## DATA PERSISTENCE

- All data stored in localStorage under a key per pay period (keyed by payDate ISO string)
- On first load, initialise an empty pay period for the current month
- Allow user to switch between past pay periods from the dashboard (period selector)
- Export current period to JSON (nice to have)

---

Build the full application. Nuxt scaffold is already in place, use minimal dependencies, only what is explicitly mentioned, 
then implement pages and components. Ensure all CRUD operations are working and totals 
update reactively.