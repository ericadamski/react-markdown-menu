import styled, { css } from 'styled-components';

const position = ({ x, y }) => css`
  position: fixed;
  top: ${y}px;
  left: ${x}px;
`;

const hidden = css`
  visibility: hidden;
  display: none;
`;

export const Container = styled.div`
  ${props => position(props.position)};
  ${props => props.hidden && hidden};
`;

export const Action = styled.button``;
