import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { projectConfig } from "@/config";
import { isUrlMatchingPattern } from "@/utils/url-matcher";

export function useChatVisibility() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !window.Outseta?.chat) {
      return;
    }

    const shouldShowChat = isUrlMatchingPattern(
      pathname,
      projectConfig.outsetaExtraOptions.showChatOn
    );

    if (shouldShowChat) {
      window.Outseta.chat.show();
      console.log("Showing chat ");
    } else {
      window.Outseta.chat.hide();
      console.log("Hiding chat ");
    }
  }, [pathname]);
}
