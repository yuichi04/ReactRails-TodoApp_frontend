import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header: React.FC = React.memo(() => {
  return (
    <SHeader>
      <Link to="/">
        <SInner>TaskBoardApp(React+Rails)</SInner>
      </Link>
      <Link to="/boards/completed">
        <SLink>完了ボードリスト</SLink>
      </Link>
    </SHeader>
  );
});

export default Header;

const SHeader = styled.header`
  width: 100%;
  height: 60px;
  background: #33b6b1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const SInner = styled.p`
  color: #fff;
  font-size: 22px;
  font-weight: 600;
`;

const SLink = styled.div`
  color: #fff;
  font-size: 16px;
`;
