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

export type Business = {
  __typename?: 'Business';
  id: Scalars['ID'];
  name: Scalars['String'];
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
  offering: Offering;
  offerings: Array<Offering>;
};


export type QueryOfferingArgs = {
  id: Scalars['ID'];
};


export type QueryOfferingsArgs = {
  businessId: Scalars['ID'];
};

export type TimeSlot = {
  __typename?: 'TimeSlot';
  endDateTime: Scalars['DateTime'];
  id: Scalars['ID'];
  startDateTime: Scalars['DateTime'];
};

export type GetPublicOfferingsQueryVariables = Exact<{
  businessId: Scalars['ID'];
  date: Scalars['DateTime'];
  time?: InputMaybe<Scalars['String']>;
  numGuests?: InputMaybe<Scalars['Int']>;
}>;


export type GetPublicOfferingsQuery = { __typename?: 'Query', offerings: Array<{ __typename?: 'Offering', id: string, name: string, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, availableTimeSlots: Array<{ __typename?: 'TimeSlot', id: string, startDateTime: any }>, featuredImage?: { __typename?: 'Image', id: string, url: string, altText?: string | null } | null }> };


export const GetPublicOfferingsDocument = gql`
    query getPublicOfferings($businessId: ID!, $date: DateTime!, $time: String, $numGuests: Int) {
  offerings(businessId: $businessId) {
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
 * __useGetPublicOfferingsQuery__
 *
 * To run a query within a React component, call `useGetPublicOfferingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicOfferingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicOfferingsQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      date: // value for 'date'
 *      time: // value for 'time'
 *      numGuests: // value for 'numGuests'
 *   },
 * });
 */
export function useGetPublicOfferingsQuery(baseOptions: Apollo.QueryHookOptions<GetPublicOfferingsQuery, GetPublicOfferingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublicOfferingsQuery, GetPublicOfferingsQueryVariables>(GetPublicOfferingsDocument, options);
      }
export function useGetPublicOfferingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicOfferingsQuery, GetPublicOfferingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublicOfferingsQuery, GetPublicOfferingsQueryVariables>(GetPublicOfferingsDocument, options);
        }
export type GetPublicOfferingsQueryHookResult = ReturnType<typeof useGetPublicOfferingsQuery>;
export type GetPublicOfferingsLazyQueryHookResult = ReturnType<typeof useGetPublicOfferingsLazyQuery>;
export type GetPublicOfferingsQueryResult = Apollo.QueryResult<GetPublicOfferingsQuery, GetPublicOfferingsQueryVariables>;