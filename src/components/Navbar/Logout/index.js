import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

import { Dropdown } from './style';
import userPicture from '../../../assets/raymond.png';


export default function Logout() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  let dropdownRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setClicked(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler)
  }
  });

  function handleLogout() {
        //remover token do usuario do localstorage
      localStorage.removeItem("auth-token-linkr")
        navigate('/')
  }


  return (
    <Dropdown ref={dropdownRef}>
      <span onClick={() => setClicked(!clicked)}>
        {clicked ? <IoIosArrowUp /> : <IoIosArrowDown />}
        <img src={userPicture} />
      </span>
      {clicked ? <button onClick={() => handleLogout()}>Logout</button> : ''}
    </Dropdown>
  );
}
