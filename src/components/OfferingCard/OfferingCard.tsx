import { Box, Typography, useMediaQuery } from "@mui/material";
import { Offering, PricingType } from "../../generated/public/graphql";

interface Props {
  offering: Offering;
  timeSlotsComponent: React.ReactNode;
}

const OfferingCard = ({ offering, timeSlotsComponent }: Props) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  return (
    <Box>
      <Box
        component="img"
        src={offering.featuredImage?.url}
        alt={offering.featuredImage?.altText}
        sx={{
          borderRadius: 1,
          width: 1,
          height: [144, 200],
          objectFit: "cover",
        }}
      />
      <Typography
        variant={isMobile ? "subtitle1" : "h6"}
        sx={(theme) => ({
          [theme.breakpoints.up("sm")]: {
            fontSize: "1.1rem !important",
          },
          mt: [0, 0.5],
        })}
      >
        {offering.name}
      </Typography>
      <Typography variant={isMobile ? "body2" : "body1"}>
        {offering.pricingType === PricingType.PerPerson ? (
          <>
            <Box component="span" sx={{ fontWeight: 500 }}>
              ${offering.pricePerPerson / 100}
            </Box>{" "}
            per person
          </>
        ) : (
          `$${offering.priceTotalAmount}`
        )}{" "}
        •{" "}
        <Box component="span" sx={{ fontWeight: 500 }}>
          {offering.minGuests} to {offering.maxGuests}
        </Box>{" "}
        players •{" "}
        <Box component="span" sx={{ fontWeight: 500 }}>
          {offering.difficulty}/10
        </Box>{" "}
        difficulty
      </Typography>

      <Box sx={{ mt: 1 }}>{timeSlotsComponent}</Box>
    </Box>
  );
};

export default OfferingCard;
