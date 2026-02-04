import {
  Button,
  Field,
  HStack,
  Menu,
  Portal,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { PiChatTeardropText } from "react-icons/pi";

export const FeedbackButton = () => {
  const handleSubmit = (feedback: string) => {
    console.log("Feedback sent:", feedback);
  };

  return (
    <Menu.Root positioning={{ placement: "bottom" }}>
      <Menu.Trigger asChild>
        <Button
          data-o-account-activity="Open Feedback Form"
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
                  placeholder="Start typing..."
                  variant="outline"
                />
              </Field.Root>
              <HStack w="full">
                <Button
                  onClick={() => handleSubmit}
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
