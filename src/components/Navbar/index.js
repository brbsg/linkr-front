import Logout from "./Logout";
import styled from "styled-components";

export default function Navbar() {
  return (
    <Container>
      <p className="logo">linkr</p>
      <Logout />
    </Container>
  );
}

export const Container = styled.nav`
  width: 100%;
  padding: 0 30px;
`;
