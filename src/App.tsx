import { h } from 'preact';
import { Manuscripts } from './Manuscripts';
import styled from 'styled-components';

const Container = styled.div`
  width: 91vw;
  margin: 0 auto;
`;

export const App = () => {
  return (
    <Container>
      <Manuscripts />
    </Container>
  );
};
