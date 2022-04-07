import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY as string, {
      stripeAccount: process.env.REACT_APP_STRIPE_ACCOUNT_ID,
    });
  }
  return stripePromise;
};

export default getStripe;
