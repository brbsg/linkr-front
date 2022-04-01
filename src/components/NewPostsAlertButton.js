import { useEffect, useState } from 'react';
import useInterval from 'use-interval';
import styled from 'styled-components';
import { HiRefresh } from 'react-icons/hi';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

export default function NewPostsAlertButton({ onClick }) {
  const [numberOfPosts, setNumberOfPosts] = useState();
  const [newPosts, setNewPosts] = useState();
  const [postsVariation, setPostsVariation] = useState(0);
  const { token } = useAuth();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const promise = await api.newPostsAlert(token);
      setNumberOfPosts(promise.data.count);
    } catch (error) {
      console.log('Erro no useEffect do newPostsAlert ' + error.message);
    }
  }, []);

  console.log(postsVariation);

  useInterval(() => {
    try {
      const promise = api.newPostsAlert(token);
      promise.then(({ data }) => {
        setPostsVariation(data.count - numberOfPosts);
        setNewPosts(data.count);
        console.log(postsVariation);
      });
    } catch (error) {
      console.log('Erro no useInterval do newPostsAlert ' + error.message);
    }
  }, 15000);

  if (postsVariation > 0) {
    return (
      <StyledButton
        onClick={() => {
          onClick();
          setPostsVariation(0);
          setNumberOfPosts(newPosts);
        }}
      >
        {`${postsVariation} new posts, load more!`} <HiRefresh color='white' />
      </StyledButton>
    );
  } else {
    return <></>;
  }
}

const StyledButton = styled.button`
  width: 100%;
  height: 61px;
  margin-bottom: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  font-family: Lato, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;

  :hover {
    cursor: pointer;
  }
`;
