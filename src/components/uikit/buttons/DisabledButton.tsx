import React from "react";
import styled, { css } from "styled-components";

type Props = Omit<JSX.IntrinsicElements["button"], "ref"> & React.CSSProperties;

const DisabledButton: React.FC<Props> = React.memo(({ children, ...props }) => {
  return <SButton {...props}>{children}</SButton>;
});

export default DisabledButton;

const SButton = styled.button<Props>`
  border: none;
  border-radius: 4px;
  background: #ababab;
  color: #fff;
  cursor: pointer;
  height: 30px;
  padding: 5px 12px;
  margin: ${(props) => props.margin};
  transition: all 0.3s;
  ${(props) => !props.disabled && "&:hover { opacity: 0.8 }"}
  ${(props) => props.disabled && disabledCss}
`;

const disabledCss = css`
  opacity: 0.5;
  cursor: default;
`;
