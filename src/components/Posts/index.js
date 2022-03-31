import { useEffect, useState } from 'react';

import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import Post from './Post';

import { PostsContainer } from './style';

export default function Posts({ reloadPostsTrend }) {
  const [posts, setPosts] = useState(null);

  const [reloadByDelEdit, setReloadByDelEdit] = useState(false);

  const { token } = useAuth();
  
  async function loadPosts() {
    const { data } = await api.getPosts(token);
    try {
      setPosts(data);
    } catch {
      return (
        <PostsContainer>
          <h1>
            An error occured while trying to fetch the posts, please refresh the
            page
          </h1>
        </PostsContainer>
      );
    }
  }

  useEffect(loadPosts, [reloadPostsTrend, reloadByDelEdit]);
  // console.log(posts);
  if (!posts) {
    return (
      <PostsContainer>
        <h1>Loading</h1>
      </PostsContainer>
    );
  }
  if (posts === 'No friends') {
    return (
      <PostsContainer>
        <h1>You don't follow anyone yet. Search for new friends!</h1>
      </PostsContainer>
    );
  }
  if (posts.length === 0) {
    return (
      <PostsContainer>
        <h1>No posts found from your friends</h1>
      </PostsContainer>
    );
  }

  return (
    <>
      <PostsContainer>
        {posts.map((post, i) => (
          <Post 
            key={i}
            post={post} 
            reloadByDelEdit={reloadByDelEdit}
            setReloadByDelEdit={setReloadByDelEdit}
            />
        ))}
      </PostsContainer>
    </>
  );
}
