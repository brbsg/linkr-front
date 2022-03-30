import { useEffect, useState } from 'react';
import api from '../../../services/api';
import useAuth from '../../../hooks/useAuth';
import styled from 'styled-components';
import MetaLink from './MetaLink';
import Like from '../../../components/Like';
import ReactModal from 'react-modal';
import { IoTrash } from 'react-icons/io5';

ReactModal.setAppElement('#root');

export default function Posts({ reloadPosts, hashtag}) {
  const [posts, setPosts] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postId, setPostId] = useState(null);
  const [reloadByDelete, setReloadByDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  function handleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function confirmDelete(id) {
    console.log(id);
    setIsLoading(true);
    const promise = api.deletePost(id);
    promise
      .then(() => {
        setIsLoading(false);
        handleOpenModal();
        setReloadByDelete(!reloadByDelete);
      })
      .catch(() => {
        handleOpenModal();
        setIsLoading(false);
        alert('Could not delete this post.');
      });
  }

  const customStyles = {
    overlay: {
      // position: 'fixed',
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0,
      // backgroundColor: 'rgba(255, 255, 255, 0.75)',
      backgroundColor: 'white',
      opacity: '0.75',
    },
    content: {
      width: '597px',
      height: '262px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#333333',
      color: '#FFF',
      border: 'none',
      borderRadius: '50px',
      textAlign: 'center',
      padding: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '30px',
    },
  };

  async function loadPosts() {
    const { data } = await api.getPostsByHashtag(token, hashtag);
    console.log(data);
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

  useEffect(loadPosts, [reloadPosts, reloadByDelete, hashtag]);

  if (!posts) {
    return (
      <PostsContainer>
        <h1>Loading</h1>
      </PostsContainer>
    );
  }
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
          {post.deleteOption === true && (
            <TrashCan
              onClick={() => {
                handleOpenModal();
                setPostId(post.id);
              }}
            >
              <IoTrash color='white' />
            </TrashCan>
          )}
          <NavBox>
            <img src={post.image} alt='perfil-user' />
            <Like postId={post.id} token={token} />
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
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={handleOpenModal}
            style={customStyles}
          >
            <h2>
              Are you sure you want
              <br />
              to delete this post?
            </h2>
            <div>
              <Button onClick={handleOpenModal}>No, go back</Button>
              <ButtonDelete onClick={() => confirmDelete(postId)}>
                {isLoading ? 'Loading...' : 'Yes, delete it'}
              </ButtonDelete>
            </div>
          </ReactModal>
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
  position: relative;

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
  img {
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
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;

    color: #ffffff;
  }
  h3 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;

    color: #b7b7b7;
  }
`;

const TrashCan = styled.div`
  position: absolute;
  top: 22px;
  right: 23px;

  :hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 134px;
  height: 37px;
  border-radius: 5px;
  margin: 0px 13px;

  background-color: #fff;
  color: #1877f2;

  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.8px;
`;

const ButtonDelete = styled.button`
  width: 134px;
  height: 37px;
  border-radius: 5px;
  margin: 0px 13px;

  background-color: #1877f2;
  color: #fff;

  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.8px;
`;
