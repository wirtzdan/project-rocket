"use client";

import {
  Button,
  Field,
  HStack,
  Menu,
  Portal,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import posthog from "posthog-js";
import { useRef, useState } from "react";
import { PiChatTeardropText } from "react-icons/pi";
import { useAuth } from "@/components/provider/auth-provider";
import { useOutsetaActivity } from "@/utils/use-outseta-activity";

export const FeedbackButton = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { trackActivity } = useOutsetaActivity();

  const handleFormOpened = () => {
    posthog.capture("feedback_form_opened", {
      source: "feedback_button",
    });

    if (user?.Account?.Uid) {
      trackActivity({
        title: "Open Feedback Form",
        entityType: 1,
        entityUid: user.Account.Uid,
      });
    }
  };

  const handleSubmit = () => {
    const feedbackText = textareaRef.current?.value ?? "";
    if (!feedbackText.trim()) {
      setError("Please enter your feedback");
      textareaRef.current?.focus();
      return;
    }
    setError("");
    setIsSubmitting(true);
    posthog.capture("feedback_submitted", {
      feedback_length: feedbackText.length,
      has_content: feedbackText.trim().length > 0,
    });
    setIsSubmitting(false);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  return (
    <Menu.Root positioning={{ placement: "bottom" }}>
      <Menu.Trigger asChild>
        <Button
          onClick={handleFormOpened}
          size="xs"
          variant="outline"
        >
          Feedback?
          <PiChatTeardropText aria-hidden="true" />
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content colorPalette={"primary"}>
            <VStack p={2}>
              <Field.Root invalid={!!error}>
                <Field.Label>Feedback</Field.Label>
                <Textarea
                  autoComplete="off"
                  h="140px"
                  name="feedback"
                  placeholder={"e.g., I noticed a bug when\u2026"}
                  ref={textareaRef}
                  variant="outline"
                />
                {error && <Field.ErrorText>{error}</Field.ErrorText>}
              </Field.Root>
              <HStack w="full">
                <Button
                  loading={isSubmitting}
                  onClick={handleSubmit}
                  size="xs"
                  variant="solid"
                  w="full"
                >
                  Send
                </Button>
              </HStack>
            </VStack>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
