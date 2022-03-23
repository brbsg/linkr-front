import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

import { useState, useEffect } from 'react';

import userPicture from '../../../assets/raymond.png';
import { Dropdown } from './style';

export default function Logout() {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    //remover token do usuario do localstorage
    //redirecionar a tela de login
  }

  return (
    <Dropdown>
      <span onClick={() => setClicked(!clicked)}>
        {clicked ? <IoIosArrowUp /> : <IoIosArrowDown />}
        <img src={userPicture} />
      </span>
      {clicked ? <button>Logout</button> : ''}
    </Dropdown>
  );
}
