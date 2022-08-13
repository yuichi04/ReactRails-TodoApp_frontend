import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { CreateTodo } from "../../types";
import { PrimaryButton } from "../uikit/buttons";
import { TextField } from "../uikit/textFields";

type Props = {
  create: CreateTodo;
  boardId: string;
};

const TodoForm: React.FC<Props> = React.memo((props) => {
  const [inputTodo, setInputTodo] = useState<string>("");
  const { create, boardId } = props;

  const handleInputTodoText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value);
  }, []);

  const handleSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create(boardId, inputTodo);
    setInputTodo("");
  };

  return (
    <SForm onSubmit={handleSubmitTodo}>
      <TextField value={inputTodo} onChange={handleInputTodoText} placeholder="ここにタスクを入力" fullWidth />
      <PrimaryButton disabled={!inputTodo} width="160px" height="40px">
        リストに追加
      </PrimaryButton>
    </SForm>
  );
});

export default TodoForm;

const SForm = styled.form`
  display: flex;
  align-items: center;
`;
