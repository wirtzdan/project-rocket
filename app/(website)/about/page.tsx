import { Heading, Text, VStack } from "@chakra-ui/react";
import Markdown from "react-markdown";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";

export default function AboutPage() {
  return (
    <>
      <Section
        header
        bg="bg.muted"
        borderBottomColor="border"
        borderBottomWidth="1px"
      >
        <VStack gap={{ base: "6", md: "8" }} textAlign="center">
          <VStack gap={{ base: "5", md: "6" }}>
            <VStack gap={{ base: "3", md: "4" }}>
              <Text
                textStyle={{ base: "sm", md: "md" }}
                fontWeight="medium"
                color="colorPalette.fg"
              >
                About
              </Text>
              <Heading as="h1" textStyle={{ base: "4xl", md: "5xl" }}>
                Fugiat ex est amet excepteur eu dolor
              </Heading>
            </VStack>
            <Text
              color="fg.muted"
              textStyle={{ base: "lg", md: "xl" }}
              maxW="3xl"
            >
              Eu veniam aliquip sint Lorem nostrud.
            </Text>
          </VStack>
        </VStack>
      </Section>
      <Section>
        <Prose mx="auto" size="lg">
          <Markdown>
            {`
Consectetur deserunt et nostrud culpa officia consequat anim eu labore anim fugiat. Est reprehenderit mollit amet cillum. Cupidatat sit ullamco ea id excepteur commodo nostrud nulla esse amet anim commodo id. Et nisi magna est magna eu voluptate mollit et ullamco do tempor. Consequat minim ea elit pariatur duis proident dolor velit ad officia incididunt duis. Lorem mollit voluptate mollit aute irure velit sit et dolor elit pariatur Lorem. Laborum sunt enim exercitation cillum adipisicing laboris labore nisi laboris incididunt laboris do deserunt nostrud consequat. Labore aliquip cupidatat amet do non pariatur dolor ad.

Velit ullamco minim culpa. Cupidatat eiusmod excepteur nostrud non ex tempor aliqua. Laboris ipsum amet eu pariatur ipsum nisi anim velit adipisicing aliqua magna est. Mollit quis aliqua magna exercitation ex commodo enim mollit Lorem voluptate exercitation enim culpa eiusmod.

Ut cillum id ex nulla magna quis veniam aute. Occaecat in pariatur officia consequat dolore est minim cupidatat consequat officia dolore do consequat fugiat. Irure ipsum ex ullamco magna consectetur ut. Culpa nisi eiusmod eiusmod non. Amet duis deserunt sit irure eiusmod cillum quis dolor non esse id. Consectetur officia non ipsum exercitation ex excepteur incididunt ad. Nulla non consequat quis sunt voluptate est aliqua. Pariatur excepteur nisi dolor eu ut non elit fugiat tempor.

Id sunt duis eiusmod aute pariatur laboris. Voluptate commodo culpa cupidatat elit irure consequat voluptate ex tempor anim id laboris culpa qui. Tempor eu adipisicing dolore dolor qui minim proident. Pariatur commodo sunt duis eiusmod ea. Velit reprehenderit tempor laboris nostrud id eu ea quis in. Et duis tempor laborum laborum ut incididunt. Deserunt qui eiusmod reprehenderit minim ipsum qui officia minim.
          `}
          </Markdown>
        </Prose>
      </Section>
    </>
  );
}
