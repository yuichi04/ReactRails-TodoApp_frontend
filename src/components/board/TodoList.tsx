import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PrimaryButton } from "../uikit/buttons";
import EditTodoContent from "./EditTodoContent";
import { DeleteTodo, Todo, UpdateTodoAttribute, UpdateTodoText } from "../../types";
import InCompleteTodo from "./InCompleteTodo";

type Props = {
  todos: Todo[];
  update: UpdateTodoText;
  change: UpdateTodoAttribute;
  destroy: DeleteTodo;
};

const TodoList: React.FC<Props> = React.memo((props) => {
  const { todos, update, change, destroy } = props;
  return (
    <>
      {/* 未完了リスト */}
      <ul>
        {todos.map(
          (todo) =>
            !todo.is_completed &&
            (todo.is_editing ? (
              <EditTodoContent
                key={todo.id}
                todo={todo}
                handleUpdateTodoAttribute={change}
                handleUpdateTodoText={update}
              />
            ) : (
              <InCompleteTodo todo={todo} key={todo.id} update={update} destroy={destroy} change={change} />
            ))
        )}
      </ul>
      {/* 完了リスト */}
      <ul>
        {todos.map(
          (todo) =>
            todo.is_completed && (
              <SCompletedTodo key={todo.id}>
                <SInner>
                  <IconButton onClick={() => change(todo, "is_completed", false)} sx={{ color: "#33b6b1" }}>
                    <CheckCircleIcon />
                  </IconButton>
                  <SCompletedContent>{todo.content}</SCompletedContent>
                </SInner>
                <PrimaryButton onClick={() => change(todo, "is_completed", false)}>未完了に戻す</PrimaryButton>
              </SCompletedTodo>
            )
        )}
      </ul>
    </>
  );
});

export default TodoList;

const STodo = styled.li`
  box-shadow: 0px 1px 6px #c1ced7;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px 12px;

  &:hover {
    background: #efefef;
    opacity: 0.8;
  }
`;
const SCompletedTodo = styled(STodo)`
  color: #bbb;
`;
const SInner = styled.div`
  display: flex;
  align-items: center;
`;
const SContent = styled.p`
  cursor: pointer;
  word-break: break-all;
`;
const SCompletedContent = styled(SContent)`
  cursor: default;
`;
