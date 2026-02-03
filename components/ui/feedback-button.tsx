import { MenuContent, MenuRoot, MenuTrigger } from "@/components/ui/menu";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { ChatTeardropText } from "@phosphor-icons/react/dist/ssr";

export const FeedbackButton = () => {
  const handleSubmit = (feedback: string) => {
    console.log("Feedback sent:", feedback);
  };

  return (
    <MenuRoot positioning={{ placement: "bottom" }}>
      <MenuTrigger asChild>
        <Button
          variant="outline"
          size="xs"
          data-o-account-activity="Open Feedback Form"
        >
          Feedback?
          <ChatTeardropText weight="bold" />
        </Button>
      </MenuTrigger>

      <MenuContent colorPalette={"primary"}>
        <VStack p={2}>
          <Field label="Feedback">
            <Textarea
              placeholder="Start typing..."
              variant="outline"
              h="140px"
            />
          </Field>
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
      </MenuContent>
    </MenuRoot>
  );
};
