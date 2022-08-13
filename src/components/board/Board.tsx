import React, { useEffect } from "react";
import styled from "styled-components";
import { useBoards } from "../../app/hooks/useBoards";
import { Container } from "../layout";
import InCompleteTodoCount from "./InCompleteTodoCount";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useSelector } from "react-redux";
import { selectBoard } from "../../features/board/boardSlice";
import { DisabledButton } from "../uikit/buttons";
import EditBoardTitle from "./EditBoardTitle";
import EditBoardDetail from "./EditBoardDetail";
import { useTodos } from "../../app/hooks/useTodos";

const Board: React.FC = React.memo(() => {
  const href = window.location.href;
  const boardId: string = href.split("/boards/")[1];
  const board = useSelector(selectBoard);
  const { isEditing, handleFetchBoard, handleDeleteBoard, handleChangeBoardEditAttribute, handleUpdateBoardText } =
    useBoards();
  const {
    todos,
    handleCreateTodo,
    handleFetchTodos,
    handleUpdateTodoText,
    handleUpdateTodoAttribute,
    handleDeleteTodo,
  } = useTodos();

  useEffect(() => {
    handleFetchBoard(boardId);
    handleFetchTodos(boardId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleUpdateBoardText]);

  return (
    <>
      <Container>
        <STitle>
          {isEditing.title ? (
            <EditBoardTitle change={handleChangeBoardEditAttribute} update={handleUpdateBoardText} board={board} />
          ) : (
            <SInner onClick={() => handleChangeBoardEditAttribute("title")}>{board.title}</SInner>
          )}
        </STitle>
        <SDetail>
          {isEditing.detail ? (
            <EditBoardDetail change={handleChangeBoardEditAttribute} update={handleUpdateBoardText} board={board} />
          ) : (
            <SInner onClick={() => handleChangeBoardEditAttribute("detail")}>{board.detail}</SInner>
          )}
        </SDetail>
        <SForm>
          <SCategory>入力フォーム</SCategory>
          <TodoForm boardId={board.id} create={handleCreateTodo} />
        </SForm>
        <SCategory>タスク一覧</SCategory>
        <InCompleteTodoCount board={board} todos={todos} />
        <TodoList
          todos={todos}
          update={handleUpdateTodoText}
          change={handleUpdateTodoAttribute}
          destroy={handleDeleteTodo}
        />
        <SButtonWrap>
          <DisabledButton onClick={() => handleDeleteBoard(boardId)}>ボードを削除する</DisabledButton>
        </SButtonWrap>
      </Container>
    </>
  );
});

export default Board;

const SForm = styled.div`
  margin-bottom: 32px;
`;
const STitle = styled.h1`
  font-size: 22px;
  text-align: center;
  margin-bottom: 8px;
`;
const SDetail = styled.div`
  color: #666;
  font-size: 14px;
  text-align: center;
  margin-bottom: 32px;
  white-space: pre-wrap;
  word-break: break-all;
`;
const SInner = styled.div`
  cursor: pointer;
`;
const SCategory = styled.p`
  font-weight: 600;
`;
const SButtonWrap = styled.div`
  margin-top: 32px;
  text-align: right;
`;
