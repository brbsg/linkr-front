import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

export default function FormSignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    pictureUrl: '',
  });

  const [buttonDisable, setButtonDisable] = useState(false);

  const navigate = useNavigate();

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const user = { ...formData };

    try {
      setButtonDisable(true);
      await api.createUser(user);
      navigate('/');
      return;
    } catch (error) {
      // console.log(error.message);
      // console.log(error.response.status);
      if (error.response.status === 409) {
        alert('E-mail já cadastrado');
      } else {
        alert('Erro, tente novamente');
      }
      setButtonDisable(false);
    }
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Input
        placeholder='e-mail'
        type='email'
        onChange={(e) => handleChange(e)}
        name='email'
        value={formData.email}
        required
      />
      <Input
        placeholder='password'
        type='password'
        onChange={(e) => handleChange(e)}
        name='password'
        value={formData.password}
        required
      />
      <Input
        placeholder='username'
        type='text'
        onChange={(e) => handleChange(e)}
        name='username'
        value={formData.username}
        required
      />
      <Input
        placeholder='picture url'
        type='url'
        onChange={(e) => handleChange(e)}
        name='pictureUrl'
        value={formData.pictureUrl}
        required
      />
      <Button disabled={buttonDisable}>Sign Up</Button>
      <StyledLink to='/'>Switch back to login</StyledLink>
    </Container>
  );
}

export const Container = styled.form`
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
  font-family: 'Oswald';
  font-size: 27px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
  color: #000000;

  ::placeholder {
    font-family: 'Oswald';
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

  font-family: Oswald;
  font-size: 27px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: center;

  background: #1877f2;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition-duration: 0.3s;

  :hover {
    background: #ffffff;
    color: #1877f2;
  }

  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)`
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
