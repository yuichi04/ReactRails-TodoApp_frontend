import React, { useState } from "react";
import styled from "styled-components";
import { Todo, UpdateTodoAttribute, UpdateTodoText } from "../../types";
import { PrimaryButton } from "../uikit/buttons";
import { TextField } from "../uikit/textFields";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
  todo: Todo;
  handleUpdateTodoAttribute: UpdateTodoAttribute;
  handleUpdateTodoText: UpdateTodoText;
};

const EditingTodo: React.FC<Props> = React.memo((props) => {
  const { todo, handleUpdateTodoAttribute, handleUpdateTodoText } = props;
  const [value, setValue] = useState<string>(todo.content);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <STodo>
      <SForm onSubmit={(e) => handleUpdateTodoText(e, todo, "content", value)}>
        <IconButton onClick={() => handleUpdateTodoAttribute(todo, "is_editing", false)}>
          <CancelIcon />
        </IconButton>
        <TextField value={value} fullWidth onChange={handleChange} />
        <PrimaryButton margin="0 0 0 16px" width="80px">
          更新
        </PrimaryButton>
      </SForm>
    </STodo>
  );
});

export default EditingTodo;

const STodo = styled.li`
  box-shadow: 0px 1px 6px #c1ced7;
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 8px 12px;
`;
const SForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
