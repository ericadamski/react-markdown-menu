import styled, { css } from 'styled-components';

const position = ({ x, y }) => css`
  position: absolute;
  top: ${y}px;
  left: ${x}px;
`;

const hidden = css`
  visibility: hidden;
  display: none;
`;

export const Container = styled.div`
  ${props => position(props.position)};
  ${props => !props.visible && hidden};

  background: #a0a6bc;
  border: 1px solid #9196aa;
  border-radius: 0.5rem;
  box-shadow: 2px 5px 10px 0 rgba(100, 100, 100, 0.5);
  color: black;

  display: flex;
  overflow: hidden;
`;

export const Action = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.5rem;
  flex-grow: 1;
  width: 3rem;
  border-right: 1px solid #9196aa;

  &:hover {
    background: #7f7b82;
    cursor: pointer;
  }

  &:last-child {
    border-right: none;
  }
`;
