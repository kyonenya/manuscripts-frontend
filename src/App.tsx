import { h } from 'preact';
import { Manuscripts } from './Manuscripts';
import styled from 'styled-components';

export const App = () => {
  return (
    <Container>
      <Manuscripts />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  @media screen and (max-width: 559px) {
    width: 91vw; 
    margin-bottom: 1.5em;
  }
  @media screen and (min-width: 560px) {
    width: 85vw;
  }
  @media screen and (min-width: 960px) {
    width: 77vw;
    max-width: 900px;
  }
  /* Grobal styles */
  font-family: "Helvetica Neue", Verdana, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif;
`;
