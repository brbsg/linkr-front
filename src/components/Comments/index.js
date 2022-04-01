import { useEffect, useState } from 'react';

import { CommentsBox } from './style';
import Input from './Input';
import Comment from './Comment';

import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import api from '../../services/api';

export default function Comments({ commentsOpen, post, clickedPost }) {
  const { token } = useAuth();
  const { user } = useUser();
  const [comments, setComments] = useState(null);
  const [following, setFollowing] = useState([])

  useEffect(() => getComments(), []);
  useEffect(() => getFollowing(), [])

  function getComments() {
    const promise = api.getComments(post.id, token);
    promise.then(({ data }) => setComments(data));
  }
  function getFollowing() {
      const promise = api.getFollowing(token);
      promise.then(({ data }) => setFollowing(data))
  }

  if (commentsOpen)
    return (
      <>
        {post.id == clickedPost ? (
          <CommentsBox>
            {comments
              ? comments.map((comment, i) => (
                  <Comment 
                    key={i}
                    comment={comment}
                    user={user} 
                    post={post} 
                    following={following}/>
                ))
              : ''}
            <Input post={post} />
          </CommentsBox>
        ) : (
          ''
        )}
      </>
    );

  return '';
}
