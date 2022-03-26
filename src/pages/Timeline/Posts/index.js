import { useEffect, useState } from "react";
import api from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import styled from "styled-components";
import MetaLink from "./MetaLink";

export default function Posts() {
  const [posts, setPosts] = useState(null);
  const [reload, setReload] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const promise = api.getPosts(token);
    promise.then(({ data }) => {
      setPosts(data);
  });

    promise.catch(() => {
      return (
        <PostsContainer>
          <h1>
            An error occured while trying to fetch the posts, please refresh the
            page
          </h1>
        </PostsContainer>
      );
    });
  }, []);

  if (!posts) {
    return (
      <PostsContainer>
        <h1>Loading</h1>
      </PostsContainer>
    );}
  if (posts.length === 0) {
    return (
      <PostsContainer>
        <h1>There are no posts yet</h1>
      </PostsContainer>
    );
  }

  return (
    <PostsContainer>
      {posts.map((post) => (
        <PostBox key={post.id}>
          <NavBox>
            <img src={post.image} alt="perfil-user" />
          </NavBox>
          <ContentBox>
            <h2>{post.name}</h2>
            <h3>{post.text}</h3>
            <MetaLink
              url={post.link}
              description={post.linkDescription}
              image={post.linkImage}
              title={post.linkTitle}
            />
          </ContentBox>
        </PostBox>
      ))}
    </PostsContainer>
  );
}

const PostsContainer = styled.div`
  width: 100%;
  padding-top: 29px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const PostBox = styled.div`
  width: 100%;
  padding: 21px 20px;

  display: flex;
  gap: 18px;

  background: #171717;
  border-radius: 16px;
  box-sizing: border-box;
`;

const NavBox = styled.div`
  width: 50px;
  img{
      width: 50px;
      height: 50px;
      border-radius: 26.5px;
  }
  display: flex;
  flex-direction: column;
  gap: 19px;
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;

    color: #ffffff;
  }
  h3 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;

    color: #b7b7b7;
  }
`;
