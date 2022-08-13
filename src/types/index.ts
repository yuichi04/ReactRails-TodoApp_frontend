import React from "react";

/************************
 * Todo
 */
export type NewTodo = {
  content: string;
  board_id: string;
};
export type Todo = {
  id: string;
  content: string;
  detail?: string;
  is_completed: boolean;
  is_editing: boolean;
  board_id: string;
};
export type InputTodo = (e: React.ChangeEvent<HTMLInputElement>, key: "content" | "detail") => void;
export type FetchTodos = (board_id: string) => Promise<void>;
export type CreateTodo = (board_id: string, content: string) => Promise<void>;
export type UpdateTodoAttribute = (todo: Todo, key: "is_editing" | "is_completed", value: boolean) => Promise<void>;
export type UpdateTodoText = (
  e:
    | React.FormEvent<HTMLFormElement>
    | React.ChangeEvent<HTMLInputElement>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  todo: Todo,
  key: "content" | "detail",
  value: string
) => Promise<void>;
export type DeleteTodo = (id: string) => Promise<void>;

/************************
 * Board
 */
export type NewBoard = {
  title: string;
  detail?: string;
};
export type Board = {
  id: string;
  title: string;
  detail?: string;
  is_completed: boolean;
  updated_at: string;
  created_at: string;
};
export type FetchBoard = (board_id: string) => Promise<void>;
export type CreateBoard = (e: React.FormEvent<HTMLFormElement>, title: string, detail?: string) => Promise<void>;
export type UpdateBoardText = (board: Board, key: "title" | "detail", value: string) => Promise<void>;
export type ChangeBoardEditAttribute = (key: "title" | "detail") => void;
export type DeleteBoard = (board_id: string) => Promise<void>;
export type ChangeBoardCompleted = (board: Board, value: boolean) => Promise<void>;
