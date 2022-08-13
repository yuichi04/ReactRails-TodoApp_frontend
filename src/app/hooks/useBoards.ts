import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveBoardAction, saveBoardsAction, selectBoards } from "../../features/board/boardSlice";
import { AppDispatch } from "../store";
import { fetchBoards, fetchBoard, createBoard, deleteBoard, updateBoard } from "../../lib/api/boards";
import {
  NewBoard,
  Board,
  CreateBoard,
  FetchBoard,
  DeleteBoard,
  UpdateBoardText,
  ChangeBoardEditAttribute,
  ChangeBoardCompleted,
} from "../../types";
import { notification } from "../common/notification";
import { hideLoadingAction, showLoadingAction } from "../../features/loading/loadingSlice";

export const useBoards = () => {
  const dispatch: AppDispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const history = useHistory();
  const [isEditing, setIsEditing] = useState({
    title: false,
    detail: false,
  });

  // boardを全て取得する
  const handleFetchBoards = useCallback(async () => {
    try {
      const res = await fetchBoards();
      if (res.status === 200) {
        dispatch(saveBoardsAction(res.data.boards));
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  // 引数のboard_idと一致するboardを取得する
  const handleFetchBoard: FetchBoard = useCallback(
    async (board_id) => {
      dispatch(showLoadingAction("Loading..."));
      try {
        const res = await fetchBoard(board_id);
        if (res.status === 200) {
          dispatch(saveBoardAction(res.data.board));
          // resが返ってきてから指定した時間を置いてローディングを終了する
          let secondsLeft = 1;
          const interval = setInterval(() => {
            secondsLeft--;
            if (secondsLeft <= 0) {
              dispatch(hideLoadingAction());
              clearInterval(interval);
            }
          }, 200);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  // boardの新規作成
  const handleCreateBoard: CreateBoard = useCallback(
    async (e, title, detail) => {
      e.preventDefault();
      const data: NewBoard = {
        title,
        detail,
      };
      try {
        const res = await createBoard(data);
        if (res.status === 200) {
          const newBoards = [...boards, res.data.board];
          dispatch(saveBoardsAction(newBoards));
          history.push(`/boards/${res.data.board.id}`);
          notification("ボードを新規作成しました");
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, boards, history]
  );

  // boardの更新（テキスト）
  const handleUpdateBoardText: UpdateBoardText = useCallback(
    async (board, key, value) => {
      if (key === "detail" && value.length >= 400) {
        alert("説明文は400文字以内で入力してください");
        return;
      }
      if (key === "title" && value.length >= 100) {
        alert("タイトルは100文字以内で入力してください");
        return;
      }
      const newBoard: Board = {
        ...board,
        [key]: value,
      };
      try {
        const res = await updateBoard(newBoard);
        if (res.status === 200) {
          const newBoards = boards.map((board) => {
            if (board.id === res.data.board.id) {
              return newBoard;
            }
            return board;
          });
          dispatch(saveBoardsAction(newBoards));
          setIsEditing({
            ...isEditing,
            [key]: false,
          });
          notification("ボード情報を更新しました");
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, boards, isEditing]
  );

  // boardの編集状態の更新
  const handleChangeBoardEditAttribute: ChangeBoardEditAttribute = useCallback(
    (key) => {
      switch (key) {
        case "title":
          setIsEditing({
            title: !isEditing.title,
            detail: false,
          });
          break;
        case "detail":
          setIsEditing({
            title: false,
            detail: !isEditing.detail,
          });
          break;
      }
    },
    [isEditing]
  );

  // boardの削除
  const handleDeleteBoard: DeleteBoard = useCallback(
    async (board_id) => {
      const confirm = window.confirm("ボードを削除しますか？");
      if (confirm) {
        try {
          const res = await deleteBoard(board_id);
          if (res.status === 200) {
            history.push("/");
            const newBoards = boards.filter((board) => board.id !== board_id);
            dispatch(saveBoardsAction(newBoards));
            notification("ボードを削除しました");
          } else {
            console.log(res.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    [dispatch, history, boards]
  );

  // boardの完了フラグの変更処理
  const handleChangeBoardCompleted: ChangeBoardCompleted = useCallback(
    async (board, boolean) => {
      const newBoard = {
        ...board,
        is_completed: boolean,
      };
      try {
        const res = await updateBoard(newBoard);
        if (res.status === 200) {
          history.push("/");
          dispatch(saveBoardAction(newBoard));
          if (boolean) {
            notification("ボードを完了リストに移しました");
          } else {
            notification("ボードを未完了に戻しました");
          }
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, history]
  );

  return {
    isEditing,
    handleFetchBoards,
    handleFetchBoard,
    handleCreateBoard,
    handleUpdateBoardText,
    handleChangeBoardEditAttribute,
    handleDeleteBoard,
    handleChangeBoardCompleted,
  };
};
