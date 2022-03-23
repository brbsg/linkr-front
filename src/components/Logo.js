import styled from 'styled-components';
import React from 'react';

export default function Logo() {
  return (
    <Container>
      <LogoMain>Linkr</LogoMain>
      <LogoText>
        save, share and discover
        <br />
        the best links on the web
      </LogoText>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  flex: 2;

  padding: 10%;
`;

const LogoMain = styled.h1`
  font-family: 'Passion One';
  font-size: 106px;
  font-style: normal;
  font-weight: 700;
  line-height: 117px;
  letter-spacing: 0.05em;
  text-align: left;

  color: #ffffff;
`;

const LogoText = styled.h2`
  font-family: 'Oswald';
  font-size: 43px;
  font-style: normal;
  font-weight: 700;
  line-height: 64px;
  letter-spacing: 0em;
  text-align: left;

  color: #ffffff;
`;
