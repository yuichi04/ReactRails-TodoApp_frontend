import React from "react";
import styled from "styled-components";
import { useBoards } from "../../app/hooks/useBoards";
import { Board, Todo } from "../../types";
import { PrimaryButton } from "../uikit/buttons";

type Props = {
  todos: Todo[];
  board: Board;
};

const InCompleteTodoCount: React.FC<Props> = React.memo((props) => {
  const { todos, board } = props;
  const { handleChangeBoardCompleted } = useBoards();
  const inCompleteTodos = todos.filter((todo) => !todo.is_completed);
  const completeTodos = todos.filter((todo) => todo.is_completed);

  const display = () => {
    if (inCompleteTodos.length >= 1) {
      return inCompleteTodos.length;
    } else if (inCompleteTodos.length === 0 && completeTodos.length >= 1) {
      return (
        <>
          <SCompleted>Completed!</SCompleted>
          <PrimaryButton onClick={() => handleChangeBoardCompleted(board, true)} margin="0 0 0 16px">
            ボードを完了リストに移動する
          </PrimaryButton>
        </>
      );
    } else {
      return 0;
    }
  };
  return (
    <>
      <SCount>残りのタスク: {display()}</SCount>
    </>
  );
});

export default InCompleteTodoCount;

const SCount = styled.div`
  font-size: 14px;
`;

const SCompleted = styled.span`
  color: #33b6b1;
  font-weight: 600;
`;
