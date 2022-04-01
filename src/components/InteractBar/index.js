import Like from './Like'
import Comment from './Comment'

import { StyledDiv } from './style'

export default function InteractBar({post, clickedPost, setClickedPost, token, commentsOpen, setCommentsOpen}) {
    console.log(post.id)
    console.log(clickedPost)

    function handleClick() {
        console.log('clicaste-me')
        setClickedPost(post.id)
    }
    return(
        <StyledDiv>
             <Like 
              postId={post.id} 
              token={token} 
              />
              <Comment 
              postId={post.id}
              commentsOpen={commentsOpen}
              setCommentsOpen={setCommentsOpen}
              onClick={() => handleClick()} //por que n funciona?
              />
        </StyledDiv>
    )
}