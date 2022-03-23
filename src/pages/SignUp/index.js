import styled from 'styled-components';

import FormSignUp from '../../components/FormSignUp';
import Logo from '../../components/Logo';

function SignUp() {
  return (
    <Container>
      <Logo />
      <FormSignUp />
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
