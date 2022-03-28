import {
  AccessTime,
  CalendarTodayOutlined,
  CreditCard,
  PeopleOutline,
} from "@mui/icons-material";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { Offering, Price } from "src/generated/public/graphql";

const PriceListItem = ({ label, value, TypographyProps }: Props) => (
  <Box display="flex" justifyContent="space-between">
    <Typography {...TypographyProps}>{label}</Typography>
    <Typography {...TypographyProps}>${(value / 100).toFixed(2)}</Typography>
  </Box>
);

const IconListItem = ({ Icon, content }: Props) => (
  <Box display="flex" alignItems="center">
    <Icon sx={{ color: "text.secondary" }} />
    <Typography ml={1}>{content}</Typography>
  </Box>
);

interface Props {
  offering: Offering;
  startDateTime: Date;
  numGuests: string;
  price: Price;
}

const BookingSummaryCard = ({
  price,
  offering,
  startDateTime,
  numGuests,
}: Props) => {
  return (
    <>
      <Box display="flex" sx={{ mb: 1 }}>
        <Box
          width={64}
          height={64}
          position="relative"
          borderRadius={2}
          mr={2}
          component="img"
          src={offering.featuredImage.url}
        />
        <Box>
          <Typography variant="subtitle1">{offering.name}</Typography>
        </Box>
      </Box>
      <Divider />
      <Stack spacing="4px" sx={{ mt: 1 }}>
        <IconListItem
          Icon={CalendarTodayOutlined}
          content={DateTime.fromISO(startDateTime).toFormat("MMMM d, y")}
        />
        <IconListItem
          Icon={AccessTime}
          content={DateTime.fromISO(startDateTime).toFormat("h:mm a")}
        />
        <IconListItem Icon={PeopleOutline} content={`${numGuests} guests`} />
        <IconListItem
          Icon={CreditCard}
          content={`$${offering.pricePerPerson / 100} per person`}
        />

        <Typography variant="subtitle1" mt={1}>
          Pricing details
        </Typography>

        <PriceListItem
          label={`${numGuests} × ${offering.name}`}
          value={price.subtotal}
        />
        <PriceListItem label="Taxes" value={price.tax} />
        <PriceListItem
          label="Total"
          value={price.total}
          TypographyProps={{ fontWeight: 500 }}
        />
      </Stack>
    </>
  );
};

export default BookingSummaryCard;
