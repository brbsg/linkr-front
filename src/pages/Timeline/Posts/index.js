import { useEffect, useState } from "react";
import api from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import styled from "styled-components";
import MetaLink from "./MetaLink";
import Like from "../../../components/Like";
import ReactModal from "react-modal";
import { IoTrash } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";

ReactModal.setAppElement("#root");

export default function Posts({ reloadPosts }) {
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
        setReloadByDelEdit(!reloadByDelEdit);
      })
      .catch(() => {
        handleOpenModal();
        setIsLoading(false);
        alert("Could not delete this post.");
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
      backgroundColor: "white",
      opacity: "0.75",
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
  console.log(newText);

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
    const { data } = await api.getPosts(token);
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

  useEffect(loadPosts, [reloadPosts, reloadByDelEdit]);

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

  function goToUserPage(userId) {
    navigate(`/users/${userId}`);
  }

  return (
    <PostsContainer>
      {posts.map((post) => (
        <PostBox key={post.id}>
          {post.delEditOption === true && (
            <>
              <EditIcon onClick={() => handleOpenEdit(post.text, post.id)}>
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
            <Like postId={post.id} token={token} />
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
              <h3>{post.text}</h3>
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
      ))}
    </PostsContainer>
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
