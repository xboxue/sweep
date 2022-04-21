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
  id: Scalars['ID'];
  numGuests: Scalars['Int'];
  offering: Offering;
  order: Order;
  timeSlot: TimeSlot;
  total: Scalars['Int'];
};

export type Business = {
  __typename?: 'Business';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CalculatedBooking = {
  __typename?: 'CalculatedBooking';
  id: Scalars['ID'];
  numGuests: Scalars['Int'];
  offering: Offering;
  timeSlot: TimeSlot;
  total: Scalars['Int'];
};

export type CalculatedBookingInput = {
  id?: InputMaybe<Scalars['ID']>;
  numGuests: Scalars['Int'];
  offeringId: Scalars['ID'];
  timeSlotId: Scalars['ID'];
};

export type CalculatedOrder = {
  __typename?: 'CalculatedOrder';
  calculatedBookings: Array<CalculatedBooking>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  subtotal: Scalars['Int'];
  tax: Scalars['Int'];
  total: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
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

export type CreateOrderPayload = {
  __typename?: 'CreateOrderPayload';
  order?: Maybe<Order>;
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

export enum DurationFormat {
  Hour = 'HOUR',
  Minute = 'MINUTE'
}

export type EditOrderAddBookingsInput = {
  calculatedBookings: Array<CalculatedBookingInput>;
  id: Scalars['ID'];
};

export type EditOrderAddBookingsPayload = {
  __typename?: 'EditOrderAddBookingsPayload';
  calculatedOrder?: Maybe<CalculatedOrder>;
};

export type EditOrderBeginInput = {
  orderId: Scalars['ID'];
};

export type EditOrderBeginPayload = {
  __typename?: 'EditOrderBeginPayload';
  calculatedOrder?: Maybe<CalculatedOrder>;
};

export type EditOrderCommitInput = {
  id: Scalars['ID'];
};

export type EditOrderCommitPayload = {
  __typename?: 'EditOrderCommitPayload';
  order?: Maybe<Order>;
};

export type EditOrderRemoveBookingsInput = {
  calculatedBookingIds: Array<Scalars['ID']>;
  id: Scalars['ID'];
};

export type EditOrderRemoveBookingsPayload = {
  __typename?: 'EditOrderRemoveBookingsPayload';
  calculatedOrder?: Maybe<CalculatedOrder>;
};

export type EditOrderUpdateBookingsInput = {
  calculatedBookings: Array<UpdateCalculatedBookingInput>;
  id: Scalars['ID'];
};

export type EditOrderUpdateBookingsPayload = {
  __typename?: 'EditOrderUpdateBookingsPayload';
  calculatedOrder?: Maybe<CalculatedOrder>;
};

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
  createBusiness: CreateBusinessPayload;
  createCustomer: CreateCustomerPayload;
  createFileUploadUrls: CreateFileUploadUrlsPayload;
  createOffering: CreateOfferingPayload;
  createOrder: CreateOrderPayload;
  createTimeSlotBlock: CreateTimeSlotBlockPayload;
  createUser: CreateUserPayload;
  editOrderAddBookings: EditOrderAddBookingsPayload;
  editOrderBegin: EditOrderBeginPayload;
  editOrderCommit: EditOrderCommitPayload;
  editOrderRemoveBookings: EditOrderRemoveBookingsPayload;
  editOrderUpdateBookings: EditOrderUpdateBookingsPayload;
  removeCartBookings: RemoveCartBookingsPayload;
  removeTimeSlotBlock: RemoveTimeSlotBlockPayload;
  updateCartBookings: UpdateCartBookingsPayload;
  updateOffering: UpdateOfferingPayload;
};


export type MutationAddCartBookingsArgs = {
  input: AddCartBookingsInput;
};


export type MutationCreateBusinessArgs = {
  input: CreateBusinessInput;
};


export type MutationCreateCustomerArgs = {
  input: CustomerInput;
};


export type MutationCreateFileUploadUrlsArgs = {
  input: Array<CreateFileUploadUrlsInput>;
};


export type MutationCreateOfferingArgs = {
  input: OfferingInput;
};


export type MutationCreateOrderArgs = {
  input: OrderInput;
};


export type MutationCreateTimeSlotBlockArgs = {
  input: CreateTimeSlotBlockInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationEditOrderAddBookingsArgs = {
  input: EditOrderAddBookingsInput;
};


export type MutationEditOrderBeginArgs = {
  input: EditOrderBeginInput;
};


export type MutationEditOrderCommitArgs = {
  input: EditOrderCommitInput;
};


export type MutationEditOrderRemoveBookingsArgs = {
  input: EditOrderRemoveBookingsInput;
};


export type MutationEditOrderUpdateBookingsArgs = {
  input: EditOrderUpdateBookingsInput;
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
  customer?: Maybe<Customer>;
  id: Scalars['ID'];
  subtotal: Scalars['Int'];
  tax: Scalars['Int'];
  total: Scalars['Int'];
  transactions: Array<Transaction>;
  updatedAt: Scalars['DateTime'];
};

export type OrderInput = {
  customerId: Scalars['ID'];
};

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
  business: Business;
  customer: Customer;
  customers: Array<Customer>;
  myCart?: Maybe<Cart>;
  offering: Offering;
  offerings: Array<Offering>;
  order: Order;
  orders: Array<Order>;
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
  booking?: Maybe<Booking>;
  endDateTime: Scalars['DateTime'];
  id: Scalars['ID'];
  startDateTime: Scalars['DateTime'];
};

export type TimeSlotBlock = {
  __typename?: 'TimeSlotBlock';
  id: Scalars['ID'];
  timeSlot: TimeSlot;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  currency: Scalars['String'];
  id: Scalars['ID'];
  order: Order;
};

export type UpdateCalculatedBookingInput = {
  id?: InputMaybe<Scalars['ID']>;
  numGuests: Scalars['Int'];
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

export type CreateFileUploadUrlsMutationVariables = Exact<{
  input: Array<CreateFileUploadUrlsInput> | CreateFileUploadUrlsInput;
}>;


export type CreateFileUploadUrlsMutation = { __typename?: 'Mutation', createFileUploadUrls: { __typename?: 'CreateFileUploadUrlsPayload', urls?: Array<{ __typename?: 'FileUploadUrl', url: string, fields: any, resourceUrl: string }> | null } };

export type CreateOfferingMutationVariables = Exact<{
  input: OfferingInput;
}>;


export type CreateOfferingMutation = { __typename?: 'Mutation', createOffering: { __typename?: 'CreateOfferingPayload', offering?: { __typename?: 'Offering', id: string } | null } };

export type CreateOrderMutationVariables = Exact<{
  input: OrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'CreateOrderPayload', order?: { __typename?: 'Order', id: string } | null } };

export type CreateTimeSlotBlockMutationVariables = Exact<{
  input: CreateTimeSlotBlockInput;
}>;


export type CreateTimeSlotBlockMutation = { __typename?: 'Mutation', createTimeSlotBlock: { __typename?: 'CreateTimeSlotBlockPayload', timeSlotBlock?: { __typename?: 'TimeSlotBlock', id: string } | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserPayload', user?: { __typename?: 'User', uid: string } | null } };

export type EditOrderBeginMutationVariables = Exact<{
  input: EditOrderBeginInput;
}>;


export type EditOrderBeginMutation = { __typename?: 'Mutation', editOrderBegin: { __typename?: 'EditOrderBeginPayload', calculatedOrder?: { __typename?: 'CalculatedOrder', id: string, subtotal: number, tax: number, total: number, calculatedBookings: Array<{ __typename?: 'CalculatedBooking', id: string, numGuests: number, total: number, timeSlot: { __typename?: 'TimeSlot', id: string, startDateTime: any, endDateTime: any }, offering: { __typename?: 'Offering', id: string, name: string, minGuests: number, maxGuests: number, featuredImage: { __typename?: 'Image', id: string, url: string, altText?: string | null } } }> } | null } };

export type EditOrderCommitMutationVariables = Exact<{
  input: EditOrderCommitInput;
}>;


export type EditOrderCommitMutation = { __typename?: 'Mutation', editOrderCommit: { __typename?: 'EditOrderCommitPayload', order?: { __typename?: 'Order', id: string } | null } };

export type EditOrderRemoveBookingsMutationVariables = Exact<{
  input: EditOrderRemoveBookingsInput;
}>;


export type EditOrderRemoveBookingsMutation = { __typename?: 'Mutation', editOrderRemoveBookings: { __typename?: 'EditOrderRemoveBookingsPayload', calculatedOrder?: { __typename?: 'CalculatedOrder', id: string, subtotal: number, tax: number, total: number, calculatedBookings: Array<{ __typename?: 'CalculatedBooking', id: string, numGuests: number, total: number, timeSlot: { __typename?: 'TimeSlot', id: string, startDateTime: any, endDateTime: any }, offering: { __typename?: 'Offering', id: string, name: string, minGuests: number, maxGuests: number, featuredImage: { __typename?: 'Image', id: string, url: string, altText?: string | null } } }> } | null } };

export type EditOrderUpdateBookingsMutationVariables = Exact<{
  input: EditOrderUpdateBookingsInput;
}>;


export type EditOrderUpdateBookingsMutation = { __typename?: 'Mutation', editOrderUpdateBookings: { __typename?: 'EditOrderUpdateBookingsPayload', calculatedOrder?: { __typename?: 'CalculatedOrder', id: string, subtotal: number, tax: number, total: number, calculatedBookings: Array<{ __typename?: 'CalculatedBooking', id: string, numGuests: number, total: number, timeSlot: { __typename?: 'TimeSlot', id: string, startDateTime: any, endDateTime: any }, offering: { __typename?: 'Offering', id: string, name: string, minGuests: number, maxGuests: number, featuredImage: { __typename?: 'Image', id: string, url: string, altText?: string | null } } }> } | null } };

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

export type UpdateOfferingMutationVariables = Exact<{
  input: OfferingInput;
}>;


export type UpdateOfferingMutation = { __typename?: 'Mutation', updateOffering: { __typename?: 'UpdateOfferingPayload', offering?: { __typename?: 'Offering', id: string } | null } };

export type GetCustomersQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']>;
}>;


export type GetCustomersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'Customer', id: string, createdAt: any, updatedAt: any, firstName?: string | null, phoneNumber?: string | null, lastName?: string | null, email: string }> };

export type GetMyCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyCartQuery = { __typename?: 'Query', myCart?: { __typename?: 'Cart', id: string, email?: string | null, firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, subtotal: number, total: number, tax: number, stripeClientSecret?: string | null, cartBookings: Array<{ __typename?: 'CartBooking', id: string, total: number, numGuests: number, timeSlot: { __typename?: 'TimeSlot', id: string, startDateTime: any, endDateTime: any }, offering: { __typename?: 'Offering', id: string, name: string, paymentType: PaymentType, minGuests: number, maxGuests: number, featuredImage: { __typename?: 'Image', url: string, altText?: string | null } } }> } | null };

export type GetOfferingQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOfferingQuery = { __typename?: 'Query', offering: { __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat, featuredImage: { __typename?: 'Image', id: string, url: string, altText?: string | null }, schedule: { __typename?: 'Schedule', id: string, name: string, timeSlots: Array<{ __typename?: 'ScheduleTimeSlot', id: string, startTime: string, day: number }> } } };

export type GetOfferingSchedulesQueryVariables = Exact<{
  date: Scalars['DateTime'];
}>;


export type GetOfferingSchedulesQuery = { __typename?: 'Query', offerings: Array<{ __typename?: 'Offering', id: string, name: string, minGuests: number, maxGuests: number, featuredImage: { __typename?: 'Image', url: string, altText?: string | null }, timeSlots: Array<{ __typename?: 'TimeSlot', id: string, startDateTime: any, endDateTime: any, booking?: { __typename?: 'Booking', id: string, numGuests: number, total: number, order: { __typename?: 'Order', id: string, subtotal: number, total: number, tax: number, customer?: { __typename?: 'Customer', firstName?: string | null, lastName?: string | null, phoneNumber?: string | null, email: string } | null, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, createdAt: any }> } } | null, block?: { __typename?: 'TimeSlotBlock', id: string } | null }> }> };

