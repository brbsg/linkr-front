import { useEffect, useState } from "react";
import api from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import styled from "styled-components";
import MetaLink from "./MetaLink";
import ReactModal from "react-modal";
import { IoTrash } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import ReactHashtag from "@mdnm/react-hashtag";
import { useNavigate, useParams } from "react-router-dom";

import InteractBar from "../../../components/InteractBar";
import Comments from "../../../components/Comments";

ReactModal.setAppElement("#root");

export default function Posts({ reloadPostsTrend }) {
  const [posts, setPosts] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postId, setPostId] = useState(null);
  const [reloadByDelEdit, setReloadByDelEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [newText, setNewText] = useState("");
  const [isAtivo, setIsAtivo] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [commentsOpen, setCommentsOpen] = useState(false);

  const params = useParams();

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
        alert("Could not delete this post.");
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
      alert("Erro ao editar. Tente novamente mais tarde.");
    });
  }

  async function loadPosts() {
    const { data } = await api.getUserPosts(token, params.id);
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

  useEffect(loadPosts, [reloadPostsTrend, reloadByDelEdit]);
  // console.log(posts);
  if (!posts) {
    return (
      <PostsContainer>
        <h1>Loading</h1>
      </PostsContainer>
    );
  }
  if (posts === "No friends") {
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

  function goToUserPage(userId) {
    navigate(`/users/${userId}`);
  }

  return (
    <>
      <PostsContainer>
        {posts.map((post) => (
          <CommentsAndPostBox>
            <PostBox key={post.id}>
              {post.delEditOption === true && (
                <>
                  <EditIcon
                    onClick={() => handleOpenEdit(post.description, post.id)}
                  >
                    <TiPencil color="white" />
                  </EditIcon>
                  <TrashCan
                    onClick={() => {
                      handleOpenModal();
                      setPostId(post.id);
                    }}
                  >
                    <IoTrash color="white" />
                  </TrashCan>
                </>
              )}

              <NavBox>
                <img
                  src={post.image}
                  alt="perfil-user"
                  onClick={() => goToUserPage(post.userId)}
                  style={{ cursor: "pointer" }}
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
                    <ReactHashtag
                      renderHashtag={(hashtagValue) => (
                        <StyledHashtag
                          key={hashtagValue}
                          href={`/search/${hashtagValue}`}
                        >
                          {hashtagValue}
                        </StyledHashtag>
                      )}
                      onHashtagClick={(hashtag) =>
                        navigate(`/hashtag/${hashtag.substring(1)}`)
                      }
                    >
                      {post.description}
                    </ReactHashtag>
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
                    {isLoading ? "Loading..." : "Yes, delete it"}
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
        ))}
      </PostsContainer>
    </>
  );
}

const PostsContainer = styled.div`
  width: 100%;

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

  @media (max-width: 630px) {
    border-radius: 0px;
  }
  @media (max-width: 550px) {
    padding: 9px 15px;
  }
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

  @media (max-width: 550px) {
    h2 {
      font-size: 17px;
      line-height: 20px;
    }
    h3 {
      font-size: 15px;
      line-height: 18px;
    }
  }
`;

const TrashCan = styled.div`
  position: absolute;
  top: 22px;
  right: 23px;

  :hover {
    cursor: pointer;
  }
  @media (max-width: 550px) {
    top: 9px;
    right: 15px;
  }
`;

const EditIcon = styled.div`
  position: absolute;
  top: 22px;
  right: 50px;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 550px) {
    top: 9px;
    right: 45px;
  }
`;

const Button = styled.button`
  width: 134px;
  height: 37px;
  border-radius: 5px;
  margin: 0px 13px;

  background-color: #fff;
  color: #1877f2;

  font-family: "Lato", sans-serif;
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

  font-family: "Lato", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.8px;
`;

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff15",
  },
  content: {
    width: "597px",
    height: "262px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#333333",
    color: "#FFF",
    border: "none",
    borderRadius: "50px",
    textAlign: "center",
    padding: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "30px",
  },
};

const StyledHashtag = styled.span`
  font-weight: 900;

  :hover {
    cursor: pointer;
  }
`;

const CommentsAndPostBox = styled.div`
  width: 100%;
  border-radius: 16px;
  background: #1e1e1e;
`;
