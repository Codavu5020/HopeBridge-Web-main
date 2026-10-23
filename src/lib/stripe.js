import { loadStripe } from '@stripe/stripe-js'

// The publishable key is safe to expose in the browser.
export const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

// Stripe.js is only loaded when a key is configured. Without one, the
// donation page falls back to a clearly labelled demo form.
export const stripePromise = publishableKey ? loadStripe(publishableKey) : null

export const stripeAppearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#14605C',
    colorText: '#0E2A36',
    colorDanger: '#B3261E',
    fontFamily: 'Figtree, system-ui, sans-serif',
    borderRadius: '10px',
    spacingUnit: '4px',
  },
}
