import client from "./client";
import { NewTodo, Todo } from "../../types";

// 開いたボードと同じboard_idを持つtodoを取得
export const fetchTodos = (board_id: string) => {
  return client.get(`/todos/${board_id}`);
};

// todoを新規作成
export const createTodo = (data: NewTodo) => {
  return client.post("/todos", data);
};

// todoを削除
export const deleteTodo = (id: string) => {
  return client.delete(`/todos/${id}`);
};

// todoを更新
export const updateTodo = (data: Todo) => {
  return client.patch(`/todos/${data.id}`, data);
};
