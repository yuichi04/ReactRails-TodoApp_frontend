import React from "react";
import styled from "styled-components";

const Container: React.FC = React.memo(({ children }) => {
  return (
    <SContainer>
      <SContentBox>{children}</SContentBox>
    </SContainer>
  );
});

export default Container;

const SContainer = styled.div`
  padding: 64px;

  @media (max-width: 820px) {
    padding: 32px;
  }
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
const SContentBox = styled.div`
  box-shadow: 0 2px 6px #c1ced7;
  border-radius: 4px;
  background: #fff;
  margin: 0 auto;
  width: 60%;
  padding: 32px;

  @media (max-width: 820px) {
    width: 100%;
    padding: 16px;
  }
`;
