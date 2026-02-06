/**
 * Claims contained in an Outseta JWT token.
 * Re-exported from utils/outseta-utils.ts for convenience.
 */
import type { OutsetaClaims } from "@/utils/outseta-utils";

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
  | "subscription.cancel"
  | "subscription.reopen"
  | "profile.update"
  | "profile.close"
  | "profile.initialized"
  | "account.update"
  | "paymentInformation.update"
  | "accessToken.set"
  | "auth.initialized"
  | "auth.close"
  | "redirect"
  | "nocode.initialized"
  | "nocode.expired"
  | "logout"
  | "nocode.accessDenied"
  | "signup"
  | "signup.preRegister"
  | "signup.registrationData";

export type OutsetaAuthWidgetMode = "login|register" | "login" | "register";

export type OutsetaAuthOpenOptions = {
  widgetMode: OutsetaAuthWidgetMode;
  authenticationCallbackUrl?: string;
  /** Pre-select a plan during registration */
  planUid?: string;
  /** Restrict plan selection to a specific plan family */
  planFamilyUid?: string;
  /** Pre-select payment term: month, annual, quarter, or oneTime */
  planPaymentTerm?: string;
  /** Skip the plan selection step during registration */
  skipPlanOptions?: boolean;
  /** Initial widget state: login, forgotPassword, selectPlan, register, checkout */
  state?: "login" | "forgotPassword" | "selectPlan" | "register" | "checkout";
  /** Widget display mode */
  mode?: "popup" | "embed";
} & Record<string, unknown>;

export type OutsetaBillingRenewalTerm = "Month" | "Year" | "OneTime";

export type OutsetaProfileOpenOptions = {
  tab?:
    | "profile"
    | "account"
    | "team"
    | "teamMemberInvite"
    | "subscriptions"
    | "billing"
    | "password"
    | "planChange"
    | "planCancel"
    | "purchaseAddOn"
    | string;
  /** Comma-separated list of tabs to enable (e.g., "profile,account,team,plan,billing") */
  tabs?: string;
  /** Widget display mode */
  mode?: "popup" | "embedded";
  /** Plan UID for planChange tab */
  planUid?: string;
  /** Add-on UID for purchaseAddOn tab (legacy, use stateProps instead) */
  purchaseAddOnUid?: string;
  /** Billing renewal term for add-on purchase (legacy, use stateProps instead) */
  purchaseAddOnBillingRenewalTerm?: OutsetaBillingRenewalTerm;
  /** State properties for widget initialization */
  stateProps?: {
    /** Add-on UID for purchaseAddOn tab */
    addOnUid?: string;
    /** Billing renewal term ID (number, e.g., 4 for one-time purchase) */
    billingRenewalTerm?: number;
  };
} & Record<string, unknown>;

export interface OutsetaSDK {
  getUser: () => Promise<OutsetaUser>;
  getAccessToken: () => string | null;
  /** Returns the decoded JWT payload from the stored token, or from a provided token */
  getJwtPayload: (accessToken?: string) => Promise<OutsetaClaims | null>;
  setAccessToken: (token: string) => void;
  on: (eventName: OutsetaEventName, handler: (data?: unknown) => void) => void;
  auth: {
    open: (options: OutsetaAuthOpenOptions) => void;
    /** Closes the auth widget (popup mode only) */
    close: () => void;
  };
  profile: {
    open: (options: OutsetaProfileOpenOptions) => void;
    /** Closes the profile widget (popup mode only) */
    close: () => void;
  };
  chat?: {
    show: () => void;
    hide: () => void;
  };
}
