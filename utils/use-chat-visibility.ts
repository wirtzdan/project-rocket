import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { projectConfig } from "@/config";
import { isUrlMatchingPattern } from "@/utils/url-matcher";

export function useChatVisibility() {
  const pathname = usePathname();
  const [isChatAvailable, setIsChatAvailable] = useState(false);

  useEffect(() => {
    const checkChatAvailability = () => {
      if (typeof window !== "undefined" && window.Outseta?.chat) {
        setIsChatAvailable(true);
        return true;
      }
      return false;
    };

    // Check if chat is already available
    if (checkChatAvailability()) {
      return;
    }

    // Listen for Outseta loading event
    const handleOutsetaLoaded = () => {
      if (checkChatAvailability()) {
        // Chat is now available, visibility will be handled by pathname effect
      }
    };

    window.addEventListener("outseta:loaded", handleOutsetaLoaded);

    return () => {
      window.removeEventListener("outseta:loaded", handleOutsetaLoaded);
    };
  }, []);

  useEffect(() => {
    if (
      !isChatAvailable ||
      typeof window === "undefined" ||
      !window.Outseta?.chat
    ) {
      return;
    }

    const shouldShowChat = isUrlMatchingPattern(
      pathname,
      projectConfig.outsetaExtraOptions.showChatOn
    );

    if (shouldShowChat) {
      window.Outseta.chat.show();
    } else {
      window.Outseta.chat.hide();
    }
  }, [pathname, isChatAvailable]);
}
