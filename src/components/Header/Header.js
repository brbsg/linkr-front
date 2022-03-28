import Logout from "./Logout";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import UserIcon from "./UserIcon/UserIcon";

export default function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  const [hide, setHide] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const { token } = useAuth();

  async function onInputChange(value) {
    let response;

    if (value !== inputValue) {
      response = await api.searchUsers(token, { search: value });
    }

    setSearchUsers(response.data);
    setHide(false);
    setInputValue(value);
  }

  if ((location.pathname = "/")) return <></>;

  return (
    <Container>
      <p
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        linkr
      </p>

      <Input
        onChange={(e) => onInputChange(e.target.value)}
        minLength={3}
        debounceTimeout={300}
      />

      <OpenInput style={{ display: hide ? "none" : "flex" }}>
        {searchUsers.map((user) => (
          <UserIcon key={user.id} user={user} setHide={setHide} />
        ))}
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

const Input = styled(DebounceInput)`
  all: unset;
  box-sizing: border-box;
  border: 0;
  width: 563px;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 0 10px;

  background: #ffffff;
  border-radius: 8px;
  z-index: 2;
`;

const OpenInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin: 0;
  border: 0;
  width: 563px;
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 0px 15px;
  padding-bottom: 20px;
  padding-top: 45px;

  background: #e7e7e7;
  border-radius: 8px;
`;
