import { projectConfig } from "@/config";

export interface OutsetaPlan {
  Name: string;
  Description: string;
  MonthlyRate: number;
  QuarterlyRate: number;
  AnnualRate: number;
  OneTimeRate: number;
  SetupFee: number;
  IsActive: boolean;
  TrialPeriodDays: number;
  Uid: string;
}

interface PlansResponse {
  metadata: { limit: number; offset: number; total: number };
  items: OutsetaPlan[];
}

/**
 * Fetches all active plans from the Outseta REST API.
 * Uses the authenticated /billing/plans endpoint (server-side only).
 * Results are cached and revalidated every hour via Next.js ISR.
 *
 * Requires the OUTSETA_API_KEY environment variable in the format "api-key:secret-key".
 * Generate keys at: Settings > Integrations > API Keys in Outseta.
 */
export async function fetchOutsetaPlans(): Promise<OutsetaPlan[]> {
  const domain = projectConfig.outsetaOptions.domain;
  const apiKey = process.env.OUTSETA_API_KEY;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Outseta ${apiKey}`;
  }

  const res = await fetch(`https://${domain}/api/v1/billing/plans`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Outseta plans: ${res.status}`);
  }

  const data: PlansResponse = await res.json();

  return data.items
    .filter((plan) => plan.IsActive)
    .sort((a, b) => a.MonthlyRate - b.MonthlyRate);
}
