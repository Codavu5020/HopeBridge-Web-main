# HopeBridge Foundation website

A React + Vite website for a children-and-families non-profit, with a Stripe-powered donation page.

## Pages

| Route | What it is |
| --- | --- |
| `/` | **Foundation**: mission, programs, how a gift travels, 2026 goal, gift guide, volunteer form, FAQ |
| `/about` | **About us**: the student group, what we delivered, our process and tech stack |
| `/donate` | **Payment UI**: amount picker, donor details, Stripe `PaymentElement` |
| `/donate/complete` | Confirmation page for payment methods that redirect (for example bank redirects) |

## Run it

```bash
npm install          # use install (not ci): package.json now includes Stripe packages
npm run dev          # http://localhost:5173
```

The donation page works immediately in **demo mode** (no charge, no key needed) so the UI can be reviewed.

## Turn on real Stripe payments (test mode)

1. Create a free [Stripe](https://dashboard.stripe.com/register) account and open **Developers → API keys**.
2. Copy `.env.example` to `.env` and fill in both keys:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
3. Start the payment server in a second terminal:
   ```bash
   npm run server       # http://localhost:4242 (Vite proxies /api to it)
   ```
4. Open `/donate` and pay with Stripe's test card `4242 4242 4242 4242`, any future expiry, any CVC.
   More test cards: https://docs.stripe.com/testing

## How the payment flow works

```
Donate page ──► <Elements mode="payment"> + <PaymentElement>   (@stripe/react-stripe-js)
     │  submit
     ├─► elements.submit()                         validate the card fields
     ├─► POST /api/create-payment-intent           server/index.js creates the PaymentIntent
     └─► stripe.confirmPayment({ clientSecret })   Stripe charges the card
```

- The **publishable key** is public and lives in the browser.
- The **secret key** only exists in `server/index.js` and `.env` (which is git-ignored).
- The server validates the amount ($5 to $10,000) before creating a payment.

## Editing content

- Foundation copy, programs, goals, gift guide and FAQ: `src/data/content.js`
- Group members, deliverables, process and tech stack: `src/data/team.js`
- Colors and fonts: CSS variables at the top of `src/index.css`

## Project structure

```
server/index.js              Express server (creates Stripe PaymentIntents)
src/
  pages/                     Home, About, Donate, DonateComplete
  components/                Navbar, Footer, BridgeIllustration, ...
  components/payment/        DonationFlow, StripeCheckout, DemoCheckout, AmountPicker, ...
  hooks/useDonationForm.js   Amount + donor state and validation
  lib/stripe.js              loadStripe + appearance settings
  data/                      All written content
```
