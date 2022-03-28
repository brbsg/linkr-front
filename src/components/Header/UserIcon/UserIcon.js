import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function UserIcon({ user, setHide }) {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`users/${user.id}`, setHide(true))}>
      <img src={user.image} />

      <p>{user.name}</p>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  gap: 20px;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    /* identical to box height */

    color: #515151;
  }
`;
