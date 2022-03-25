import { useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import styled from "styled-components";
import Posts from "./PostBox";

export default function Timeline() {
  const [postForm, setPostForm] = useState({link: "", text: ""});
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useAuth();

  function handleChange(e) {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  }

  function handlePost(event){
    event.preventDefault();

    setIsLoading(true);
    let promise = api.sendPost(postForm, token);
    promise.then(()=>{
      setIsLoading(false);
    });
    promise.catch(()=>{
      alert("Houve um erro ao publicar seu link");
      setIsLoading(false);
    })
  }

  return (
    <>
    <ContainerPublications>
        <TitlePage>timeline</TitlePage>
        <PublishBlock>
        <UserBlock>
            <img src={`user.img`} alt="user-perfil" />
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
            type="text"
            onChange={handleChange}
            name="text"
            value={postForm.text}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading? "Publishing...": "Publish"}
            </button> 
        </FormBlock>
        </PublishBlock>
        <Posts />
    </ContainerPublications>
    </>
  );
}

const ContainerPublications = styled.div`
  width: 610px;
`;

const TitlePage = styled.h1`
  padding-top: 78px;
  padding-bottom: 43px;
  
  font-family: 'Oswald';
`;

const PublishBlock = styled.div`
  width: 100%;
  height: 209px;
  padding: 17px;
  
  display: flex;
  gap: 18px;
  
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
`;

const UserBlock = styled.div`
  width: 50px;
  img{
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
  }
`;

const FormBlock = styled.form`
  width: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  h2{
    width: 100%;
    height: 40px;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;

    color: #707070;
  }
  button{
    width: 112px;
    height: 31px;
    
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    
    color: #FFFFFF;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    background: #1877F2;
    border-radius: 5px;
  }
`;

const LinkInput = styled.input`
  all: unset;
  width: 100%;
  height: 30px;
  padding: 8px 12px;

  ::placeholder{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;

    color: #949494;
  }

  background: #EFEFEF;
  border-radius: 5px;
  box-sizing: border-box;
`;

const DescriptionInput = styled.input`
  all: unset;
  width: 100%;
  height: 66px;
  padding: 8px 12px;
  
  ::placeholder{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;

    color: #949494;
  }

  background: #EFEFEF;
  border-radius: 5px;
  box-sizing: border-box;
`;