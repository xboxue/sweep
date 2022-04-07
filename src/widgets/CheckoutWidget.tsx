import { useEffect, useState } from "react";
import zoid from "zoid";
import CheckoutDialog from "../components/CheckoutDialog/CheckoutDialog";

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
  },
});

const CheckoutWidget = () => {
  const [open, setOpen] = useState(window.xprops.open);

  useEffect(() => {
    window.xprops.onProps((props) => setOpen(props.open));

    if (window.xprops)
      localStorage.setItem("businessId", window.xprops.businessId);
  }, []);

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
