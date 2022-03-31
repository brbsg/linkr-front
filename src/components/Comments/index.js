import { useEffect, useState } from "react"

import { CommentsBox } from "./style"
import Input from "./Input"
import Comment from "./Comment"

import useAuth from "../../hooks/useAuth"
import api from "../../services/api"

export default function Comments({commentsOpen, post}) {
    const { token } = useAuth();
    const [comments, setComments] = useState(null)

    useEffect(() => getComments, [])
    function getComments() {
        const promise = api.getComments(post.post.id, token);
        promise.then(( {data} ) => setComments(data))
    }
    getComments()
    
    if(commentsOpen) return(
        <CommentsBox>
            {comments ?
            comments.map((comment, i) => <Comment comment={comment} key={i}/>) 
            :
            ''}
            <Input post={post}/>
        </CommentsBox>
    )
    
    return('')
}