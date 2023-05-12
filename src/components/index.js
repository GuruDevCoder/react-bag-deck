import React from "react";
import styled from "styled-components";

export const AbsoluteDiv = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

export const RelativeDiv = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export function Title(props) {
  return <AbsoluteDiv>{props.children}</AbsoluteDiv>;
}

export const TitleLeft = styled.h1`
  margin: 0;
  text-align: left;
`;
export const Title2Left = styled.h2`
  margin: 0;
  text-align: left;
`;

export const FlexContainer = styled.div`
  display: flex;
  width: 50vw;
`;

export const FlexItem = styled.div`
  flex: 1 1 auto;
`;

export const Scroller = styled.div`
  overflow-y: scroll;
  height: 90vh;
`;

export const ReactVersion = styled.h2`
  color: yellow;
  margin: 0;
  padding: 0;
`;
