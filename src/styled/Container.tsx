import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  padding: 1em 0 0;
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
