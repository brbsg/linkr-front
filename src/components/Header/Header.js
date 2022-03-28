import Logout from "./Logout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function goToUserPage(userId) {
    navigate(`/users/${userId}`);
  }

  return (
    <Container>
      <p className="logo">linkr</p>

      <Input></Input>

      <OpenInput>
        <button
          onClick={() => goToUserPage(7)}
          style={{ width: 20, height: 30 }}
        ></button>
      </OpenInput>

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
  margin: 0;
  border: 0;
  width: 563px;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;

  background: #ffffff;
  border-radius: 8px;
  z-index: 2;
`;

const OpenInput = styled.div`
  margin: 0;
  border: 0;
  width: 563px;
  height: 100px;
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 40px 15px;

  background: #e7e7e7;
  border-radius: 8px;
`;
