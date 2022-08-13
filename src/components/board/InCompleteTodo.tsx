import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import { DeleteTodo, Todo, UpdateTodoAttribute, UpdateTodoText } from "../../types";
import TodoDetailModal from "./TodoDetailModal";

type Props = {
  todo: Todo;
  update: UpdateTodoText;
  change: UpdateTodoAttribute;
  destroy: DeleteTodo;
};

const InCompleteTodo: React.FC<Props> = React.memo((props) => {
  const { todo, update, change, destroy } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <STodo key={todo.id}>
        <SInner>
          <IconButton onClick={() => change(todo, "is_completed", true)}>
            <RadioButtonUncheckedIcon />
          </IconButton>
          <SContent onClick={() => change(todo, "is_editing", true)}>{todo.content}</SContent>
        </SInner>
        <SInner>
          <IconButton onClick={() => setOpen(true)}>
            <ArticleIcon />
          </IconButton>
          <IconButton onClick={() => destroy(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </SInner>
      </STodo>
      <TodoDetailModal open={open} setOpen={setOpen} todo={todo} update={update} />
    </>
  );
});

export default InCompleteTodo;

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
const SInner = styled.div`
  display: flex;
  align-items: center;
`;
const SContent = styled.p`
  cursor: pointer;
  word-break: break-all;
`;
