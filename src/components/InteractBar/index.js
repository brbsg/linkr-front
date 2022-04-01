import Like from './Like';
import Comment from './Comment';

import { StyledDiv } from './style';

export default function InteractBar({
  post,
  clickedPost,
  setClickedPost,
  token,
  commentsOpen,
  setCommentsOpen,
}) {
  return (
    <StyledDiv>
      <Like postId={post.id} token={token} />
      <Comment
        postId={post.id}
        commentsOpen={commentsOpen}
        setCommentsOpen={setCommentsOpen}
        clickedPost={clickedPost}
        setClickedPost={setClickedPost}
      />
    </StyledDiv>
  );
}
