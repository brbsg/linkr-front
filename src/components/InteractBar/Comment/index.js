import { useState, useEffect } from 'react'
import { AiOutlineComment } from 'react-icons/ai'

import useAuth from '../../../hooks/useAuth';
import api from '../../../services/api'

export default function Comment({commentsOpen, setCommentsOpen, postId}) {
    const { token } = useAuth()
    const [commentData, setCommentData] = useState(null)

    async function getComments() {
        try {
            const { data } = await api.getComments(postId, token);
            setCommentData(data)
        } catch(err) {
            console.log(err)
        }
    }
    getComments()

    return(
        <div onClick={() => setCommentsOpen(!commentsOpen)}>
        <AiOutlineComment size={30} />
        <p> {
        commentData ?
            commentData.length === 1 ? `${commentData.length} comment`  : `${commentData.length} comments`
        : '0 comments '}</p>
        </div>
    )
}