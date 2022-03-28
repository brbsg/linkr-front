import Logout from "./Logout";
import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <p className="logo">linkr</p>

      <Input></Input>

      <div></div>

      <Logout />
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  padding: 0 30px;
`;

const Input = styled.input`
  border: 0;
  width: 563px;
  height: 45px;

  background: #ffffff;
  border-radius: 8px;
`;
