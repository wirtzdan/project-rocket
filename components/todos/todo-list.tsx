"use client";

import {
  Button,
  Checkbox,
  EmptyState,
  HStack,
  IconButton,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { PiListChecks, PiTrash } from "react-icons/pi";
import { api } from "@/convex/_generated/api";

export function TodoList() {
  const [newTodoText, setNewTodoText] = useState("");

  const todos = useQuery(api.todos.list);
  const createTodo = useMutation(api.todos.create);
  const toggleTodo = useMutation(api.todos.toggleCompleted);
  const removeTodo = useMutation(api.todos.remove);

  const handleAddTodo = async () => {
    const trimmed = newTodoText.trim();
    if (!trimmed) return;
    await createTodo({ text: trimmed });
    setNewTodoText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  if (todos === undefined) {
    return (
      <VStack py="8">
        <Spinner size="lg" />
      </VStack>
    );
  }

  return (
    <VStack align="stretch" gap="6" w="full">
      <HStack gap="3">
        <Input
          flex="1"
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          size="lg"
          value={newTodoText}
        />
        <Button
          aria-label="Add todo"
          disabled={!newTodoText.trim()}
          onClick={handleAddTodo}
          size="lg"
        >
          Add
        </Button>
      </HStack>

      {todos.length === 0 ? (
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <PiListChecks />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>No todos yet</EmptyState.Title>
              <EmptyState.Description>
                Add your first todo above to get started.
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      ) : (
        <VStack align="stretch" gap="2">
          {todos.map((todo) => (
            <HStack
              bg="bg.subtle"
              borderRadius="l2"
              gap="3"
              key={todo._id}
              p="3"
            >
              <Checkbox.Root
                bg="bg"
                checked={todo.completed}
                colorPalette="primary"
                onCheckedChange={() => toggleTodo({ id: todo._id })}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
              <Text
                color={todo.completed ? "fg.muted" : "fg"}
                flex="1"
                textDecoration={todo.completed ? "line-through" : "none"}
              >
                {todo.text}
              </Text>
              <IconButton
                aria-label="Delete todo"
                colorPalette="gray"
                onClick={() => removeTodo({ id: todo._id })}
                size="xs"
                variant="ghost"
              >
                <PiTrash />
              </IconButton>
            </HStack>
          ))}
        </VStack>
      )}
    </VStack>
  );
}
