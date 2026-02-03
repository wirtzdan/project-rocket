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
          variant="outline"
          size="xs"
          data-o-account-activity="Open Feedback Form"
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
                  placeholder="Start typing..."
                  variant="outline"
                  h="140px"
                />
              </Field.Root>
              <HStack w="full">
                <Button
                  variant="solid"
                  size="xs"
                  w="full"
                  onClick={() => handleSubmit}
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
