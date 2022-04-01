import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormSignIn from "../../components/FormSignIn";
import Logo from "../../components/Logo";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import api from "../../services/api";

export default function Signin() {
  const { token } = useAuth();

  const navigate = useNavigate();

  useEffect(async () => {
    try {
      if (token) {
        await api.validateToken(token);

        navigate("/timeline");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
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
