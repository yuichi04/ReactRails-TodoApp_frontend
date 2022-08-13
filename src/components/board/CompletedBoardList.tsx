import React, { useEffect } from "react";
// lib
import styled from "styled-components";
import { useSelector } from "react-redux";
// state
import { selectBoards } from "../../features/board/boardSlice";
// custom hooks
import { useBoards } from "../../app/hooks/useBoards";
// view
import { Container } from "../layout";
// Material-UI
import { DisabledButton, PrimaryButton } from "../uikit/buttons";

const CompletedBoardList: React.FC = React.memo(() => {
  const { handleFetchBoards, handleDeleteBoard, handleChangeBoardCompleted } = useBoards();
  const boards = useSelector(selectBoards);
  const completedBoards = boards.filter((board) => board.is_completed);

  useEffect(() => {
    handleFetchBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <STitle>完了したボード一覧</STitle>
      {completedBoards.length === 0 ? (
        <div>まだ完了したボードはありません</div>
      ) : (
        <ul>
          {completedBoards.map((board) => (
            <SBoard key={board.id}>
              {board.title}
              <SButtonWrap>
                <PrimaryButton onClick={() => handleChangeBoardCompleted(board, false)} margin="0 16px 0 0">
                  未完了に戻す
                </PrimaryButton>
                <DisabledButton onClick={() => handleDeleteBoard(board.id)}>削除</DisabledButton>
              </SButtonWrap>
            </SBoard>
          ))}
        </ul>
      )}
    </Container>
  );
});

export default CompletedBoardList;

const STitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

const SBoard = styled.div`
  box-shadow: 0px 1px 6px #c1ced7;
  border-radius: 4px;
  display: flex;
  font-weight: 600;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px 12px;
  transition: all 0.1s;
`;

const SButtonWrap = styled.div`
  display: flex;
  align-items: center;
`;
