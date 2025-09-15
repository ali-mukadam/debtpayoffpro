# Project: Credit Card Payoff Calculator

## Our Goal
Build a simple website that lets people calculate how long it will take to pay off their credit card debt. We will make money by charging $5.99 to download a detailed report.

## How We Will Beat competitors
-   **Clean Design:** No annoying ads. Just a simple, easy-to-use tool.
-   **Beautiful Charts:** We will use nice graphs to show the debt going down over time.
-   **Fast & Accurate:** The math will be perfect and the site will be fast.

## Tech Stuff We Are Using
-   **Next.js** (This is our main framework)
-   **TypeScript** (This makes our code less error-prone)
-   **Tailwind CSS** (This is for making it look good)
-   **Vercel** (This is where we will host the website for free)

## What We Are Building Right Now (MVP)
1.  A box where users can type in their credit card debt.
2.  A button to choose between "Avalanche" and "Snowball" payoff methods.
3.  A table that shows the monthly payment plan.
4.  A line chart that visually shows the debt decreasing.

## Important Code Structure
-   All the main math logic is in the file: `src/utils/calculations.ts`
-   The main page is in: `src/app/page.tsx`

## Our Current Task
We are currently working on the `calculatePayoff` function inside `src/utils/calculations.ts`. This function does all the important math.