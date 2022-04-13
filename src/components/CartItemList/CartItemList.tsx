import { sortBy } from "lodash";
import {
  useRemoveCartBookingsMutation,
  useUpdateCartBookingsMutation,
} from "../../generated/graphql";
import { CartBooking } from "../../generated/public/graphql";
import CartItem from "../CartItem/CartItem";

interface Props {
  cartBookings: CartBooking[];
  onUpdate: () => void;
  editable?: boolean;
}

const CartItemList = ({ cartBookings, onUpdate, editable }: Props) => {
  const [removeCartBookings] = useRemoveCartBookingsMutation();
  const [updateCartBookings] = useUpdateCartBookingsMutation();

  const handleRemove = async (id: string) => {
    try {
      await removeCartBookings({
        variables: { input: { cartBookingIds: [id] } },
      });
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (numGuests: number, id: string) => {
    try {
      await updateCartBookings({
        variables: { input: { cartBookings: [{ id, numGuests }] } },
      });
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {sortBy(cartBookings, "id").map((cartBooking) => (
        <CartItem
          key={cartBooking.id}
          cartBooking={cartBooking}
          onRemove={() => handleRemove(cartBooking.id)}
          onUpdate={(numGuests) => handleUpdate(numGuests, cartBooking.id)}
          editable={editable}
        />
      ))}
    </>
  );
};

export default CartItemList;
