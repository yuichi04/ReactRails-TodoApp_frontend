import client from "./client";
import { NewBoard, Board } from "../../types";

// board一覧を取得
export const fetchBoards = () => {
  return client.get("/boards");
};

// 特定の1件のboardを取得
export const fetchBoard = (id: string) => {
  return client.get(`/boards/${id}`);
};

// boardを新規作成
export const createBoard = (data: NewBoard) => {
  return client.post("/boards", data);
};

// boardを削除
export const deleteBoard = (id: string) => {
  return client.delete(`/boards/${id}`);
};

// boardを更新
export const updateBoard = (data: Board) => {
  return client.patch(`/boards/${data.id}`, data);
};
