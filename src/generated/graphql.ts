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

export type CreateOfferingPayload = {
  __typename?: 'CreateOfferingPayload';
  offering?: Maybe<Offering>;
};

export type CreateScheduleInput = {
  exampleField?: InputMaybe<Scalars['Int']>;
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
  createBusiness: CreateBusinessPayload;
  createCustomer: CreateCustomerPayload;
  createDraftBooking: CreateDraftBookingPayload;
  createDraftOrder: CreateDraftOrderPayload;
  createOffering: CreateOfferingPayload;
  createUser: CreateUserPayload;
  updateDraftOrder: UpdateDraftOrderPayload;
  updateOffering: UpdateOfferingPayload;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateBusinessArgs = {
  input?: InputMaybe<CreateBusinessInput>;
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


export type MutationCreateOfferingArgs = {
  input: OfferingInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
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
  business: Business;
  customer: Customer;
  customers: Array<Customer>;
  draftOrder: DraftOrder;
  draftOrders: Array<DraftOrder>;
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

export type CreateOfferingMutationVariables = Exact<{
  input: OfferingInput;
}>;


export type CreateOfferingMutation = { __typename?: 'Mutation', createOffering: { __typename?: 'CreateOfferingPayload', offering?: { __typename?: 'Offering', id: string } | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserPayload', user?: { __typename?: 'User', uid: string } | null } };

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

export type GetOfferingQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOfferingQuery = { __typename?: 'Query', offering: { __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat, schedule: { __typename?: 'Schedule', timeSlots: Array<{ __typename?: 'ScheduleTimeSlot', startTime: string, day: number }> } } };

export type GetOfferingSchedulesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOfferingSchedulesQuery = { __typename?: 'Query', offerings: Array<{ __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat, schedule: { __typename?: 'Schedule', name: string, timeSlots: Array<{ __typename?: 'ScheduleTimeSlot', day: number, startTime: string }> } }> };

export type GetOfferingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOfferingsQuery = { __typename?: 'Query', offerings: Array<{ __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat }> };


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
    query getOfferingSchedules {
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
 *   },
 * });
 */
export function useGetOfferingSchedulesQuery(baseOptions?: Apollo.QueryHookOptions<GetOfferingSchedulesQuery, GetOfferingSchedulesQueryVariables>) {
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