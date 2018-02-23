import styled from 'styled-components';

import { Container } from './menu.styled';

export const Wrapper = styled.div`
  display: relative;

  ${Container} {
    position: absolute;
  }
`;
