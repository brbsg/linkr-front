import { useEffect, useState } from "react"

import { CommentsBox } from "./style"
import Input from "./Input"
import Comment from "./Comment"

import useAuth from "../../hooks/useAuth"
import api from "../../services/api"

export default function Comments({commentsOpen, post, clickedPost}) {
    const { token } = useAuth();
    const [comments, setComments] = useState(null)

    useEffect(() => getComments, [commentsOpen])
    function getComments() {
        const promise = api.getComments(post.id, token);
        promise.then(( {data} ) => setComments(data))
    }
    getComments()
    
    if(commentsOpen) return(
        <CommentsBox>
            {comments && clickedPost === post.id?
            comments.map((comment, i) => <Comment comment={comment} key={i}/>) 
            :
            ''}
            <Input post={post}/>
        </CommentsBox>
    )
    
    return('')
}