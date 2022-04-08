import { Box, Typography } from "@mui/material";
import { Offering, PricingType } from "../../generated/public/graphql";

interface Props {
  offering: Offering;
  timeSlotsComponent: React.ReactNode;
}

const OfferingCard = ({ offering, timeSlotsComponent }: Props) => {
  return (
    <Box>
      <Box
        component="img"
        src={offering.featuredImage?.url}
        alt={offering.featuredImage?.altText}
        sx={{ borderRadius: 2, width: "100%" }}
      />
      <Typography variant="h6">{offering.name}</Typography>
      <Typography>
        {offering.pricingType === PricingType.PerPerson ? (
          <>
            <strong>${offering.pricePerPerson / 100}</strong> per person
          </>
        ) : (
          `$${offering.priceTotalAmount}`
        )}{" "}
        |{" "}
        <strong>
          {offering.minGuests} to {offering.maxGuests}
        </strong>{" "}
        players | <strong>7/10</strong> difficulty
      </Typography>
      {timeSlotsComponent}
    </Box>
  );
};

export default OfferingCard;
