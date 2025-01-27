import prisma from "../lib/prisma";
import { Socket } from "socket.io";
import { Todo } from "@prisma/client";

type TodoResponse<T> = {
  data?: T;
  error?: string;
};

export function createTodoHandlers(socket: Socket) {
  return {
    createTodo: async (
      payload: Todo,
      callback: (res: TodoResponse<number>) => void
    ) => {
      try {
        const todo = await prisma.todo.create({
          data: {
            ...payload,
          },
        });

        callback({ data: todo.id });
        socket.broadcast.emit("todo:created", todo);
      } catch (error) {
        console.error("Create todo error:", error);
        callback({ error: "Failed to create todo" });
      }
    },

    updateTodo: async (
      payload: Todo
    ) => {
      try {
        const todo = await prisma.todo.update({
          where: { id: payload.id },
          data: payload,
        });

        socket.broadcast.emit("todo:updated", todo);
      } catch (error) {
        console.error("Update todo error:", error);
      }
    },

    deleteTodo: async (
      id: number
    ) => {
      try {
        await prisma.todo.delete({
          where: { id },
        });

        socket.broadcast.emit("todo:deleted", id);
      } catch (error) {
        console.error("Delete todo error:", error);
      }
    },

    listTodos: async (
      callback: (res: TodoResponse<Todo[]>) => void
    ) => {
      try {
        const todos = await prisma.todo.findMany();
        callback({ data: todos });
      } catch (error) {
        console.error("List todos error:", error);
        callback({ error: "Failed to list todos" });
      }
    },
  };
} 