export type GetOfferingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOfferingsQuery = { __typename?: 'Query', offerings: Array<{ __typename?: 'Offering', id: string, name: string, status: OfferingStatus, minGuests: number, maxGuests: number, description?: string | null, pricingType: PricingType, pricePerPerson?: number | null, priceTotalAmount?: number | null, paymentType: PaymentType, depositType?: DepositType | null, depositPerPerson?: number | null, depositFixedAmount?: number | null, depositPercent?: number | null, duration: number, maxAdvance: number, maxAdvanceFormat: MaxAdvanceFormat, minAdvance: number, minAdvanceFormat: MinAdvanceFormat, featuredImage: { __typename?: 'Image', id: string, url: string, altText?: string | null } }> };

export type GetOrderQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOrderQuery = { __typename?: 'Query', order: { __typename?: 'Order', id: string, createdAt: any, updatedAt: any, subtotal: number, tax: number, total: number, bookings: Array<{ __typename?: 'Booking', id: string, numGuests: number, total: number, timeSlot: { __typename?: 'TimeSlot', id: string, startDateTime: any, endDateTime: any }, offering: { __typename?: 'Offering', id: string, name: string, minGuests: number, maxGuests: number, featuredImage: { __typename?: 'Image', id: string, url: string, altText?: string | null } } }>, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, createdAt: any }>, customer?: { __typename?: 'Customer', id: string, firstName?: string | null, lastName?: string | null, email: string, phoneNumber?: string | null } | null } };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', id: string, createdAt: any, updatedAt: any, total: number, bookings: Array<{ __typename?: 'Booking', id: string, numGuests: number, offering: { __typename?: 'Offering', id: string, name: string } }>, customer?: { __typename?: 'Customer', id: string, firstName?: string | null, lastName?: string | null, email: string, phoneNumber?: string | null } | null }> };


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
export const CreateOrderDocument = gql`
    mutation createOrder($input: OrderInput!) {
  createOrder(input: $input) {
    order {
      id
    }
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
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
export const EditOrderBeginDocument = gql`
    mutation editOrderBegin($input: EditOrderBeginInput!) {
  editOrderBegin(input: $input) {
    calculatedOrder {
      id
      subtotal
      tax
      total
      calculatedBookings {
        id
        numGuests
        total
        timeSlot {
          id
          startDateTime
          endDateTime
        }
        offering {
          id
          name
          minGuests
          maxGuests
          featuredImage {
            id
            url
            altText
          }
        }
      }
    }
  }
}
    `;
export type EditOrderBeginMutationFn = Apollo.MutationFunction<EditOrderBeginMutation, EditOrderBeginMutationVariables>;

/**
 * __useEditOrderBeginMutation__
 *
 * To run a mutation, you first call `useEditOrderBeginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrderBeginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrderBeginMutation, { data, loading, error }] = useEditOrderBeginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOrderBeginMutation(baseOptions?: Apollo.MutationHookOptions<EditOrderBeginMutation, EditOrderBeginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrderBeginMutation, EditOrderBeginMutationVariables>(EditOrderBeginDocument, options);
      }
