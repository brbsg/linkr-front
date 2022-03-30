import { CommentsBox } from "./style"
import Input from "./Input"
import Comment from "./Comment"

export default function Comments({commentsOpen}) {
    
    if(commentsOpen) return(
        <CommentsBox>
            <Comment />
            <Comment />
            <Input />
        </CommentsBox>
    )
    
    return('')
}