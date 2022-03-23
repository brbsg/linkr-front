import styled from "styled-components";
import FormSignIn from "../../components/FormSignIn";

import FormSignUp from "../../components/FormSignUp";
import Logo from "../../components/Logo";

function SignUp() {
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

export default SignUp;
