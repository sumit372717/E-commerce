import { loadStripe } from '@stripe/stripe-js'

export const getStripe = () => {
  const publishableKey = process.env.NEXTPUBLICSTRIPEPUBLISHABLEKEY
  if (!publishableKey) {
    throw new Error('Stripe publishable key is not set')
  }
  return loadStripe(publishableKey)
}