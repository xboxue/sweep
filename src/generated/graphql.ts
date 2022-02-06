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


export type BusinessOfferingsArgs = {
  numGuests?: InputMaybe<Scalars['Int']>;
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

export type CreateOfferingInput = {
  depositFixedAmount?: InputMaybe<Scalars['Int']>;
  depositPerPerson?: InputMaybe<Scalars['Int']>;
  depositPercent?: InputMaybe<Scalars['Int']>;
  depositType?: InputMaybe<DepositType>;
  description?: InputMaybe<Scalars['String']>;
  duration: Scalars['Int'];
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
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateOfferingArgs = {
  input: CreateOfferingInput;
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
};


export type OfferingAvailableTimesArgs = {
  dateTime: Scalars['DateTime'];
  numGuests?: InputMaybe<Scalars['Int']>;
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

export type TimeSlotInput = {
  day: Scalars['Int'];
  startTime: Scalars['String'];
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
  input: CreateOfferingInput;
}>;


export type CreateOfferingMutation = { __typename?: 'Mutation', createOffering: { __typename?: 'CreateOfferingPayload', offering?: { __typename?: 'Offering', id: string } | null } };


export const CreateOfferingDocument = gql`
    mutation createOffering($input: CreateOfferingInput!) {
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