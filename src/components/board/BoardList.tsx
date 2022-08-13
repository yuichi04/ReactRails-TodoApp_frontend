import React, { useEffect } from "react";
// lib
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
// state
import { selectBoards } from "../../features/board/boardSlice";
// custom hooks
import { useBoards } from "../../app/hooks/useBoards";
// view
import { Container } from "../layout";
import { PrimaryButton } from "../uikit/buttons";
// Material-UI
import HomeIcon from "@mui/icons-material/Home";

const BoardList: React.FC = React.memo(() => {
  const { handleFetchBoards } = useBoards();
  const history = useHistory();
  const boards = useSelector(selectBoards);
  const inCompleteBoards = boards.filter((board) => !board.is_completed);

  useEffect(() => {
    handleFetchBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <STitle>
        <HomeIcon sx={{ color: "#33b6b1", fontSize: 32 }} />
        TaskBoardApp
      </STitle>
      <SCreateBox>
        <SSubTitle>ボードの新規作成</SSubTitle>
        <PrimaryButton onClick={() => history.push("/board/new")}>ボードを作成する</PrimaryButton>
      </SCreateBox>

      <SSubTitle>進行中のボード一覧</SSubTitle>
      <div>{boards.length <= 0 && <p>進行中のボードはありません</p>}</div>
      <ul>
        {inCompleteBoards.map((board) => (
          <SBoard key={board.id} onClick={() => history.push(`/boards/${board.id}`)}>
            {board.title}
          </SBoard>
        ))}
      </ul>
    </Container>
  );
});

export default BoardList;

const STitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;
const SCreateBox = styled.div`
  margin-bottom: 32px;
`;
const SSubTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const SBoard = styled.div`
  box-shadow: 0px 1px 6px #c1ced7;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  font-weight: 600;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px 12px;
  transition: all 0.1s;

  &:hover {
    opacity: 0.8;
    background: #efefef;
  }
`;
