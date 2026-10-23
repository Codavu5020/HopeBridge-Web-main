// Minimal payment server for HopeBridge Foundation.
// Creates Stripe PaymentIntents so the secret key never reaches the browser.
//
// Run with:  npm run server   (reads STRIPE_SECRET_KEY from .env)
import express from 'express'
import Stripe from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEY
const port = process.env.PORT || 4242

if (!secretKey) {
  console.error(
    'Missing STRIPE_SECRET_KEY. Copy .env.example to .env and add your Stripe test secret key.',
  )
  process.exit(1)
}

const stripe = new Stripe(secretKey)
const app = express()
app.use(express.json())

// Donation limits in the smallest currency unit (cents)
const MIN_AMOUNT = 500 // $5
const MAX_AMOUNT = 1_000_000 // $10,000

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, name, email } = req.body ?? {}

    if (!Number.isInteger(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      return res
        .status(400)
        .json({ error: 'Donation amount must be between $5 and $10,000.' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      description: 'HopeBridge Foundation donation (Bridge Fund)',
      receipt_email: typeof email === 'string' && email ? email : undefined,
      metadata: {
        donor_name: typeof name === 'string' ? name.slice(0, 100) : '',
        fund: 'bridge-fund',
      },
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error('Stripe error:', err.message)
    res.status(500).json({ error: 'We could not start your payment. Please try again.' })
  }
})

app.listen(port, () => {
  console.log(`HopeBridge payment server listening on http://localhost:${port}`)
})
