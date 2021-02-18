import { h, Fragment } from 'preact';
import styled, { createGlobalStyle } from 'styled-components';
import { Manuscripts } from './Manuscripts';

export const App = () => {
  return (
    <Fragment>
      {/* @ts-ignore */}
      <GlobalStyle />
      <Container>
        <Manuscripts />
      </Container>
    </Fragment>
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
`;
const GlobalStyle = createGlobalStyle`
  :root {
    --text-color: hsl(0, 0%, 20%);
    --background-color: hsl(40, 38%, 97%);
    --monochrome-exlight: hsl(0, 0%, 90%);
    --monochrome-light: hsl(0, 0%, 85%);
    --monochrome-midlight: hsl(0, 0%, 75%);
    --monochrome-medium: hsl(0, 0%, 68%);
    --monochrome-weighty: hsl(0, 0%, 38%);
    --main-color: hsl(202, 35%, 50%);
    --main-color-light: hsl(202, 35%, 65%);
    --accent-color: hsl(349, 39%, 62%);
  }
  /*
  @media (prefers-color-scheme: dark) {
    :root {
      --text-color: hsl(40, 38%, 97%);
      --background-color: hsl(0, 0%, 20%);
      --monochrome-exlight: hsl(0, 0%, 15%);
      --monochrome-light: hsl(0, 0%, 33%);
      --monochrome-midlight: hsl(0, 0%, 45%);
      --monochrome-medium: hsl(0, 0%, 50%);
      --monochrome-weighty: hsl(0, 0%, 65%);
      --main-color: hsl(202, 35%, 55%);
      --main-color-midlight: hsl(202, 35%, 50%);
      --main-color-light: hsl(202, 35%, 45%);
      --accent-color: hsl(349, 39%, 58%);
    }
  }
  */
  body {
    font-family: "Helvetica Neue", Verdana, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif;
    color: var(--text-color);
    background: var(--background-color);
    text-align: justify;
  }
`;
