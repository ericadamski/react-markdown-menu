import styled, { css, injectGlobal } from "styled-components";
import { colors } from "./colors";

injectGlobal`
  html, body {
    font-family: 'Mukta Mahee', sans-serif;
    color: ${colors.rgba["1"]};
    margin: 0;
    padding: 0;
  }
`;

export const Page = styled.main`
  padding: 0;
  margin: 0;
  background: ${colors.rgba["1"]};
  height: 100vh;
`;

export const Header = styled.header`
  height: 33vh;
  min-height: 20rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.rgba["3"]};
`;

export const Title = styled.h1`
  font-size: 3rem;
  width: 100%;
  text-align: center;
`;
