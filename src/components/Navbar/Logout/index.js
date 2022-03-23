import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

import { Dropdown } from './style';
import userPicture from '../../../assets/raymond.png';


export default function Logout() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  function handleClick() {
        //remover token do usuario do localstorage
      localStorage.removeItem("auth-token-linkr")
        navigate('/')
  }

  return (
    <Dropdown>
      <span onClick={() => setClicked(!clicked)}>
        {clicked ? <IoIosArrowUp /> : <IoIosArrowDown />}
        <img src={userPicture} />
      </span>
      {clicked ? <button onClick={() => handleClick()}>Logout</button> : ''}
    </Dropdown>
  );
}
