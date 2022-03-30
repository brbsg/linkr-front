import { CommentsBox } from "./style"
import Input from "./Input"
import Comment from "./Comment"

export default function Comments({commentsOpen, post}) {
    
    if(commentsOpen) return(
        <CommentsBox>
            <Input post={post}/>
        </CommentsBox>
    )
    
    return('')
}