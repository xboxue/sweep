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

export type AddCartBookingsInput = {
  cartBookings: Array<CartBookingInput>;
};

export type AddCartBookingsPayload = {
  __typename?: 'AddCartBookingsPayload';
  cart?: Maybe<Cart>;
};

export type Business = {
  __typename?: 'Business';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Cart = {
  __typename?: 'Cart';
  cartBookings: Array<CartBooking>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  stripeClientSecret?: Maybe<Scalars['String']>;
  subtotal: Scalars['Int'];
  tax: Scalars['Int'];
  total: Scalars['Int'];
};

export type CartBooking = {
  __typename?: 'CartBooking';
  id: Scalars['ID'];
  numGuests: Scalars['Int'];
  offering: Offering;
  timeSlot: TimeSlot;
  total: Scalars['Int'];
};

export type CartBookingInput = {
  id?: InputMaybe<Scalars['ID']>;
  numGuests: Scalars['Int'];
  offeringId: Scalars['ID'];
  timeSlotId: Scalars['ID'];
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

export type Image = {
  __typename?: 'Image';
  altText?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
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
  removeCartBookings: RemoveCartBookingsPayload;
  updateCartBookings: UpdateCartBookingsPayload;
  updateCartContactInfo: UpdateCartContactInfoPayload;
  updateCartEmail: UpdateCartEmailPayload;
};


export type MutationAddCartBookingsArgs = {
  input: AddCartBookingsInput;
};


export type MutationRemoveCartBookingsArgs = {
  input: RemoveCartBookingsInput;
};


export type MutationUpdateCartBookingsArgs = {
  input: UpdateCartBookingsInput;
};


export type MutationUpdateCartContactInfoArgs = {
  input: UpdateCartContactInfoInput;
};


export type MutationUpdateCartEmailArgs = {
  input: UpdateCartEmailInput;
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
  difficulty?: Maybe<Scalars['Int']>;
  duration: Scalars['Int'];
  featuredImage: Image;
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

export enum OfferingStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Draft = 'DRAFT'
}

export enum PaymentType {
  Deposit = 'DEPOSIT',
  FullAmount = 'FULL_AMOUNT',
  None = 'NONE'
}

export enum PricingType {
  PerPerson = 'PER_PERSON',
  TotalAmount = 'TOTAL_AMOUNT'
}

export type Query = {
  __typename?: 'Query';
  myCart?: Maybe<Cart>;
  offering: Offering;
  offerings: Array<Offering>;
};


export type QueryOfferingArgs = {
  id: Scalars['ID'];
};

export type RemoveCartBookingsInput = {
  cartBookingIds: Array<Scalars['ID']>;
};

export type RemoveCartBookingsPayload = {
  __typename?: 'RemoveCartBookingsPayload';
  cart?: Maybe<Cart>;
};

export type TimeSlot = {
  __typename?: 'TimeSlot';
  endDateTime: Scalars['DateTime'];
  id: Scalars['ID'];
  startDateTime: Scalars['DateTime'];
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

export type UpdateCartContactInfoInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateCartContactInfoPayload = {
  __typename?: 'UpdateCartContactInfoPayload';
  cart?: Maybe<Cart>;
};

export type UpdateCartEmailInput = {
  email: Scalars['String'];
};

export type UpdateCartEmailPayload = {
  __typename?: 'UpdateCartEmailPayload';
  cart?: Maybe<Cart>;
};

export type UpdateCartContactInfoMutationVariables = Exact<{
  input: UpdateCartContactInfoInput;
}>;


export type UpdateCartContactInfoMutation = { __typename?: 'Mutation', updateCartContactInfo: { __typename?: 'UpdateCartContactInfoPayload', cart?: { __typename?: 'Cart', id: string } | null } };

export type UpdateCartEmailMutationVariables = Exact<{
  input: UpdateCartEmailInput;
}>;


export type UpdateCartEmailMutation = { __typename?: 'Mutation', updateCartEmail: { __typename?: 'UpdateCartEmailPayload', cart?: { __typename?: 'Cart', id: string } | null } };

export type GetMyCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyCartQuery = { __typename?: 'Query', myCart?: { __typename?: 'Cart', id: string, email?: string | null, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, subtotal: number, total: number, tax: number, stripeClientSecret?: string | null, cartBookings: Array<{ __typename?: 'CartBooking', id: string, total: number, numGuests: number, timeSlot: { __typename?: 'TimeSlot', id: string, startDateTime: any, endDateTime: any }, offering: { __typename?: 'Offering', id: string, name: string, paymentType: PaymentType, minGuests: number, maxGuests: number, featuredImage: { __typename?: 'Image', url: string, altText?: string | null } } }> } | null };

export type GetOfferingQueryVariables = Exact<{
  id: Scalars['ID'];
  date: Scalars['DateTime'];
  time?: InputMaybe<Scalars['String']>;
  numGuests?: InputMaybe<Scalars['Int']>;
}>;


export type GetOfferingQuery = { __typename?: 'Query', offering: { __typename?: 'Offering', id: string, name: string, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, availableTimeSlots: Array<{ __typename?: 'TimeSlot', id: string, startDateTime: any }>, featuredImage: { __typename?: 'Image', id: string, url: string, altText?: string | null } } };

export type GetOfferingsQueryVariables = Exact<{
  date: Scalars['DateTime'];
  time?: InputMaybe<Scalars['String']>;
  numGuests?: InputMaybe<Scalars['Int']>;
}>;


export type GetOfferingsQuery = { __typename?: 'Query', offerings: Array<{ __typename?: 'Offering', id: string, name: string, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, difficulty?: number | null, availableTimeSlots: Array<{ __typename?: 'TimeSlot', id: string, startDateTime: any }>, featuredImage: { __typename?: 'Image', id: string, url: string, altText?: string | null } }> };


export const UpdateCartContactInfoDocument = gql`
    mutation updateCartContactInfo($input: UpdateCartContactInfoInput!) {
  updateCartContactInfo(input: $input) {
    cart {
      id
    }
  }
}
    `;
export type UpdateCartContactInfoMutationFn = Apollo.MutationFunction<UpdateCartContactInfoMutation, UpdateCartContactInfoMutationVariables>;

/**
 * __useUpdateCartContactInfoMutation__
 *
 * To run a mutation, you first call `useUpdateCartContactInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartContactInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartContactInfoMutation, { data, loading, error }] = useUpdateCartContactInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCartContactInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartContactInfoMutation, UpdateCartContactInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartContactInfoMutation, UpdateCartContactInfoMutationVariables>(UpdateCartContactInfoDocument, options);
      }
export type UpdateCartContactInfoMutationHookResult = ReturnType<typeof useUpdateCartContactInfoMutation>;
export type UpdateCartContactInfoMutationResult = Apollo.MutationResult<UpdateCartContactInfoMutation>;
export type UpdateCartContactInfoMutationOptions = Apollo.BaseMutationOptions<UpdateCartContactInfoMutation, UpdateCartContactInfoMutationVariables>;
export const UpdateCartEmailDocument = gql`
    mutation updateCartEmail($input: UpdateCartEmailInput!) {
  updateCartEmail(input: $input) {
    cart {
      id
    }
  }
}
    `;
export type UpdateCartEmailMutationFn = Apollo.MutationFunction<UpdateCartEmailMutation, UpdateCartEmailMutationVariables>;

/**
 * __useUpdateCartEmailMutation__
 *
 * To run a mutation, you first call `useUpdateCartEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartEmailMutation, { data, loading, error }] = useUpdateCartEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCartEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartEmailMutation, UpdateCartEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartEmailMutation, UpdateCartEmailMutationVariables>(UpdateCartEmailDocument, options);
      }
export type UpdateCartEmailMutationHookResult = ReturnType<typeof useUpdateCartEmailMutation>;
export type UpdateCartEmailMutationResult = Apollo.MutationResult<UpdateCartEmailMutation>;
export type UpdateCartEmailMutationOptions = Apollo.BaseMutationOptions<UpdateCartEmailMutation, UpdateCartEmailMutationVariables>;
export const GetMyCartDocument = gql`
    query getMyCart {
  myCart {
    id
    email
    firstName
    lastName
    phoneNumber
    subtotal
    total
    tax
    stripeClientSecret
    cartBookings {
      id
      total
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
        paymentType
        minGuests
        maxGuests
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
    query getOffering($id: ID!, $date: DateTime!, $time: String, $numGuests: Int) {
  offering(id: $id) {
    id
    name
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
    availableTimeSlots(date: $date, time: $time, numGuests: $numGuests) {
      id
      startDateTime
    }
    featuredImage {
      id
      url
      altText
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
 *      date: // value for 'date'
 *      time: // value for 'time'
 *      numGuests: // value for 'numGuests'
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
    query getOfferings($date: DateTime!, $time: String, $numGuests: Int) {
  offerings {
    id
    name
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
    difficulty
    availableTimeSlots(date: $date, time: $time, numGuests: $numGuests) {
      id
      startDateTime
    }
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
 *      date: // value for 'date'
 *      time: // value for 'time'
 *      numGuests: // value for 'numGuests'
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