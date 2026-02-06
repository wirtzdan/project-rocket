import { promises as fs } from "node:fs";
import { join } from "node:path";
import { Heading, Text, VStack } from "@chakra-ui/react";
import Markdown from "react-markdown";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { projectConfig } from "@/config";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Documentation",
  description: "Learn how to use and configure Project Rocket",
});

async function getReadmeContent() {
  const readmePath = join(process.cwd(), "README.md");
  const content = await fs.readFile(readmePath, "utf8");
  return content;
}

export default async function DocsPage() {
  const readmeContent = await getReadmeContent();

  return (
    <>
      <Section
        bg="bg.muted"
        borderBottomColor="border"
        borderBottomWidth="1px"
        header
      >
        <VStack gap={{ base: "6", md: "8" }} textAlign="center">
          <VStack gap={{ base: "5", md: "6" }}>
            <VStack gap={{ base: "3", md: "4" }}>
              <Heading as="h1" textStyle={{ base: "4xl", md: "5xl" }}>
                Docs
              </Heading>
            </VStack>
          </VStack>
        </VStack>
      </Section>
      <Section size="md">
        <Prose mx="auto" size="lg">
          <VStack align="flex-start" gap="4" mb="8">
            <Text color="fg.muted">
              Looking for product help or troubleshooting guides? Visit the{" "}
              <a href={projectConfig.outsetaOptions.knowledgeBaseUrl}>
                Project Rocket knowledge base
              </a>{" "}
              for support articles and FAQs.
            </Text>
          </VStack>
          <Markdown>{readmeContent}</Markdown>
        </Prose>
      </Section>
    </>
  );
}
