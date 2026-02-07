import { Heading, Text } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { TodoList } from "@/components/todos/todo-list";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Dashboard",
  description: "Access your personal dashboard and manage your account",
  noIndex: true,
});

export default function App() {
  return (
    <>
      <Section
        bg="bg.subtle"
        borderBottomColor="border"
        borderBottomWidth="1px"
        header
      >
        <Heading size="3xl">Your tasks</Heading>
        <Text color="fg.muted" textStyle="lg">
          The task list below is powered by Convex and updates in real-time.
        </Text>
      </Section>
      <Section>
        <TodoList />
      </Section>
    </>
  );
}
