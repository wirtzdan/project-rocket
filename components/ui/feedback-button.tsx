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
import { useState } from "react";
import { PiChatTeardropText } from "react-icons/pi";

export const FeedbackButton = () => {
  const [feedbackText, setFeedbackText] = useState("");

  const handleFormOpened = () => {
    posthog.capture("feedback_form_opened", {
      source: "feedback_button",
    });
  };

  const handleSubmit = () => {
    if (feedbackText.trim()) {
      posthog.capture("feedback_submitted", {
        feedback_length: feedbackText.length,
        has_content: feedbackText.trim().length > 0,
      });
      console.log("Feedback sent:", feedbackText);
      setFeedbackText("");
    }
  };

  return (
    <Menu.Root positioning={{ placement: "bottom" }}>
      <Menu.Trigger asChild>
        <Button
          data-o-account-activity="Open Feedback Form"
          onClick={handleFormOpened}
          size="xs"
          variant="outline"
        >
          Feedback?
          <PiChatTeardropText />
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content colorPalette={"primary"}>
            <VStack p={2}>
              <Field.Root>
                <Field.Label>Feedback</Field.Label>
                <Textarea
                  h="140px"
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Start typing..."
                  value={feedbackText}
                  variant="outline"
                />
              </Field.Root>
              <HStack w="full">
                <Button
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
