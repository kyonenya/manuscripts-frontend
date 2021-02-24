import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  @media screen and (max-width: 559px) {
    width: 91vw;
  }
  @media screen and (min-width: 560px) {
    width: 85vw;
  }
  @media screen and (min-width: 960px) {
    width: 77vw;
    max-width: 900px;
  }
`;

export const WideContainer = styled.div`
  margin: 0 auto;
  @media screen and (max-width: 559px) {
    width: 97vw;
  }
  @media screen and (min-width: 560px) {
    width: 85vw;
  }
  @media screen and (min-width: 960px) {
    width: 85vw;
  }
`;