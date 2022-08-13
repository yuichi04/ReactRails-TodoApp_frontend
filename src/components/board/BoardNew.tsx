import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../layout";
import { PrimaryButton } from "../uikit/buttons";
import { TextField } from "../uikit/textFields";
import { useBoards } from "../../app/hooks/useBoards";

const BoardNew: React.FC = React.memo(() => {
  const { handleCreateBoard } = useBoards();
  const [values, setValues] = useState({
    title: "",
    detail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: "title" | "detail") => {
    setValues({ ...values, [key]: e.target.value });
  };

  return (
    <Container>
      <STitle>ボードの新規作成</STitle>
      <form onSubmit={(e) => handleCreateBoard(e, values.title, values.detail)}>
        <SInputTitle>
          <p>タイトル</p>
          <TextField
            onChange={(e) => handleChange(e, "title")}
            value={values.title}
            fullWidth
            placeholder="ここにタイトルを入力（必須）"
          />
        </SInputTitle>
        <SInputDetail>
          <p>説明</p>
          <TextField
            onChange={(e) => handleChange(e, "detail")}
            value={values.detail}
            multiline
            rows={10}
            placeholder="ここに説明を入力"
            fullWidth
          />
        </SInputDetail>
        <PrimaryButton width="100%" disabled={!values.title}>
          ボードを作成
        </PrimaryButton>
      </form>
    </Container>
  );
});

export default BoardNew;

const SErrorMessage = styled.p`
  color: #f44336;
`;
const STitle = styled.h1`
  text-align: center;
`;
const SInputTitle = styled.div`
  margin-bottom: 32px;
  p {
    font-weight: 600;
  }
`;
const SInputDetail = styled.div`
  margin-bottom: 32px;
  p {
    font-weight: 600;
  }
`;
