import React, { useState } from "react";
import styled from "styled-components";

export default function FormSignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    pictureUrl: "",
  });

  return (
    <Container>
      <Input placeholder="e-mail" />
      <Input placeholder="password" />

      <Button>Sign Up</Button>

      <Link href="/sign-up">Switch back to login</Link>
    </Container>
  );
}

export const Container = styled.div`
  height: 100vh;
  min-width: 400px;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  gap: 14px;

  background: #333333;
`;

const Input = styled.input`
  height: 65px;
  width: 90%;
  padding-left: 17px;
  background: #ffffff;

  border-radius: 6px;
  border: none;
  font-family: "Oswald";
  font-size: 27px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
  color: #000000;

  ::placeholder {
    font-family: "Oswald";
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
    color: #9f9f9f;
  }
`;

const Button = styled.button`
  width: 90%;
  height: 65px;

  background: #1877f2;
  border-radius: 6px;
  border: none;

  font-family: Oswald;
  font-size: 27px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: center;
`;

const Link = styled.a`
  font-family: Lato;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-decoration: underline;
  color: #ffffff;
  cursor: pointer;
`;
