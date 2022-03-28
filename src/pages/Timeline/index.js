import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import styled from "styled-components";
import Posts from "./Posts";
import Navbar from "../../components/Navbar";
import Trendings from "./Trendings";

export default function Timeline() {
  const [postForm, setPostForm] = useState({ link: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [reloadPosts, setReloadPosts] = useState(false);
  const [userPicture, setUserPicture] = useState('')
  const { token } = useAuth();

  useEffect(() => getUserPicture(), [])
  function getUserPicture() {
    const promise = api.getUser(token);
    promise.then(({ data }) => setUserPicture(data))
  }

  function handleChange(e) {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  }

  function handlePost(event) {
    event.preventDefault();
    setIsLoading(true);
    let promise = api.sendPost(postForm, token);
    promise.then(() => {
      setIsLoading(false);
      setReloadPosts(!reloadPosts);
    }).catch(() => {
      alert("Houve um erro ao publicar seu link");
      setIsLoading(false);
    });
  }



  return (
    <>
    <Navbar />
    <TitlePage>timeline</TitlePage>
    <Container>
      <ContainerPublications>
          <PublishBlock>
          <UserBlock>
              <img src={userPicture} alt="user-perfil" />
          </UserBlock>
          <FormBlock onSubmit={handlePost}>
              <h2>What are you going to share today?</h2>
              <LinkInput
                placeholder="http://"
                type="text"
                onChange={handleChange}
                name="link"
                value={postForm.link}
                required
              />
              <DescriptionInput 
                placeholder="Awesome article about #javascript"
                type="text-area"
                onChange={handleChange}
                name="text"
                value={postForm.text}
              />
              <button type="submit" disabled={isLoading}>
                {isLoading? "Publishing...": "Publish"}
              </button> 
          </FormBlock>
          </PublishBlock>
          <Posts reloadPosts={reloadPosts}/>
      </ContainerPublications>
      <Trendings />
    </Container>
    </>
  );
}

const TitlePage = styled.h1`
  width: 936px;
  padding-top: 78px;
  padding-bottom: 43px;
  
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;

  color: #FFFFFF;

  align-self: left;

  @media (max-width: 945px){
    width: 610px;
  }
  @media (max-width: 630px){
    width: 100vw;
    padding-top: 91px;
    padding-bottom: 19px;
    padding-left: 17px;
  }
  @media (max-width: 550px){
    font-size: 33px;
    line-height: 49px;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 25px;

  @media (max-width: 630px){
    width: 100vw;
  }
`;

const ContainerPublications = styled.div`
  width: 610px;

  @media (max-width: 630px){
    width: 100%;
  }
`;

const PublishBlock = styled.div`
  width: 100%;
  height: 209px;
  padding: 17px;
  margin-bottom: 29px;

  display: flex;
  gap: 18px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  box-sizing: border-box;

  @media (max-width: 630px){
    border-radius: 0px;
  }
  @media (max-width: 550px){
    height: 164px;
    padding: 12px;
  }
`;

const UserBlock = styled.div`
  width: 50px;
  img {
    width: 50px !important;
    height: 50px;
    border-radius: 26.5px;
  }
  @media (max-width: 420px){
    display: none;
  }
`;

const FormBlock = styled.form`
  width: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  h2 {
    width: 100%;
    height: 40px;

    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;

    color: #707070;
  }
  button {
    width: 112px;
    height: 31px;

    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;

    color: #ffffff;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #1877f2;
    border-radius: 5px;
  }

  @media (max-width: 550px){
    h2{
      font-size: 17px;
      line-height: 20px;
    }
    button{
      height: 22px;
      font-size: 13px;
      line-height: 16px;
    }
  }
  @media (max-width: 420px){
    h2{
      text-align: center;
    }
  }
`;

const LinkInput = styled.input`
  all: unset;
  width: 100%;
  height: 30px;
  padding: 8px 12px;

  font-family: "Lato";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;

  color: #000000;

  ::placeholder {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;

    color: #949494;
  }

  background: #efefef;
  border-radius: 5px;
  box-sizing: border-box;
`;

const DescriptionInput = styled.input`
  all: unset;
  width: 100%;
  height: 66px;
  padding: 8px 12px;

  line-height: 1px;

  font-family: "Lato";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;

  color: #000000;

  ::placeholder {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;

    color: #949494;
  }

  background: #efefef;
  border-radius: 5px;
  box-sizing: border-box;

  @media (max-width: 420px){
    height: 47px;
  }
`;
