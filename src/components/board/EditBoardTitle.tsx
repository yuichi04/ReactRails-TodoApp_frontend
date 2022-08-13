import React, { useState } from "react";
import styled from "styled-components";
import { DisabledButton, PrimaryButton } from "../uikit/buttons";
import { TextField } from "../uikit/textFields";
import { Board, ChangeBoardEditAttribute, UpdateBoardText } from "../../types";

type Props = {
  board: Board;
  change: ChangeBoardEditAttribute;
  update: UpdateBoardText;
};

const EditBoardTitle: React.FC<Props> = React.memo((props) => {
  const { board, change, update } = props;
  const [inputTitle, setInputTitle] = useState(board.title);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  return (
    <SEditBoardTitle>
      <TextField value={inputTitle} onChange={handleChange} fullWidth />
      <SButtonWrap>
        <PrimaryButton onClick={() => update(board, "title", inputTitle)} margin="0 8px 0 0" width="80px">
          更新
        </PrimaryButton>
        <DisabledButton onClick={() => change("title")}>キャンセル</DisabledButton>
      </SButtonWrap>
    </SEditBoardTitle>
  );
});

export default EditBoardTitle;

const SEditBoardTitle = styled.div`
  margin-bottom: 32px;
`;
const SButtonWrap = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
