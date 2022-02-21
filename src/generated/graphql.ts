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
};

export type Booking = {
  __typename?: 'Booking';
  endDateTime: Scalars['DateTime'];
  id: Scalars['ID'];
  numGuests: Scalars['Int'];
  offering: Offering;
  paymentStatus: PaymentStatus;
  price: Price;
  startDateTime: Scalars['DateTime'];
  stripePaymentIntent?: Maybe<StripePaymentIntent>;
  user: User;
};

export type BookingIntent = {
  __typename?: 'BookingIntent';
  offering: Offering;
  price: Price;
  stripePaymentIntent?: Maybe<StripePaymentIntent>;
};

export type Business = {
  __typename?: 'Business';
  address: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  offerings: Array<Offering>;
  phoneNumber: Scalars['String'];
  photoUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateBookingInput = {
  numGuests: Scalars['Int'];
  offeringId: Scalars['ID'];
  startDateTime: Scalars['DateTime'];
  stripePaymentIntentId?: InputMaybe<Scalars['ID']>;
  user: CreateUserInput;
};

export type CreateBookingPayload = {
  __typename?: 'CreateBookingPayload';
  booking?: Maybe<Booking>;
};

export type CreateDraftBookingPayload = {
  __typename?: 'CreateDraftBookingPayload';
  booking?: Maybe<DraftBooking>;
};

export type CreateDraftOrderPayload = {
  __typename?: 'CreateDraftOrderPayload';
  draftOrder?: Maybe<DraftOrder>;
};

export type CreateOfferingPayload = {
  __typename?: 'CreateOfferingPayload';
  offering?: Maybe<Offering>;
};

export type CreateScheduleInput = {
  exampleField?: InputMaybe<Scalars['Int']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
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
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type DraftOrderInput = {
  bookings: Array<DraftBookingInput>;
  id?: InputMaybe<Scalars['ID']>;
};

export enum DurationFormat {
  Hour = 'HOUR',
  Minute = 'MINUTE'
}

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
  createBooking: CreateBookingPayload;
  createDraftBooking: CreateDraftBookingPayload;
  createDraftOrder: CreateDraftOrderPayload;
  createOffering: CreateOfferingPayload;
  updateDraftOrder: UpdateDraftOrderPayload;
  updateOffering: UpdateOfferingPayload;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateDraftBookingArgs = {
  input: DraftBookingInput;
};


export type MutationCreateDraftOrderArgs = {
  input: DraftOrderInput;
};


export type MutationCreateOfferingArgs = {
  input: OfferingInput;
};


export type MutationUpdateDraftOrderArgs = {
  input: DraftOrderInput;
};


export type MutationUpdateOfferingArgs = {
  input: OfferingInput;
};

export type Offering = {
  __typename?: 'Offering';
  availableTimes: Array<Maybe<Scalars['String']>>;
  business: Business;
  depositFixedAmount?: Maybe<Scalars['Int']>;
  depositPerPerson?: Maybe<Scalars['Int']>;
  depositPercent?: Maybe<Scalars['Int']>;
  depositType?: Maybe<DepositType>;
  description?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  id: Scalars['ID'];
  maxAdvance: Scalars['Int'];
  maxAdvanceFormat: MaxAdvanceFormat;
  maxGuests: Scalars['Int'];
  minAdvance: Scalars['Int'];
  minAdvanceFormat: MinAdvanceFormat;
  minGuests: Scalars['Int'];
  name: Scalars['String'];
  paymentType: PaymentType;
  photoUrls: Array<Scalars['String']>;
  pricePerPerson?: Maybe<Scalars['Int']>;
  priceTotalAmount?: Maybe<Scalars['Int']>;
  pricingType: PricingType;
  schedule: Schedule;
  status: OfferingStatus;
};


export type OfferingAvailableTimesArgs = {
  dateTime: Scalars['DateTime'];
  numGuests?: InputMaybe<Scalars['Int']>;
};

export type OfferingInput = {
  depositFixedAmount?: InputMaybe<Scalars['Int']>;
  depositPerPerson?: InputMaybe<Scalars['Int']>;
  depositPercent?: InputMaybe<Scalars['Int']>;
  depositType?: InputMaybe<DepositType>;
  description?: InputMaybe<Scalars['String']>;
  duration: Scalars['Int'];
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
  bookingIntent: BookingIntent;
  business: Business;
  draftOrder: DraftOrder;
  draftOrders?: Maybe<Array<DraftOrder>>;
  offering: Offering;
  order: Order;
};


export type QueryBookingArgs = {
  id: Scalars['ID'];
};


export type QueryBookingIntentArgs = {
  numGuests: Scalars['Int'];
  offeringId: Scalars['ID'];
  startDateTime: Scalars['DateTime'];
  stripePaymentIntentId?: InputMaybe<Scalars['ID']>;
};


export type QueryBusinessArgs = {
  id: Scalars['ID'];
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

export type Schedule = {
  __typename?: 'Schedule';
  id: Scalars['ID'];
  name: Scalars['String'];
  timeSlots: Array<ScheduleTimeSlot>;
};

export type ScheduleInput = {
  timeSlots: Array<ScheduleTimeSlotInput>;
};

export type ScheduleTimeSlot = {
  __typename?: 'ScheduleTimeSlot';
  day: Scalars['Int'];
  startTime: Scalars['String'];
};

export type ScheduleTimeSlotInput = {
  day: Scalars['Int'];
  startTime: Scalars['String'];
};

export type StripePaymentIntent = {
  __typename?: 'StripePaymentIntent';
  clientSecret: Scalars['String'];
  id: Scalars['ID'];
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
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreateDraftOrderMutationVariables = Exact<{
  input: DraftOrderInput;
}>;


export type CreateDraftOrderMutation = { __typename?: 'Mutation', createDraftOrder: { __typename?: 'CreateDraftOrderPayload', draftOrder?: { __typename?: 'DraftOrder', id: string, createdAt: any, updatedAt: any, bookings: Array<{ __typename?: 'DraftBooking', id: string, startDateTime: any, numGuests: number, offering: { __typename?: 'Offering', id: string } }> } | null } };

export type CreateOfferingMutationVariables = Exact<{
  input: OfferingInput;
}>;


export type CreateOfferingMutation = { __typename?: 'Mutation', createOffering: { __typename?: 'CreateOfferingPayload', offering?: { __typename?: 'Offering', id: string } | null } };

export type UpdateDraftOrderMutationVariables = Exact<{
  input: DraftOrderInput;
}>;


export type UpdateDraftOrderMutation = { __typename?: 'Mutation', updateDraftOrder: { __typename?: 'UpdateDraftOrderPayload', draftOrder?: { __typename?: 'DraftOrder', id: string, createdAt: any, updatedAt: any, bookings: Array<{ __typename?: 'DraftBooking', id: string, startDateTime: any, numGuests: number, offering: { __typename?: 'Offering', id: string } }> } | null } };

export type UpdateOfferingMutationVariables = Exact<{
  input: OfferingInput;
}>;


export type UpdateOfferingMutation = { __typename?: 'Mutation', updateOffering: { __typename?: 'UpdateOfferingPayload', offering?: { __typename?: 'Offering', id: string } | null } };

export type GetDraftOrderQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetDraftOrderQuery = { __typename?: 'Query', draftOrder: { __typename?: 'DraftOrder', id: string, createdAt: any, updatedAt: any, bookings: Array<{ __typename?: 'DraftBooking', id: string, startDateTime: any, endDateTime: any, numGuests: number, offering: { __typename?: 'Offering', id: string, name: string } }> } };

export type GetDraftOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDraftOrdersQuery = { __typename?: 'Query', draftOrders?: Array<{ __typename?: 'DraftOrder', id: string, createdAt: any }> | null };

export type GetOfferingQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOfferingQuery = { __typename?: 'Query', offering: { __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat, schedule: { __typename?: 'Schedule', timeSlots: Array<{ __typename?: 'ScheduleTimeSlot', startTime: string, day: number }> } } };

export type GetOfferingSchedulesQueryVariables = Exact<{
  businessId: Scalars['ID'];
}>;


export type GetOfferingSchedulesQuery = { __typename?: 'Query', business: { __typename?: 'Business', id: string, name: string, description: string, email: string, phoneNumber: string, address: string, photoUrls?: Array<string | null> | null, offerings: Array<{ __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat, schedule: { __typename?: 'Schedule', name: string, timeSlots: Array<{ __typename?: 'ScheduleTimeSlot', day: number, startTime: string }> } }> } };

export type GetOfferingsQueryVariables = Exact<{
  businessId: Scalars['ID'];
}>;


export type GetOfferingsQuery = { __typename?: 'Query', business: { __typename?: 'Business', id: string, name: string, description: string, email: string, phoneNumber: string, address: string, photoUrls?: Array<string | null> | null, offerings: Array<{ __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat }> } };


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
    schedule {
      timeSlots {
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
    query getOfferingSchedules($businessId: ID!) {
  business(id: $businessId) {
    id
    name
    description
    email
    phoneNumber
    address
    photoUrls
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
      schedule {
        name
        timeSlots {
          day
          startTime
        }
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
 *      businessId: // value for 'businessId'
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
    query getOfferings($businessId: ID!) {
  business(id: $businessId) {
    id
    name
    description
    email
    phoneNumber
    address
    photoUrls
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
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useGetOfferingsQuery(baseOptions: Apollo.QueryHookOptions<GetOfferingsQuery, GetOfferingsQueryVariables>) {
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