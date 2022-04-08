import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import zoid from "zoid";
import CheckoutDialog from "../components/CheckoutDialog/CheckoutDialog";
import OfferingDialog from "../components/OfferingDialog/OfferingDialog";

zoid.create({
  tag: "checkout-widget",
  url: `${process.env.VERCEL_URL || "http://localhost:3000"}/widget/checkout`,
  dimensions: {
    width: "100%",
    height: "100%",
  },
  containerTemplate: ({ doc, uid, frame, prerenderFrame, dimensions }) => {
    const container = doc.createElement("div");
    container.id = uid;
    container.appendChild(frame);
    frame.style.width = dimensions.width;
    frame.style.height = dimensions.height;
    container.appendChild(prerenderFrame);
    container.style.cssText =
      "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 2147483647;";
    return container;
  },
  props: {
    onClose: {
      type: "function",
      required: true,
    },
    open: {
      type: "boolean",
      required: true,
    },
    businessId: {
      type: "number",
      required: true,
    },
    offeringId: {
      type: "string",
      required: false,
    },
    numGuests: {
      type: "number",
      required: false,
    },
    date: {
      type: "string",
      required: false,
    },
  },
});

const CheckoutWidget = () => {
  const [open, setOpen] = useState<boolean>(window.xprops?.open);
  const [offeringState, setOfferingState] = useState<{
    offeringId: string;
    numGuests: number;
    date: string;
  } | null>(null);

  useEffect(() => {
    if (window.xprops) {
      window.xprops.onProps((props) => {
        setOpen(props.open);
        if (props.offeringId) {
          setOfferingState({
            offeringId: props.offeringId,
            numGuests: props.numGuests,
            date: props.date,
          });
        }
      });
      localStorage.setItem("businessId", window.xprops.businessId);
    }
  }, []);

  if (offeringState)
    return (
      <OfferingDialog
        open={open}
        offeringId={offeringState.offeringId}
        onClose={() => {
          setOfferingState(null);
          window.xprops.onClose();
        }}
        initialNumGuests={offeringState.numGuests}
        initialDate={DateTime.fromISO(offeringState.date)}
        onCheckout={() => setOfferingState(null)}
      />
    );

  return (
    <CheckoutDialog
      open={open}
      onClose={
        () => window.xprops.onClose()
        //   refetchCart();
        //   refetch();
        //   setCheckoutDialogOpen(false);
      }
    />
  );
};

export default CheckoutWidget;
