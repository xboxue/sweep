import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AddCartBookingsInput = {
  cartBookings: Array<CartBookingInput>;
};

export type AddCartBookingsPayload = {
  __typename?: 'AddCartBookingsPayload';
  cart?: Maybe<Cart>;
};

export type Booking = {
  __typename?: 'Booking';
  customer: Customer;
  endDateTime: Scalars['DateTime'];
  id: Scalars['ID'];
  numGuests: Scalars['Int'];
  offering: Offering;
  paymentStatus: PaymentStatus;
  price: Price;
  startDateTime: Scalars['DateTime'];
};

export type Business = {
  __typename?: 'Business';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Cart = {
  __typename?: 'Cart';
  cartBookings?: Maybe<Array<CartBooking>>;
  id: Scalars['ID'];
};

export type CartBooking = {
  __typename?: 'CartBooking';
  id: Scalars['ID'];
  numGuests: Scalars['Int'];
  offering: Offering;
  timeSlot: TimeSlot;
};

export type CartBookingInput = {
  id?: InputMaybe<Scalars['ID']>;
  numGuests: Scalars['Int'];
  offeringId: Scalars['ID'];
  timeSlotId: Scalars['ID'];
};

export type CreateBookingInput = {
  numGuests: Scalars['Int'];
  offeringId: Scalars['ID'];
  startDateTime: Scalars['DateTime'];
};

export type CreateBookingPayload = {
  __typename?: 'CreateBookingPayload';
  booking?: Maybe<Booking>;
};

export type CreateBusinessInput = {
  name: Scalars['String'];
};

export type CreateBusinessPayload = {
  __typename?: 'CreateBusinessPayload';
  business?: Maybe<Business>;
};

export type CreateCartInput = {
  cartBookings?: InputMaybe<Array<CartBookingInput>>;
};

export type CreateCartPayload = {
  __typename?: 'CreateCartPayload';
  cart?: Maybe<Cart>;
};

export type CreateCustomerPayload = {
  __typename?: 'CreateCustomerPayload';
  customer?: Maybe<Customer>;
};

export type CreateDraftBookingPayload = {
  __typename?: 'CreateDraftBookingPayload';
  booking?: Maybe<DraftBooking>;
};

export type CreateDraftOrderPayload = {
  __typename?: 'CreateDraftOrderPayload';
  draftOrder?: Maybe<DraftOrder>;
};

export type CreateFileUploadUrlsInput = {
  fileName?: InputMaybe<Scalars['String']>;
  fileSize: Scalars['Int'];
  mimeType: Scalars['String'];
};

export type CreateFileUploadUrlsPayload = {
  __typename?: 'CreateFileUploadUrlsPayload';
  urls?: Maybe<Array<FileUploadUrl>>;
};

export type CreateOfferingPayload = {
  __typename?: 'CreateOfferingPayload';
  offering?: Maybe<Offering>;
};

export type CreateTimeSlotBlockInput = {
  timeSlotId: Scalars['ID'];
};

export type CreateTimeSlotBlockPayload = {
  __typename?: 'CreateTimeSlotBlockPayload';
  timeSlotBlock?: Maybe<TimeSlotBlock>;
};

export type CreateUserInput = {
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emailVerified: Scalars['Boolean'];
  isAnonymous: Scalars['Boolean'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  photoURL?: InputMaybe<Scalars['String']>;
  providerData: Array<UserProviderDataInput>;
  providerId: Scalars['String'];
  uid: Scalars['ID'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  user?: Maybe<User>;
};

export type Customer = {
  __typename?: 'Customer';
  business: Business;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type CustomerInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export enum DepositType {
  FixedAmount = 'FIXED_AMOUNT',
  Percent = 'PERCENT',
  PerPerson = 'PER_PERSON'
}

export type DraftBooking = {
  __typename?: 'DraftBooking';
  endDateTime: Scalars['DateTime'];
  id: Scalars['ID'];
  numGuests: Scalars['Int'];
  offering: Offering;
  startDateTime: Scalars['DateTime'];
};

export type DraftBookingInput = {
  endDateTime: Scalars['DateTime'];
  id?: InputMaybe<Scalars['ID']>;
  numGuests: Scalars['Int'];
  offeringId: Scalars['ID'];
  startDateTime: Scalars['DateTime'];
};

export type DraftOrder = {
  __typename?: 'DraftOrder';
  bookings: Array<DraftBooking>;
  createdAt: Scalars['DateTime'];
  customer?: Maybe<Customer>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type DraftOrderInput = {
  bookings: Array<DraftBookingInput>;
  customerId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
};

export enum DurationFormat {
  Hour = 'HOUR',
  Minute = 'MINUTE'
}

export type FileUploadUrl = {
  __typename?: 'FileUploadUrl';
  fields: Scalars['JSON'];
  resourceUrl: Scalars['String'];
  url: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  altText?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type ImageInput = {
  altText?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  url: Scalars['String'];
};

export enum MaxAdvanceFormat {
  Day = 'DAY',
  Hour = 'HOUR',
  Month = 'MONTH',
  Week = 'WEEK'
}

export enum MinAdvanceFormat {
  Day = 'DAY',
  Hour = 'HOUR',
  Minute = 'MINUTE'
}

export type Mutation = {
  __typename?: 'Mutation';
  addCartBookings: AddCartBookingsPayload;
  createBooking: CreateBookingPayload;
  createBusiness: CreateBusinessPayload;
  createCustomer: CreateCustomerPayload;
  createDraftBooking: CreateDraftBookingPayload;
  createDraftOrder: CreateDraftOrderPayload;
  createFileUploadUrls: CreateFileUploadUrlsPayload;
  createOffering: CreateOfferingPayload;
  createTimeSlotBlock: CreateTimeSlotBlockPayload;
  createUser: CreateUserPayload;
  removeCartBookings: RemoveCartBookingsPayload;
  removeTimeSlotBlock: RemoveTimeSlotBlockPayload;
  updateCartBookings: UpdateCartBookingsPayload;
  updateDraftOrder: UpdateDraftOrderPayload;
  updateOffering: UpdateOfferingPayload;
};


export type MutationAddCartBookingsArgs = {
  input: AddCartBookingsInput;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateBusinessArgs = {
  input: CreateBusinessInput;
};


export type MutationCreateCustomerArgs = {
  input: CustomerInput;
};


export type MutationCreateDraftBookingArgs = {
  input: DraftBookingInput;
};


export type MutationCreateDraftOrderArgs = {
  input: DraftOrderInput;
};


export type MutationCreateFileUploadUrlsArgs = {
  input: Array<CreateFileUploadUrlsInput>;
};


export type MutationCreateOfferingArgs = {
  input: OfferingInput;
};


export type MutationCreateTimeSlotBlockArgs = {
  input: CreateTimeSlotBlockInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationRemoveCartBookingsArgs = {
  input: RemoveCartBookingsInput;
};


export type MutationRemoveTimeSlotBlockArgs = {
  input: RemoveTimeSlotBlockInput;
};


export type MutationUpdateCartBookingsArgs = {
  input: UpdateCartBookingsInput;
};


export type MutationUpdateDraftOrderArgs = {
  input: DraftOrderInput;
};


export type MutationUpdateOfferingArgs = {
  input: OfferingInput;
};

export type Offering = {
  __typename?: 'Offering';
  availableTimeSlots: Array<TimeSlot>;
  business: Business;
  depositFixedAmount?: Maybe<Scalars['Int']>;
  depositPerPerson?: Maybe<Scalars['Int']>;
  depositPercent?: Maybe<Scalars['Int']>;
  depositType?: Maybe<DepositType>;
  description?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  featuredImage?: Maybe<Image>;
  id: Scalars['ID'];
  maxAdvance: Scalars['Int'];
  maxAdvanceFormat: MaxAdvanceFormat;
  maxGuests: Scalars['Int'];
  minAdvance: Scalars['Int'];
  minAdvanceFormat: MinAdvanceFormat;
  minGuests: Scalars['Int'];
  name: Scalars['String'];
  paymentType: PaymentType;
  pricePerPerson?: Maybe<Scalars['Int']>;
  priceTotalAmount?: Maybe<Scalars['Int']>;
  pricingType: PricingType;
  schedule: Schedule;
  status: OfferingStatus;
  timeSlots: Array<TimeSlot>;
};


export type OfferingAvailableTimeSlotsArgs = {
  date: Scalars['DateTime'];
  numGuests?: InputMaybe<Scalars['Int']>;
  time?: InputMaybe<Scalars['String']>;
};


export type OfferingTimeSlotsArgs = {
  date: Scalars['DateTime'];
};

export type OfferingInput = {
  depositFixedAmount?: InputMaybe<Scalars['Int']>;
  depositPerPerson?: InputMaybe<Scalars['Int']>;
  depositPercent?: InputMaybe<Scalars['Int']>;
  depositType?: InputMaybe<DepositType>;
  description?: InputMaybe<Scalars['String']>;
  duration: Scalars['Int'];
  featuredImage?: InputMaybe<ImageInput>;
  id?: InputMaybe<Scalars['ID']>;
  maxAdvance: Scalars['Int'];
  maxAdvanceFormat: MaxAdvanceFormat;
  maxGuests: Scalars['Int'];
  minAdvance: Scalars['Int'];
  minAdvanceFormat: MinAdvanceFormat;
  minGuests: Scalars['Int'];
  name: Scalars['String'];
  paymentType: PaymentType;
  pricePerPerson?: InputMaybe<Scalars['Int']>;
  priceTotalAmount?: InputMaybe<Scalars['Int']>;
  pricingType: PricingType;
  schedule: ScheduleInput;
  status: OfferingStatus;
};

export enum OfferingStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Draft = 'DRAFT'
}

export type Order = {
  __typename?: 'Order';
  bookings: Array<Booking>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export enum PaymentStatus {
  Failed = 'FAILED',
  Incomplete = 'INCOMPLETE',
  Processing = 'PROCESSING',
  Success = 'SUCCESS'
}

export enum PaymentType {
  Deposit = 'DEPOSIT',
  FullAmount = 'FULL_AMOUNT',
  None = 'NONE'
}

export type Price = {
  __typename?: 'Price';
  subtotal: Scalars['Int'];
  tax: Scalars['Int'];
  total: Scalars['Int'];
};

export enum PricingType {
  PerPerson = 'PER_PERSON',
  TotalAmount = 'TOTAL_AMOUNT'
}

export type Query = {
  __typename?: 'Query';
  booking: Booking;
  business: Business;
  customer: Customer;
  customers: Array<Customer>;
  draftOrder: DraftOrder;
  draftOrders: Array<DraftOrder>;
  myCart?: Maybe<Cart>;
  offering: Offering;
  offerings: Array<Offering>;
  order: Order;
};


export type QueryBookingArgs = {
  id: Scalars['ID'];
};


export type QueryBusinessArgs = {
  id: Scalars['ID'];
};


export type QueryCustomerArgs = {
  id: Scalars['ID'];
};


export type QueryCustomersArgs = {
  searchTerm?: InputMaybe<Scalars['String']>;
};


export type QueryDraftOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOfferingArgs = {
  id: Scalars['ID'];
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};

export type RemoveCartBookingsInput = {
  cartBookingIds: Array<Scalars['ID']>;
};

export type RemoveCartBookingsPayload = {
  __typename?: 'RemoveCartBookingsPayload';
  cart?: Maybe<Cart>;
};

export type RemoveTimeSlotBlockInput = {
  id: Scalars['ID'];
};

export type RemoveTimeSlotBlockPayload = {
  __typename?: 'RemoveTimeSlotBlockPayload';
  id: Scalars['ID'];
};

export type Schedule = {
  __typename?: 'Schedule';
  id: Scalars['ID'];
  name: Scalars['String'];
  timeSlots: Array<ScheduleTimeSlot>;
};

export type ScheduleInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  timeSlots: Array<ScheduleTimeSlotInput>;
};

export type ScheduleTimeSlot = {
  __typename?: 'ScheduleTimeSlot';
  day: Scalars['Int'];
  id: Scalars['ID'];
  startTime: Scalars['String'];
};

export type ScheduleTimeSlotInput = {
  day: Scalars['Int'];
  id?: InputMaybe<Scalars['ID']>;
  startTime: Scalars['String'];
};

export type TimeSlot = {
  __typename?: 'TimeSlot';
  block?: Maybe<TimeSlotBlock>;
  endDateTime: Scalars['DateTime'];
  id: Scalars['ID'];
  startDateTime: Scalars['DateTime'];
};

export type TimeSlotBlock = {
  __typename?: 'TimeSlotBlock';
  id: Scalars['ID'];
  timeSlot: TimeSlot;
};

export type UpdateCartBookingInput = {
  id?: InputMaybe<Scalars['ID']>;
  numGuests: Scalars['Int'];
};

export type UpdateCartBookingsInput = {
  cartBookings: Array<UpdateCartBookingInput>;
};

export type UpdateCartBookingsPayload = {
  __typename?: 'UpdateCartBookingsPayload';
  cart?: Maybe<Cart>;
};

export type UpdateDraftOrderPayload = {
  __typename?: 'UpdateDraftOrderPayload';
  draftOrder?: Maybe<DraftOrder>;
};

export type UpdateOfferingPayload = {
  __typename?: 'UpdateOfferingPayload';
  offering?: Maybe<Offering>;
};

export type User = {
  __typename?: 'User';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified: Scalars['Boolean'];
  isAnonymous: Scalars['Boolean'];
  phoneNumber?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  providerData: Array<UserProviderData>;
  providerId?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
};

export type UserProviderData = {
  __typename?: 'UserProviderData';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  providerId: Scalars['String'];
  uid: Scalars['String'];
};

export type UserProviderDataInput = {
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  photoURL?: InputMaybe<Scalars['String']>;
  providerId: Scalars['String'];
  uid: Scalars['ID'];
};

export type AddCartBookingsMutationVariables = Exact<{
  input: AddCartBookingsInput;
}>;


export type AddCartBookingsMutation = { __typename?: 'Mutation', addCartBookings: { __typename?: 'AddCartBookingsPayload', cart?: { __typename?: 'Cart', id: string } | null } };

export type CreateBusinessMutationVariables = Exact<{
  input: CreateBusinessInput;
}>;


export type CreateBusinessMutation = { __typename?: 'Mutation', createBusiness: { __typename?: 'CreateBusinessPayload', business?: { __typename?: 'Business', id: string, name: string } | null } };

export type CreateCustomerMutationVariables = Exact<{
  input: CustomerInput;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', createCustomer: { __typename?: 'CreateCustomerPayload', customer?: { __typename?: 'Customer', id: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, email: string, phoneNumber?: string | null } | null } };

export type CreateDraftOrderMutationVariables = Exact<{
  input: DraftOrderInput;
}>;


export type CreateDraftOrderMutation = { __typename?: 'Mutation', createDraftOrder: { __typename?: 'CreateDraftOrderPayload', draftOrder?: { __typename?: 'DraftOrder', id: string, createdAt: any, updatedAt: any, bookings: Array<{ __typename?: 'DraftBooking', id: string, startDateTime: any, numGuests: number, offering: { __typename?: 'Offering', id: string } }> } | null } };

export type CreateFileUploadUrlsMutationVariables = Exact<{
  input: Array<CreateFileUploadUrlsInput> | CreateFileUploadUrlsInput;
}>;


export type CreateFileUploadUrlsMutation = { __typename?: 'Mutation', createFileUploadUrls: { __typename?: 'CreateFileUploadUrlsPayload', urls?: Array<{ __typename?: 'FileUploadUrl', url: string, fields: any, resourceUrl: string }> | null } };

export type CreateOfferingMutationVariables = Exact<{
  input: OfferingInput;
}>;


export type CreateOfferingMutation = { __typename?: 'Mutation', createOffering: { __typename?: 'CreateOfferingPayload', offering?: { __typename?: 'Offering', id: string } | null } };

export type CreateTimeSlotBlockMutationVariables = Exact<{
  input: CreateTimeSlotBlockInput;
}>;


export type CreateTimeSlotBlockMutation = { __typename?: 'Mutation', createTimeSlotBlock: { __typename?: 'CreateTimeSlotBlockPayload', timeSlotBlock?: { __typename?: 'TimeSlotBlock', id: string } | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserPayload', user?: { __typename?: 'User', uid: string } | null } };

export type RemoveCartBookingsMutationVariables = Exact<{
  input: RemoveCartBookingsInput;
}>;


export type RemoveCartBookingsMutation = { __typename?: 'Mutation', removeCartBookings: { __typename?: 'RemoveCartBookingsPayload', cart?: { __typename?: 'Cart', id: string } | null } };

export type RemoveTimeSlotBlockMutationVariables = Exact<{
  input: RemoveTimeSlotBlockInput;
}>;


export type RemoveTimeSlotBlockMutation = { __typename?: 'Mutation', removeTimeSlotBlock: { __typename?: 'RemoveTimeSlotBlockPayload', id: string } };

export type UpdateCartBookingsMutationVariables = Exact<{
  input: UpdateCartBookingsInput;
}>;


export type UpdateCartBookingsMutation = { __typename?: 'Mutation', updateCartBookings: { __typename?: 'UpdateCartBookingsPayload', cart?: { __typename?: 'Cart', id: string } | null } };

export type UpdateDraftOrderMutationVariables = Exact<{
  input: DraftOrderInput;
}>;


export type UpdateDraftOrderMutation = { __typename?: 'Mutation', updateDraftOrder: { __typename?: 'UpdateDraftOrderPayload', draftOrder?: { __typename?: 'DraftOrder', id: string, createdAt: any, updatedAt: any, bookings: Array<{ __typename?: 'DraftBooking', id: string, startDateTime: any, numGuests: number, offering: { __typename?: 'Offering', id: string } }> } | null } };

export type UpdateOfferingMutationVariables = Exact<{
  input: OfferingInput;
}>;


export type UpdateOfferingMutation = { __typename?: 'Mutation', updateOffering: { __typename?: 'UpdateOfferingPayload', offering?: { __typename?: 'Offering', id: string } | null } };

export type GetCustomersQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']>;
}>;


export type GetCustomersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'Customer', id: string, createdAt: any, updatedAt: any, firstName?: string | null, phoneNumber?: string | null, lastName?: string | null, email: string }> };

export type GetDraftOrderQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetDraftOrderQuery = { __typename?: 'Query', draftOrder: { __typename?: 'DraftOrder', id: string, createdAt: any, updatedAt: any, bookings: Array<{ __typename?: 'DraftBooking', id: string, startDateTime: any, endDateTime: any, numGuests: number, offering: { __typename?: 'Offering', id: string, name: string } }>, customer?: { __typename?: 'Customer', id: string, firstName?: string | null, lastName?: string | null, email: string, phoneNumber?: string | null } | null } };

export type GetDraftOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDraftOrdersQuery = { __typename?: 'Query', draftOrders: Array<{ __typename?: 'DraftOrder', id: string, createdAt: any }> };

export type GetMyCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyCartQuery = { __typename?: 'Query', myCart?: { __typename?: 'Cart', id: string, cartBookings?: Array<{ __typename?: 'CartBooking', id: string, numGuests: number, timeSlot: { __typename?: 'TimeSlot', id: string, startDateTime: any, endDateTime: any }, offering: { __typename?: 'Offering', id: string, name: string, featuredImage?: { __typename?: 'Image', url: string, altText?: string | null } | null } }> | null } | null };

export type GetOfferingQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOfferingQuery = { __typename?: 'Query', offering: { __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat, featuredImage?: { __typename?: 'Image', id: string, url: string, altText?: string | null } | null, schedule: { __typename?: 'Schedule', id: string, name: string, timeSlots: Array<{ __typename?: 'ScheduleTimeSlot', id: string, startTime: string, day: number }> } } };

export type GetOfferingSchedulesQueryVariables = Exact<{
  date: Scalars['DateTime'];
}>;


export type GetOfferingSchedulesQuery = { __typename?: 'Query', offerings: Array<{ __typename?: 'Offering', id: string, name: string, timeSlots: Array<{ __typename?: 'TimeSlot', id: string, startDateTime: any, endDateTime: any, block?: { __typename?: 'TimeSlotBlock', id: string } | null }> }> };

export type GetOfferingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOfferingsQuery = { __typename?: 'Query', offerings: Array<{ __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat, featuredImage?: { __typename?: 'Image', id: string, url: string, altText?: string | null } | null }> };


export const AddCartBookingsDocument = gql`
    mutation addCartBookings($input: AddCartBookingsInput!) {
  addCartBookings(input: $input) {
    cart {
      id
    }
  }
}
    `;
export type AddCartBookingsMutationFn = Apollo.MutationFunction<AddCartBookingsMutation, AddCartBookingsMutationVariables>;

/**
 * __useAddCartBookingsMutation__
 *
 * To run a mutation, you first call `useAddCartBookingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCartBookingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCartBookingsMutation, { data, loading, error }] = useAddCartBookingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCartBookingsMutation(baseOptions?: Apollo.MutationHookOptions<AddCartBookingsMutation, AddCartBookingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCartBookingsMutation, AddCartBookingsMutationVariables>(AddCartBookingsDocument, options);
      }
export type AddCartBookingsMutationHookResult = ReturnType<typeof useAddCartBookingsMutation>;
export type AddCartBookingsMutationResult = Apollo.MutationResult<AddCartBookingsMutation>;
export type AddCartBookingsMutationOptions = Apollo.BaseMutationOptions<AddCartBookingsMutation, AddCartBookingsMutationVariables>;
export const CreateBusinessDocument = gql`
    mutation createBusiness($input: CreateBusinessInput!) {
  createBusiness(input: $input) {
    business {
      id
      name
    }
  }
}
    `;
export type CreateBusinessMutationFn = Apollo.MutationFunction<CreateBusinessMutation, CreateBusinessMutationVariables>;

/**
 * __useCreateBusinessMutation__
 *
 * To run a mutation, you first call `useCreateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBusinessMutation, { data, loading, error }] = useCreateBusinessMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBusinessMutation(baseOptions?: Apollo.MutationHookOptions<CreateBusinessMutation, CreateBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBusinessMutation, CreateBusinessMutationVariables>(CreateBusinessDocument, options);
      }
export type CreateBusinessMutationHookResult = ReturnType<typeof useCreateBusinessMutation>;
export type CreateBusinessMutationResult = Apollo.MutationResult<CreateBusinessMutation>;
export type CreateBusinessMutationOptions = Apollo.BaseMutationOptions<CreateBusinessMutation, CreateBusinessMutationVariables>;
export const CreateCustomerDocument = gql`
    mutation createCustomer($input: CustomerInput!) {
  createCustomer(input: $input) {
    customer {
      id
      createdAt
      updatedAt
      firstName
      lastName
      email
      phoneNumber
    }
  }
}
    `;
export type CreateCustomerMutationFn = Apollo.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const CreateDraftOrderDocument = gql`
    mutation createDraftOrder($input: DraftOrderInput!) {
  createDraftOrder(input: $input) {
    draftOrder {
      id
      createdAt
      updatedAt
      bookings {
        id
        startDateTime
        numGuests
        offering {
          id
        }
      }
    }
  }
}
    `;
export type CreateDraftOrderMutationFn = Apollo.MutationFunction<CreateDraftOrderMutation, CreateDraftOrderMutationVariables>;

/**
 * __useCreateDraftOrderMutation__
 *
 * To run a mutation, you first call `useCreateDraftOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDraftOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDraftOrderMutation, { data, loading, error }] = useCreateDraftOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDraftOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateDraftOrderMutation, CreateDraftOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDraftOrderMutation, CreateDraftOrderMutationVariables>(CreateDraftOrderDocument, options);
      }
export type CreateDraftOrderMutationHookResult = ReturnType<typeof useCreateDraftOrderMutation>;
export type CreateDraftOrderMutationResult = Apollo.MutationResult<CreateDraftOrderMutation>;
export type CreateDraftOrderMutationOptions = Apollo.BaseMutationOptions<CreateDraftOrderMutation, CreateDraftOrderMutationVariables>;
export const CreateFileUploadUrlsDocument = gql`
    mutation createFileUploadUrls($input: [CreateFileUploadUrlsInput!]!) {
  createFileUploadUrls(input: $input) {
    urls {
      url
      fields
      resourceUrl
    }
  }
}
    `;
export type CreateFileUploadUrlsMutationFn = Apollo.MutationFunction<CreateFileUploadUrlsMutation, CreateFileUploadUrlsMutationVariables>;

/**
 * __useCreateFileUploadUrlsMutation__
 *
 * To run a mutation, you first call `useCreateFileUploadUrlsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileUploadUrlsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileUploadUrlsMutation, { data, loading, error }] = useCreateFileUploadUrlsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFileUploadUrlsMutation(baseOptions?: Apollo.MutationHookOptions<CreateFileUploadUrlsMutation, CreateFileUploadUrlsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFileUploadUrlsMutation, CreateFileUploadUrlsMutationVariables>(CreateFileUploadUrlsDocument, options);
      }
export type CreateFileUploadUrlsMutationHookResult = ReturnType<typeof useCreateFileUploadUrlsMutation>;
export type CreateFileUploadUrlsMutationResult = Apollo.MutationResult<CreateFileUploadUrlsMutation>;
export type CreateFileUploadUrlsMutationOptions = Apollo.BaseMutationOptions<CreateFileUploadUrlsMutation, CreateFileUploadUrlsMutationVariables>;
export const CreateOfferingDocument = gql`
    mutation createOffering($input: OfferingInput!) {
  createOffering(input: $input) {
    offering {
      id
    }
  }
}
    `;
export type CreateOfferingMutationFn = Apollo.MutationFunction<CreateOfferingMutation, CreateOfferingMutationVariables>;

/**
 * __useCreateOfferingMutation__
 *
 * To run a mutation, you first call `useCreateOfferingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOfferingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOfferingMutation, { data, loading, error }] = useCreateOfferingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOfferingMutation(baseOptions?: Apollo.MutationHookOptions<CreateOfferingMutation, CreateOfferingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOfferingMutation, CreateOfferingMutationVariables>(CreateOfferingDocument, options);
      }
export type CreateOfferingMutationHookResult = ReturnType<typeof useCreateOfferingMutation>;
export type CreateOfferingMutationResult = Apollo.MutationResult<CreateOfferingMutation>;
export type CreateOfferingMutationOptions = Apollo.BaseMutationOptions<CreateOfferingMutation, CreateOfferingMutationVariables>;
export const CreateTimeSlotBlockDocument = gql`
    mutation createTimeSlotBlock($input: CreateTimeSlotBlockInput!) {
  createTimeSlotBlock(input: $input) {
    timeSlotBlock {
      id
    }
  }
}
    `;
export type CreateTimeSlotBlockMutationFn = Apollo.MutationFunction<CreateTimeSlotBlockMutation, CreateTimeSlotBlockMutationVariables>;

/**
 * __useCreateTimeSlotBlockMutation__
 *
 * To run a mutation, you first call `useCreateTimeSlotBlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimeSlotBlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimeSlotBlockMutation, { data, loading, error }] = useCreateTimeSlotBlockMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTimeSlotBlockMutation(baseOptions?: Apollo.MutationHookOptions<CreateTimeSlotBlockMutation, CreateTimeSlotBlockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTimeSlotBlockMutation, CreateTimeSlotBlockMutationVariables>(CreateTimeSlotBlockDocument, options);
      }
export type CreateTimeSlotBlockMutationHookResult = ReturnType<typeof useCreateTimeSlotBlockMutation>;
export type CreateTimeSlotBlockMutationResult = Apollo.MutationResult<CreateTimeSlotBlockMutation>;
export type CreateTimeSlotBlockMutationOptions = Apollo.BaseMutationOptions<CreateTimeSlotBlockMutation, CreateTimeSlotBlockMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      uid
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveCartBookingsDocument = gql`
    mutation removeCartBookings($input: RemoveCartBookingsInput!) {
  removeCartBookings(input: $input) {
    cart {
      id
    }
  }
}
    `;
export type RemoveCartBookingsMutationFn = Apollo.MutationFunction<RemoveCartBookingsMutation, RemoveCartBookingsMutationVariables>;

/**
 * __useRemoveCartBookingsMutation__
 *
 * To run a mutation, you first call `useRemoveCartBookingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCartBookingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCartBookingsMutation, { data, loading, error }] = useRemoveCartBookingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveCartBookingsMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCartBookingsMutation, RemoveCartBookingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCartBookingsMutation, RemoveCartBookingsMutationVariables>(RemoveCartBookingsDocument, options);
      }
export type RemoveCartBookingsMutationHookResult = ReturnType<typeof useRemoveCartBookingsMutation>;
export type RemoveCartBookingsMutationResult = Apollo.MutationResult<RemoveCartBookingsMutation>;
export type RemoveCartBookingsMutationOptions = Apollo.BaseMutationOptions<RemoveCartBookingsMutation, RemoveCartBookingsMutationVariables>;
export const RemoveTimeSlotBlockDocument = gql`
    mutation removeTimeSlotBlock($input: RemoveTimeSlotBlockInput!) {
  removeTimeSlotBlock(input: $input) {
    id
  }
}
    `;
export type RemoveTimeSlotBlockMutationFn = Apollo.MutationFunction<RemoveTimeSlotBlockMutation, RemoveTimeSlotBlockMutationVariables>;

/**
 * __useRemoveTimeSlotBlockMutation__
 *
 * To run a mutation, you first call `useRemoveTimeSlotBlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTimeSlotBlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTimeSlotBlockMutation, { data, loading, error }] = useRemoveTimeSlotBlockMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveTimeSlotBlockMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTimeSlotBlockMutation, RemoveTimeSlotBlockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTimeSlotBlockMutation, RemoveTimeSlotBlockMutationVariables>(RemoveTimeSlotBlockDocument, options);
      }
export type RemoveTimeSlotBlockMutationHookResult = ReturnType<typeof useRemoveTimeSlotBlockMutation>;
export type RemoveTimeSlotBlockMutationResult = Apollo.MutationResult<RemoveTimeSlotBlockMutation>;
export type RemoveTimeSlotBlockMutationOptions = Apollo.BaseMutationOptions<RemoveTimeSlotBlockMutation, RemoveTimeSlotBlockMutationVariables>;
export const UpdateCartBookingsDocument = gql`
    mutation updateCartBookings($input: UpdateCartBookingsInput!) {
  updateCartBookings(input: $input) {
    cart {
      id
    }
  }
}
    `;
export type UpdateCartBookingsMutationFn = Apollo.MutationFunction<UpdateCartBookingsMutation, UpdateCartBookingsMutationVariables>;

/**
 * __useUpdateCartBookingsMutation__
 *
 * To run a mutation, you first call `useUpdateCartBookingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartBookingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartBookingsMutation, { data, loading, error }] = useUpdateCartBookingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCartBookingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartBookingsMutation, UpdateCartBookingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartBookingsMutation, UpdateCartBookingsMutationVariables>(UpdateCartBookingsDocument, options);
      }
export type UpdateCartBookingsMutationHookResult = ReturnType<typeof useUpdateCartBookingsMutation>;
export type UpdateCartBookingsMutationResult = Apollo.MutationResult<UpdateCartBookingsMutation>;
export type UpdateCartBookingsMutationOptions = Apollo.BaseMutationOptions<UpdateCartBookingsMutation, UpdateCartBookingsMutationVariables>;
export const UpdateDraftOrderDocument = gql`
    mutation updateDraftOrder($input: DraftOrderInput!) {
  updateDraftOrder(input: $input) {
    draftOrder {
      id
      createdAt
      updatedAt
      bookings {
        id
        startDateTime
        numGuests
        offering {
          id
        }
      }
    }
  }
}
    `;
export type UpdateDraftOrderMutationFn = Apollo.MutationFunction<UpdateDraftOrderMutation, UpdateDraftOrderMutationVariables>;

/**
 * __useUpdateDraftOrderMutation__
 *
 * To run a mutation, you first call `useUpdateDraftOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDraftOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDraftOrderMutation, { data, loading, error }] = useUpdateDraftOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDraftOrderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDraftOrderMutation, UpdateDraftOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDraftOrderMutation, UpdateDraftOrderMutationVariables>(UpdateDraftOrderDocument, options);
      }
export type UpdateDraftOrderMutationHookResult = ReturnType<typeof useUpdateDraftOrderMutation>;
export type UpdateDraftOrderMutationResult = Apollo.MutationResult<UpdateDraftOrderMutation>;
export type UpdateDraftOrderMutationOptions = Apollo.BaseMutationOptions<UpdateDraftOrderMutation, UpdateDraftOrderMutationVariables>;
export const UpdateOfferingDocument = gql`
    mutation updateOffering($input: OfferingInput!) {
  updateOffering(input: $input) {
    offering {
      id
    }
  }
}
    `;
export type UpdateOfferingMutationFn = Apollo.MutationFunction<UpdateOfferingMutation, UpdateOfferingMutationVariables>;

/**
 * __useUpdateOfferingMutation__
 *
 * To run a mutation, you first call `useUpdateOfferingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOfferingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOfferingMutation, { data, loading, error }] = useUpdateOfferingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOfferingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOfferingMutation, UpdateOfferingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOfferingMutation, UpdateOfferingMutationVariables>(UpdateOfferingDocument, options);
      }
export type UpdateOfferingMutationHookResult = ReturnType<typeof useUpdateOfferingMutation>;
export type UpdateOfferingMutationResult = Apollo.MutationResult<UpdateOfferingMutation>;
export type UpdateOfferingMutationOptions = Apollo.BaseMutationOptions<UpdateOfferingMutation, UpdateOfferingMutationVariables>;
export const GetCustomersDocument = gql`
    query getCustomers($searchTerm: String) {
  customers(searchTerm: $searchTerm) {
    id
    createdAt
    updatedAt
    firstName
    phoneNumber
    lastName
    email
  }
}
    `;

/**
 * __useGetCustomersQuery__
 *
 * To run a query within a React component, call `useGetCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useGetCustomersQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
      }
export function useGetCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export type GetCustomersQueryHookResult = ReturnType<typeof useGetCustomersQuery>;
export type GetCustomersLazyQueryHookResult = ReturnType<typeof useGetCustomersLazyQuery>;
export type GetCustomersQueryResult = Apollo.QueryResult<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetDraftOrderDocument = gql`
    query getDraftOrder($id: ID!) {
  draftOrder(id: $id) {
    id
    createdAt
    updatedAt
    bookings {
      id
      startDateTime
      endDateTime
      numGuests
      offering {
        id
        name
      }
    }
    customer {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
}
    `;

/**
 * __useGetDraftOrderQuery__
 *
 * To run a query within a React component, call `useGetDraftOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDraftOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDraftOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDraftOrderQuery(baseOptions: Apollo.QueryHookOptions<GetDraftOrderQuery, GetDraftOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDraftOrderQuery, GetDraftOrderQueryVariables>(GetDraftOrderDocument, options);
      }
export function useGetDraftOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDraftOrderQuery, GetDraftOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDraftOrderQuery, GetDraftOrderQueryVariables>(GetDraftOrderDocument, options);
        }
export type GetDraftOrderQueryHookResult = ReturnType<typeof useGetDraftOrderQuery>;
export type GetDraftOrderLazyQueryHookResult = ReturnType<typeof useGetDraftOrderLazyQuery>;
export type GetDraftOrderQueryResult = Apollo.QueryResult<GetDraftOrderQuery, GetDraftOrderQueryVariables>;
export const GetDraftOrdersDocument = gql`
    query getDraftOrders {
  draftOrders {
    id
    createdAt
  }
}
    `;

/**
 * __useGetDraftOrdersQuery__
 *
 * To run a query within a React component, call `useGetDraftOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDraftOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDraftOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDraftOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetDraftOrdersQuery, GetDraftOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDraftOrdersQuery, GetDraftOrdersQueryVariables>(GetDraftOrdersDocument, options);
      }
export function useGetDraftOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDraftOrdersQuery, GetDraftOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDraftOrdersQuery, GetDraftOrdersQueryVariables>(GetDraftOrdersDocument, options);
        }
export type GetDraftOrdersQueryHookResult = ReturnType<typeof useGetDraftOrdersQuery>;
export type GetDraftOrdersLazyQueryHookResult = ReturnType<typeof useGetDraftOrdersLazyQuery>;
export type GetDraftOrdersQueryResult = Apollo.QueryResult<GetDraftOrdersQuery, GetDraftOrdersQueryVariables>;
export const GetMyCartDocument = gql`
    query getMyCart {
  myCart {
    id
    cartBookings {
      id
      timeSlot {
        id
        startDateTime
        endDateTime
      }
      offering {
        id
        name
        featuredImage {
          url
          altText
        }
      }
      numGuests
    }
  }
}
    `;

/**
 * __useGetMyCartQuery__
 *
 * To run a query within a React component, call `useGetMyCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyCartQuery(baseOptions?: Apollo.QueryHookOptions<GetMyCartQuery, GetMyCartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyCartQuery, GetMyCartQueryVariables>(GetMyCartDocument, options);
      }
export function useGetMyCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyCartQuery, GetMyCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyCartQuery, GetMyCartQueryVariables>(GetMyCartDocument, options);
        }
export type GetMyCartQueryHookResult = ReturnType<typeof useGetMyCartQuery>;
export type GetMyCartLazyQueryHookResult = ReturnType<typeof useGetMyCartLazyQuery>;
export type GetMyCartQueryResult = Apollo.QueryResult<GetMyCartQuery, GetMyCartQueryVariables>;
export const GetOfferingDocument = gql`
    query getOffering($id: ID!) {
  offering(id: $id) {
    id
    name
    status
    minGuests
    maxGuests
    description
    pricingType
    pricePerPerson
    priceTotalAmount
    paymentType
    depositType
    depositPerPerson
    depositFixedAmount
    depositPercent
    duration
    maxAdvance
    maxAdvanceFormat
    minAdvance
    minAdvanceFormat
    featuredImage {
      id
      url
      altText
    }
    schedule {
      id
      name
      timeSlots {
        id
        startTime
        day
      }
    }
  }
}
    `;

/**
 * __useGetOfferingQuery__
 *
 * To run a query within a React component, call `useGetOfferingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOfferingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOfferingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOfferingQuery(baseOptions: Apollo.QueryHookOptions<GetOfferingQuery, GetOfferingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOfferingQuery, GetOfferingQueryVariables>(GetOfferingDocument, options);
      }
export function useGetOfferingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOfferingQuery, GetOfferingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOfferingQuery, GetOfferingQueryVariables>(GetOfferingDocument, options);
        }
export type GetOfferingQueryHookResult = ReturnType<typeof useGetOfferingQuery>;
export type GetOfferingLazyQueryHookResult = ReturnType<typeof useGetOfferingLazyQuery>;
export type GetOfferingQueryResult = Apollo.QueryResult<GetOfferingQuery, GetOfferingQueryVariables>;
export const GetOfferingSchedulesDocument = gql`
    query getOfferingSchedules($date: DateTime!) {
  offerings {
    id
    name
    timeSlots(date: $date) {
      id
      startDateTime
      endDateTime
      block {
        id
      }
    }
  }
}
    `;

/**
 * __useGetOfferingSchedulesQuery__
 *
 * To run a query within a React component, call `useGetOfferingSchedulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOfferingSchedulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOfferingSchedulesQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetOfferingSchedulesQuery(baseOptions: Apollo.QueryHookOptions<GetOfferingSchedulesQuery, GetOfferingSchedulesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOfferingSchedulesQuery, GetOfferingSchedulesQueryVariables>(GetOfferingSchedulesDocument, options);
      }
export function useGetOfferingSchedulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOfferingSchedulesQuery, GetOfferingSchedulesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOfferingSchedulesQuery, GetOfferingSchedulesQueryVariables>(GetOfferingSchedulesDocument, options);
        }
export type GetOfferingSchedulesQueryHookResult = ReturnType<typeof useGetOfferingSchedulesQuery>;
export type GetOfferingSchedulesLazyQueryHookResult = ReturnType<typeof useGetOfferingSchedulesLazyQuery>;
export type GetOfferingSchedulesQueryResult = Apollo.QueryResult<GetOfferingSchedulesQuery, GetOfferingSchedulesQueryVariables>;
export const GetOfferingsDocument = gql`
    query getOfferings {
  offerings {
    id
    name
    status
    minGuests
    maxGuests
    description
    pricingType
    pricePerPerson
    priceTotalAmount
    paymentType
    depositType
    depositPerPerson
    depositFixedAmount
    depositPercent
    duration
    maxAdvance
    maxAdvanceFormat
    minAdvance
    minAdvanceFormat
    featuredImage {
      id
      url
      altText
    }
  }
}
    `;

/**
 * __useGetOfferingsQuery__
 *
 * To run a query within a React component, call `useGetOfferingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOfferingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOfferingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOfferingsQuery(baseOptions?: Apollo.QueryHookOptions<GetOfferingsQuery, GetOfferingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOfferingsQuery, GetOfferingsQueryVariables>(GetOfferingsDocument, options);
      }
export function useGetOfferingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOfferingsQuery, GetOfferingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOfferingsQuery, GetOfferingsQueryVariables>(GetOfferingsDocument, options);
        }
export type GetOfferingsQueryHookResult = ReturnType<typeof useGetOfferingsQuery>;
export type GetOfferingsLazyQueryHookResult = ReturnType<typeof useGetOfferingsLazyQuery>;
export type GetOfferingsQueryResult = Apollo.QueryResult<GetOfferingsQuery, GetOfferingsQueryVariables>;