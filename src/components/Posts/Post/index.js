import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ReactModal from 'react-modal';
import MetaLink from '../MetaLink'
import { IoTrash } from 'react-icons/io5';
import { TiPencil } from 'react-icons/ti';
import ReactHashtag from '@mdnm/react-hashtag';

import useAuth from '../../../hooks/useAuth';
import api from '../../../services/api';

import InteractBar from '../../../components/InteractBar';
import Comments from '../../../components/Comments';
import {
  PostBox,
  NavBox,
  ContentBox,
  TrashCan,
  EditIcon,
  Button,
  ButtonDelete,
  customStyles,
  StyledHashtag,
  CommentsAndPostBox,
} from './style';

ReactModal.setAppElement('#root');

export default function Post(post, reloadByDelEdit, setReloadByDelEdit) {

    const navigate = useNavigate();
    const { token } = useAuth();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [postId, setPostId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [newText, setNewText] = useState('');
    const [isAtivo, setIsAtivo] = useState(true);
    const [commentsOpen, setCommentsOpen] = useState(false);

    function handleOpenModal() {
        setModalIsOpen(!modalIsOpen);
      }
    
      function confirmDelete(id) {
        setIsLoading(true);
        const promise = api.deletePost(id);
        promise
          .then(() => {
            setIsLoading(false);
            handleOpenModal();
            setReloadByDelEdit(!reloadByDelEdit);
          })
          .catch(() => {
            handleOpenModal();
            setIsLoading(false);
            alert('Could not delete this post.');
          });
      }
    
      function handleOpenEdit(postText, id) {
        setIsEditing(!isEditing);
        setNewText(postText);
        setPostId(id);
      }
    
      function handlerKey(e) {
        if (e.keyCode === 13) {
          setDisabled(true);
          setIsAtivo(!isAtivo);
          submitEditedPost(newText);
        }
    
        if (e.keyCode === 27) {
          setDisabled(false);
          setIsAtivo(!isAtivo);
          setIsEditing(false);
        }
      }
    
      function submitEditedPost(newText) {
        const promise = api.editPost(postId, newText);
        promise.then(() => {
          setTimeout(() => {
            setDisabled(false);
            setIsEditing(false);
            setReloadByDelEdit(!reloadByDelEdit);
          }, 1500);
        });
        promise.catch((error) => {
          console.log(error);
          setDisabled(false);
          alert('Erro ao editar. Tente novamente mais tarde.');
        });
      }
      function goToUserPage(userId) {
        navigate(`/users/${userId}`);
      }

  return (
    <CommentsAndPostBox>
      <PostBox key={post.id}>
        {post.delEditOption === true && (
          <>
            <EditIcon onClick={() => handleOpenEdit(post.description, post.id)}>
              <TiPencil color='white' />
            </EditIcon>
            <TrashCan
              onClick={() => {
                handleOpenModal();
                setPostId(post.id);
              }}
            >
              <IoTrash color='white' />
            </TrashCan>
          </>
        )}

        <NavBox>
          <img
            src={post.image}
            alt='perfil-user'
            onClick={() => goToUserPage(post.userId)}
            style={{ cursor: 'pointer' }}
          />
          <InteractBar
            post={post}
            token={token}
            commentsOpen={commentsOpen}
            setCommentsOpen={setCommentsOpen}
          />
        </NavBox>

        <ContentBox>
          <h2>{post.name}</h2>
          {isEditing && postId === post.id ? (
            <input
              autoFocus
              onFocus={(e) => e.currentTarget.select()}
              disabled={disabled}
              ativo={isAtivo}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => handlerKey(e)}
            />
          ) : (
            <h3>
              {/* { <ReactHashtag
                renderHashtag={(hashtagValue) => (
                  <StyledHashtag href={`/search/${hashtagValue}`} key={hashtagValue}>
                    {hashtagValue}
                  </StyledHashtag>
                )}
                onHashtagClick={(hashtag) =>
                  navigate(`/hashtag/${hashtag.substring(1)}`)
                }
              >
                {post.description}
              </ReactHashtag> } */}
            </h3>
          )}
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
      <Comments
        commentsOpen={commentsOpen}
        setCommentsOpen={setCommentsOpen}
        post={post}
      />
    </CommentsAndPostBox>
  );
}
