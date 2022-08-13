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

const EditBoardDetail: React.FC<Props> = React.memo((props) => {
  const { board, change, update } = props;
  const [inputDetail, setInputDetail] = useState(board.detail || "");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDetail(e.target.value);
  };

  return (
    <SEditBoardDetail>
      <TextField value={inputDetail} onChange={handleChange} fullWidth multiline rows={6} />
      <SInner>
        <PrimaryButton onClick={() => update(board, "detail", inputDetail)} width="80px">
          更新
        </PrimaryButton>
        <DisabledButton onClick={() => change("detail")} margin="0 0 0 8px">
          キャンセル
        </DisabledButton>
      </SInner>
    </SEditBoardDetail>
  );
});

export default EditBoardDetail;

const SEditBoardDetail = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
`;
const SInner = styled.div`
  margin-top: 8px;
`;
