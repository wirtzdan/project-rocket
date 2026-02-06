import { projectConfig } from "@/config";

export const plans: PlanData[] = [
  {
    value: "basic",
    title: "Basic",
    description: "For small teams looking to get started with our platform",
    features: [
      { title: "2 teams", icon: "team" },
      { title: "3 users", icon: "user" },
      { title: "100\u00A0GB storage", icon: "storage" },
      { title: "Basic support", icon: "help" },
    ],
    priceCurrency: "US",
    priceSymbol: "$",
    monthlyPrice: { unit: "month", price: 12 },
    yearlyPrice: { unit: "year", price: 10 },
    uid: projectConfig.auth.plans.basic.uid,
  },
  {
    value: "pro",
    title: "Pro",
    description: "For teams looking to scale their operations",
    features: [
      { title: "5 teams", icon: "team" },
      { title: "10 users", icon: "user" },
      { title: "500\u00A0GB storage", icon: "storage" },
      { title: "Priority support", icon: "help" },
    ],
    priceCurrency: "US",
    priceSymbol: "$",
    recommended: true,
    monthlyPrice: { unit: "month", price: 25 },
    yearlyPrice: { unit: "year", price: 20 },
    uid: projectConfig.auth.plans.pro.uid,
  },
];

export interface PlanData {
  value: string;
  title: string;
  description: string;
  features: Array<{ title: string; icon: string }>;
  priceCurrency: string;
  recommended?: boolean;
  priceSymbol: string;
  monthlyPrice: { unit: string; price: number };
  yearlyPrice: { unit: string; price: number };
  uid: string;
}
