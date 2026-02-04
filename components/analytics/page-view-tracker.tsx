"use client";

import posthog from "posthog-js";
import { useEffect, useRef } from "react";

interface PageViewTrackerProps {
  eventName: string;
  properties?: Record<string, unknown>;
}

export const PageViewTracker = ({
  eventName,
  properties = {},
}: PageViewTrackerProps) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per component mount
    if (!hasTracked.current) {
      posthog.capture(eventName, properties);
      hasTracked.current = true;
    }
  }, [eventName, properties]);

  return null;
};
