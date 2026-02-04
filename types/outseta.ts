/**
 * Claims contained in an Outseta JWT token.
 * Re-exported from utils/outseta-utils.ts for convenience.
 */
export type { OutsetaClaims } from "@/utils/outseta-utils";

export interface OutsetaAddress {
  AddressLine1: string | null;
  AddressLine2: string | null;
  AddressLine3: string | null;
  City: string;
  State: string;
  PostalCode: string;
  Country: string | null;
  Uid: string;
  Created: string;
  Updated: string;
}

export interface OutsetaSubscriptionAddOn {
  AddOn: {
    Name: string;
    Uid: string;
  };
  Quantity: number | null;
  StartDate: string;
  EndDate: string | null;
  ExpirationDate: string | null;
  RenewalDate: string;
  Rate: number;
  Uid: string;
}

export interface OutsetaSubscription {
  Plan: {
    Name: string;
    Uid: string;
  };
  StartDate: string;
  EndDate: string | null;
  ExpirationDate: string | null;
  RenewalDate: string;
  Rate: number;
  SubscriptionAddOns: OutsetaSubscriptionAddOn[];
  Uid: string;
}

export interface OutsetaAccount {
  Name: string;
  AccountStage: number;
  AccountStageLabel: string;
  CurrentSubscription: OutsetaSubscription | null;
  PrimaryContact: {
    Email: string;
    FirstName: string;
    LastName: string;
    FullName: string;
    Uid: string;
  };
  Uid: string;
  Created: string;
  Updated: string;
}

export interface OutsetaUser {
  Email: string;
  FirstName: string;
  LastName: string;
  FullName: string;
  ProfileImageS3Url: string | null;
  MailingAddress: OutsetaAddress | null;
  PhoneMobile: string;
  PhoneWork: string;
  Language: string;
  LastLoginDateTime: string;
  Account: OutsetaAccount;
  Uid: string;
  Created: string;
  Updated: string;
}

export type OutsetaEventName =
  | "subscription.update"
  | "profile.update"
  | "account.update"
  | "accessToken.set"
  | "auth.initialized"
  | "nocode.initialized"
  | "nocode.expired"
  | "logout"
  | "nocode.accessDenied";

export type OutsetaAuthWidgetMode = "login|register" | "register";

export type OutsetaAuthOpenOptions = {
  widgetMode: OutsetaAuthWidgetMode;
  authenticationCallbackUrl: string;
} & Record<string, unknown>;

export type OutsetaBillingRenewalTerm = "Month" | "Year" | "OneTime";

export type OutsetaProfileOpenOptions = {
  tab?:
    | "profile"
    | "subscriptions"
    | "billing"
    | "password"
    | "planChange"
    | "purchaseAddOn"
    | string;
  /** Plan UID for planChange tab */
  planUid?: string;
  /** Add-on UID for purchaseAddOn tab */
  purchaseAddOnUid?: string;
  /** Billing renewal term for add-on purchase (default: "Month") */
  purchaseAddOnBillingRenewalTerm?: OutsetaBillingRenewalTerm;
} & Record<string, unknown>;

export interface OutsetaSDK {
  getUser: () => Promise<OutsetaUser>;
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;
  on: (eventName: OutsetaEventName, handler: (data?: unknown) => void) => void;
  auth: {
    open: (options: OutsetaAuthOpenOptions) => void;
  };
  profile: {
    open: (options: OutsetaProfileOpenOptions) => void;
  };
  chat?: {
    show: () => void;
    hide: () => void;
  };
}
