import { authConfig } from "@/config/auth-config";
import type { OutsetaPlan } from "@/utils/outseta-api";

export interface PlanData {
  /** Display name (from authConfig override or Outseta) */
  title: string;
  /** Plan description (from authConfig override or Outseta) */
  description: string;
  features: Array<{ title: string; icon: string }>;
  priceSymbol: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  oneTimePrice: number;
  uid: string;
  recommended?: boolean;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Merges Outseta plan data with overrides from authConfig.
 * Only plans that exist in authConfig.plans are included.
 * Plans with `hideFromPricing: true` are excluded.
 *
 * Outseta provides: name, pricing.
 * authConfig provides: name/description overrides, features, recommended.
 */
export function buildPlanData(outsetaPlans: OutsetaPlan[]): PlanData[] {
  return outsetaPlans
    .filter((plan) => {
      const config = authConfig.plans[plan.Uid];
      return config && !config.hideFromPricing;
    })
    .map((plan) => {
      const config = authConfig.plans[plan.Uid];
      const cleanDescription = stripHtml(plan.Description);

      return {
        title: config.name ?? plan.Name,
        description:
          config.description ??
          (cleanDescription && cleanDescription !== "Enter a description..."
            ? cleanDescription
            : ""),
        features: config.features ?? [],
        priceSymbol: "$",
        monthlyPrice: plan.MonthlyRate,
        quarterlyPrice: plan.QuarterlyRate,
        yearlyPrice: plan.AnnualRate,
        oneTimePrice: plan.OneTimeRate,
        uid: plan.Uid,
        recommended: config.recommended,
      };
    });
}
