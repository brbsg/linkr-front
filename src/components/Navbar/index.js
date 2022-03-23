import { useState, useEffect } from 'react'

import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'

import userPicture from '../../assets/raymond.png'

export default function Navbar() {
    const [clicked, clickedState] = useState(false)

    return(
        <nav>
        <p className="logo">linkr</p>
        <span>
        {clicked ? <IoIosArrowUp /> : <IoIosArrowDown />}
        <img src={userPicture} />
        </span>
        </nav>
    )
}