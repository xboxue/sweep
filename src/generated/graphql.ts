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
  Decimal: any;
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
  createOffering: CreateOfferingPayload;
  updateOffering: UpdateOfferingPayload;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateOfferingArgs = {
  input: OfferingInput;
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
  status: OfferingStatus;
};

export enum OfferingStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Draft = 'DRAFT'
}

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
  offering: Offering;
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


export type QueryOfferingArgs = {
  id: Scalars['ID'];
};

export type StripePaymentIntent = {
  __typename?: 'StripePaymentIntent';
  clientSecret: Scalars['String'];
  id: Scalars['ID'];
};

export type TimeSlot = {
  __typename?: 'TimeSlot';
  endTime: Scalars['String'];
  startTime: Scalars['String'];
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

export type CreateOfferingMutationVariables = Exact<{
  input: OfferingInput;
}>;


export type CreateOfferingMutation = { __typename?: 'Mutation', createOffering: { __typename?: 'CreateOfferingPayload', offering?: { __typename?: 'Offering', id: string } | null } };

export type UpdateOfferingMutationVariables = Exact<{
  input: OfferingInput;
}>;


export type UpdateOfferingMutation = { __typename?: 'Mutation', updateOffering: { __typename?: 'UpdateOfferingPayload', offering?: { __typename?: 'Offering', id: string } | null } };

export type GetOfferingQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOfferingQuery = { __typename?: 'Query', offering: { __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat } };

export type GetOfferingsQueryVariables = Exact<{
  businessId: Scalars['ID'];
}>;


export type GetOfferingsQuery = { __typename?: 'Query', business: { __typename?: 'Business', id: string, name: string, description: string, email: string, phoneNumber: string, address: string, photoUrls?: Array<string | null> | null, offerings: Array<{ __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat }> } };


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