import { useState } from 'react'

import { AiOutlineComment } from 'react-icons/ai'

export default function Comment({commentsOpen, setCommentsOpen}) {
    

    return(
        <div onClick={() => setCommentsOpen(!commentsOpen)}>
        <AiOutlineComment size={30} />
        <p>comments</p>
        </div>
    )
}