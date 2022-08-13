import React from "react";
import styled, { css } from "styled-components";

type Props = Omit<JSX.IntrinsicElements["button"], "ref"> & React.CSSProperties;

const PrimaryButton: React.FC<Props> = React.memo(({ children, ...props }) => {
  return <SButton {...props}>{children}</SButton>;
});

export default PrimaryButton;

const SButton = styled.button<Props>`
  border: none;
  border-radius: 4px;
  background: #33b6b1;
  color: #fff;
  cursor: pointer;
  padding: 5px 12px;
  margin: ${(props) => props.margin};
  transition: all 0.3s;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => !props.disabled && "&:hover { opacity: 0.8 }"}
  ${(props) => props.disabled && disabledCss}
`;

const disabledCss = css`
  opacity: 0.5;
  cursor: default;
`;
