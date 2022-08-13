import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { selectLoading } from "../../../features/loading/loadingSlice";

const Loading: React.FC = React.memo(({ children }) => {
  const loading = useSelector(selectLoading);
  const { status, text } = loading;

  return (
    <>
      {status && (
        <SContainer>
          <Loader type="Watch" color="#8bd5da" />
          <p>{text}</p>
        </SContainer>
      )}
      {children}
    </>
  );
});

export default Loading;

const SContainer = styled.div`
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
`;
