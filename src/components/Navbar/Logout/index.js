import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import { Dropdown } from "./style";

import api from "../../../services/api";

import AuthContext from "../../../contexts/AuthContext";

export default function Logout() {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const [clicked, setClicked] = useState(false);
  const [userPicture, setUserPicture] = useState("");

  let dropdownRef = useRef();

  useEffect(() => getUserPicture(), []);

  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setClicked(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function getUserPicture() {
    const promise = api.getUser(token);
    promise.then(({ data }) => setUserPicture(data));
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <Dropdown ref={dropdownRef}>
      <span onClick={() => setClicked(!clicked)}>
        {clicked ? <IoIosArrowUp size={50} /> : <IoIosArrowDown size={50} />}
        <img src={userPicture} />
      </span>
      {clicked ? <button onClick={() => handleLogout()}>Logout</button> : ""}
    </Dropdown>
  );
}
