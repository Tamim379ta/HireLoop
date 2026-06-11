import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID = {
  'seeker_pro': 'price_1TgrYUR9RufVtGYU8LzoeQ8Z',
  'seeker_premium': 'price_1Tgs6YR9RufVtGYUhO4r4qKa',
  'recruiter_growth': 'price_1Tgs7SR9RufVtGYUkWhffmEB',
  'recruiter_enterprise': 'price_1Tgs7zR9RufVtGYUFbl3nXEC',
}