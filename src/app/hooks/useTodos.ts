import { useState, useCallback } from "react";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "../../lib/api/todos";
import { CreateTodo, DeleteTodo, FetchTodos, NewTodo, Todo, UpdateTodoAttribute, UpdateTodoText } from "../../types";
import { notification } from "../common/notification";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // board_idと一致するtodoを全件取得
  const handleFetchTodos: FetchTodos = useCallback(async (board_id) => {
    try {
      const res = await fetchTodos(board_id);
      if (res.status === 200) {
        setTodos(res.data.todos);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // todoの新規作成
  const handleCreateTodo: CreateTodo = useCallback(
    async (board_id, content) => {
      const todo: NewTodo = {
        content,
        board_id,
      };
      try {
        const res = await createTodo(todo);
        if (res.status === 200) {
          setTodos([...todos, res.data.todo]);
          notification("タスクを作成しました");
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [todos]
  );

  // todoの更新（状態）
  const handleUpdateTodoAttribute: UpdateTodoAttribute = useCallback(
    async (todo, key, value) => {
      const newTodo: Todo = {
        ...todo,
        [key]: value,
      };
      try {
        const res = await updateTodo(newTodo);
        if (res.status === 200) {
          const newTodos = todos.map((todo) => {
            if (todo.id === res.data.todo.id) {
              return res.data.todo;
            }
            return todo;
          });
          setTodos(newTodos);
          if (key === "is_completed") {
            if (value) {
              notification("タスクを完了にしました");
            } else {
              notification("タスクを未完了に戻しました");
            }
          }
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [todos]
  );

  // todoの更新（テキスト）
  const handleUpdateTodoText: UpdateTodoText = useCallback(
    async (e, todo, key, value) => {
      e.preventDefault();
      const newTodo: Todo = {
        ...todo,
        [key]: value,
        is_editing: false,
      };
      try {
        const res = await updateTodo(newTodo);
        if (res.status === 200) {
          const newTodos = todos.map((todo) => {
            if (todo.id === res.data.todo.id) {
              return res.data.todo; // 全てを最新状態に更新
            }
            return todo;
          });
          setTodos(newTodos);
          notification("タスクを更新しました");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [todos]
  );

  // todoの削除
  const handleDeleteTodo: DeleteTodo = useCallback(
    async (id) => {
      const userAnswer = window.confirm("タスクを削除しますか？");
      if (userAnswer) {
        try {
          const res = await deleteTodo(id);
          if (res.status === 200) {
            const newTodos = todos.filter((todo) => todo.id !== id);
            setTodos(newTodos);
            notification("タスクを削除しました");
          } else {
            console.log(res.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    [todos]
  );

  return {
    todos,
    handleFetchTodos,
    handleCreateTodo,
    handleUpdateTodoAttribute,
    handleUpdateTodoText,
    handleDeleteTodo,
  };
};
