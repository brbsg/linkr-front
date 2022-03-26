import styled from "styled-components";
import FormSignIn from "../../components/FormSignIn";
import Logo from "../../components/Logo";

export default function Signin() {
  return (
    <Container>
      <Logo />
      <FormSignIn />
    </Container>
  );
}

export const Container = styled.div`
  all: unset;
  display: flex;
  width: 100vw;
  height: 100vh;
`;
