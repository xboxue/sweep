import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const useStripePayment = (
  onSuccess: () => void
): [() => Promise<void>, { loading: boolean; error: string | null }] => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const confirmPayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);
    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: "" },
        redirect: "if_required",
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess();
      }
    } catch (err) {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  return [confirmPayment, { loading, error }];
};

export default useStripePayment;
