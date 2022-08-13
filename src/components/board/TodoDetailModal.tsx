import React, { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Todo, UpdateTodoText } from "../../types";
import { TextField } from "../uikit/textFields";
import { DisabledButton, PrimaryButton } from "../uikit/buttons";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "@media (max-width:900px)": {
    width: "calc(100% - 32px)",
  },
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo: Todo;
  update: UpdateTodoText;
};

const TodoDetailModal: React.FC<Props> = React.memo((props) => {
  const { open, setOpen, todo, update } = props;
  const [isEditing, setIsEditing] = useState({
    content: false,
    detail: false,
  });
  const [values, setValues] = useState({
    content: todo.content,
    detail: todo.detail,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: "content" | "detail") => {
    setValues({
      ...values,
      [key]: e.target.value,
    });
  };

  const handleClickUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: "content" | "detail",
    value: string
  ) => {
    update(e, todo, key, value);
    setIsEditing({ ...isEditing, [key]: false });
    setValues({ ...values, [key]: "" });
  };

  const handleClickClose = () => {
    setOpen(false);
    setIsEditing({ content: false, detail: false });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <SInner>
          <p>タイトル</p>
          {isEditing.content ? (
            <>
              <TextField onChange={(e) => handleChange(e, "content")} value={values.content} fullWidth />
              <SButtonWrap>
                <PrimaryButton
                  onClick={(e) => handleClickUpdate(e, "content", values.content)}
                  margin="0 8px 0 0"
                  width="80px"
                >
                  更新
                </PrimaryButton>
                <DisabledButton onClick={() => setIsEditing({ ...isEditing, content: false })}>
                  キャンセル
                </DisabledButton>
              </SButtonWrap>
            </>
          ) : (
            <SText onClick={() => setIsEditing({ ...isEditing, content: true })}>{todo.content}</SText>
          )}
        </SInner>
        <SInner>
          <p>説明</p>
          {isEditing.detail ? (
            <>
              <TextField
                onChange={(e) => handleChange(e, "detail")}
                value={values.detail || ""}
                fullWidth
                multiline
                rows={6}
                placeholder="ここに説明を入力"
              />
              <SButtonWrap>
                <PrimaryButton
                  onClick={(e) => handleClickUpdate(e, "detail", values.detail || "")}
                  margin="0 8px 0 0"
                  width="80px"
                >
                  更新
                </PrimaryButton>
                <DisabledButton onClick={() => setIsEditing({ ...isEditing, detail: false })}>
                  キャンセル
                </DisabledButton>
              </SButtonWrap>
            </>
          ) : (
            <>
              {!todo.detail ? (
                <>
                  <STextGray>まだ説明がありません</STextGray>
                  <PrimaryButton onClick={() => setIsEditing({ ...isEditing, detail: true })}>
                    + 説明を入力する
                  </PrimaryButton>
                </>
              ) : (
                <SText onClick={() => setIsEditing({ ...isEditing, detail: true })}>{todo.detail}</SText>
              )}
            </>
          )}
        </SInner>
        <SButtonWrap>
          <PrimaryButton onClick={handleClickClose}>閉じる</PrimaryButton>
        </SButtonWrap>
      </Box>
    </Modal>
  );
});

export default TodoDetailModal;

const SInner = styled.div`
  margin-bottom: 32px;
`;
const SText = styled.p`
  cursor: pointer;
  font-weight: 600;
  white-space: pre-wrap;
  word-break: break-all;
`;
const STextGray = styled.p`
  color: #666;
  margin: 16px 0;
`;
const SButtonWrap = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
