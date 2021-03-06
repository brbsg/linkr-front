import styled from "styled-components";

export const Dropdown = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 15px;
  right: -10px;

  padding-right: 30px;
  padding-left: 30px;

  background: #171717;
  border-radius: 10px;

  button {
    margin-top: 20px;
    margin-bottom: 20px;

    margin: none;
    background: none;

    font-weight: 700;
  }
`;
