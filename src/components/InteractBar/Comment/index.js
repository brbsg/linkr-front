import { useState, useEffect } from 'react';
import { AiOutlineComment } from 'react-icons/ai';

import useAuth from '../../../hooks/useAuth';
import api from '../../../services/api';

export default function Comment({
  commentsOpen,
  setCommentsOpen,
  postId,
  clickedPost,
  setClickedPost,
}) {
  const { token } = useAuth();
  const [commentData, setCommentData] = useState(null);

  useEffect(() => getComments(), []);
  async function getComments() {
    try {
      const { data } = await api.getComments(postId, token);
      setCommentData(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      onClick={() => {
        if (clickedPost !== postId) {
          setCommentsOpen(true);
          setClickedPost(postId);
        } else {
          setCommentsOpen(false);
        }
      }}
    >
      <AiOutlineComment size={30} />
      <p>
        {' '}
        {commentData
          ? commentData.length === 1
            ? `${commentData.length} comment`
            : `${commentData.length} comments`
          : '0 comments '}
      </p>
    </div>
  );
}