export type EditOrderBeginMutationHookResult = ReturnType<typeof useEditOrderBeginMutation>;
export type EditOrderBeginMutationResult = Apollo.MutationResult<EditOrderBeginMutation>;
export type EditOrderBeginMutationOptions = Apollo.BaseMutationOptions<EditOrderBeginMutation, EditOrderBeginMutationVariables>;
export const EditOrderCommitDocument = gql`
    mutation editOrderCommit($input: EditOrderCommitInput!) {
  editOrderCommit(input: $input) {
    order {
      id
    }
  }
}
    `;
export type EditOrderCommitMutationFn = Apollo.MutationFunction<EditOrderCommitMutation, EditOrderCommitMutationVariables>;

/**
 * __useEditOrderCommitMutation__
 *
 * To run a mutation, you first call `useEditOrderCommitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrderCommitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrderCommitMutation, { data, loading, error }] = useEditOrderCommitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOrderCommitMutation(baseOptions?: Apollo.MutationHookOptions<EditOrderCommitMutation, EditOrderCommitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrderCommitMutation, EditOrderCommitMutationVariables>(EditOrderCommitDocument, options);
      }
export type EditOrderCommitMutationHookResult = ReturnType<typeof useEditOrderCommitMutation>;
export type EditOrderCommitMutationResult = Apollo.MutationResult<EditOrderCommitMutation>;
export type EditOrderCommitMutationOptions = Apollo.BaseMutationOptions<EditOrderCommitMutation, EditOrderCommitMutationVariables>;
export const EditOrderRemoveBookingsDocument = gql`
    mutation editOrderRemoveBookings($input: EditOrderRemoveBookingsInput!) {
  editOrderRemoveBookings(input: $input) {
    calculatedOrder {
      id
      subtotal
      tax
      total
      calculatedBookings {
        id
        numGuests
        total
        timeSlot {
          id
          startDateTime
          endDateTime
        }
        offering {
          id
          name
          minGuests
          maxGuests
          featuredImage {
            id
            url
            altText
          }
        }
      }
    }
  }
}
    `;
export type EditOrderRemoveBookingsMutationFn = Apollo.MutationFunction<EditOrderRemoveBookingsMutation, EditOrderRemoveBookingsMutationVariables>;

/**
 * __useEditOrderRemoveBookingsMutation__
 *
 * To run a mutation, you first call `useEditOrderRemoveBookingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrderRemoveBookingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrderRemoveBookingsMutation, { data, loading, error }] = useEditOrderRemoveBookingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOrderRemoveBookingsMutation(baseOptions?: Apollo.MutationHookOptions<EditOrderRemoveBookingsMutation, EditOrderRemoveBookingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrderRemoveBookingsMutation, EditOrderRemoveBookingsMutationVariables>(EditOrderRemoveBookingsDocument, options);
      }
export type EditOrderRemoveBookingsMutationHookResult = ReturnType<typeof useEditOrderRemoveBookingsMutation>;
export type EditOrderRemoveBookingsMutationResult = Apollo.MutationResult<EditOrderRemoveBookingsMutation>;
export type EditOrderRemoveBookingsMutationOptions = Apollo.BaseMutationOptions<EditOrderRemoveBookingsMutation, EditOrderRemoveBookingsMutationVariables>;
export const EditOrderUpdateBookingsDocument = gql`
    mutation editOrderUpdateBookings($input: EditOrderUpdateBookingsInput!) {
  editOrderUpdateBookings(input: $input) {
    calculatedOrder {
      id
      subtotal
      tax
      total
      calculatedBookings {
        id
        numGuests
        total
        timeSlot {
          id
          startDateTime
          endDateTime
        }
        offering {
          id
          name
          minGuests
          maxGuests
          featuredImage {
            id
            url
            altText
          }
        }
      }
    }
  }
}
    `;
export type EditOrderUpdateBookingsMutationFn = Apollo.MutationFunction<EditOrderUpdateBookingsMutation, EditOrderUpdateBookingsMutationVariables>;

/**
 * __useEditOrderUpdateBookingsMutation__
 *
 * To run a mutation, you first call `useEditOrderUpdateBookingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrderUpdateBookingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrderUpdateBookingsMutation, { data, loading, error }] = useEditOrderUpdateBookingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOrderUpdateBookingsMutation(baseOptions?: Apollo.MutationHookOptions<EditOrderUpdateBookingsMutation, EditOrderUpdateBookingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrderUpdateBookingsMutation, EditOrderUpdateBookingsMutationVariables>(EditOrderUpdateBookingsDocument, options);
      }
export type EditOrderUpdateBookingsMutationHookResult = ReturnType<typeof useEditOrderUpdateBookingsMutation>;
export type EditOrderUpdateBookingsMutationResult = Apollo.MutationResult<EditOrderUpdateBookingsMutation>;
export type EditOrderUpdateBookingsMutationOptions = Apollo.BaseMutationOptions<EditOrderUpdateBookingsMutation, EditOrderUpdateBookingsMutationVariables>;
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
    minGuests
    maxGuests
    featuredImage {
      url
      altText
    }
    timeSlots(date: $date) {
      id
      startDateTime
      endDateTime
      booking {
        id
        numGuests
        total
        order {
          id
          subtotal
          total
          tax
          customer {
            firstName
            lastName
            phoneNumber
            email
          }
          transactions {
            id
            amount
            createdAt
          }
        }
      }
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
export const GetOrderDocument = gql`
    query getOrder($id: ID!) {
  order(id: $id) {
    id
    createdAt
    updatedAt
    subtotal
    tax
    total
    bookings {
      id
      numGuests
      total
      timeSlot {
        id
        startDateTime
        endDateTime
      }
      offering {
        id
        name
        minGuests
        maxGuests
        featuredImage {
          id
          url
          altText
        }
      }
    }
    transactions {
      id
      amount
      createdAt
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
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const GetOrdersDocument = gql`
    query getOrders {
  orders {
    id
    createdAt
    updatedAt
    total
    bookings {
      id
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
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;