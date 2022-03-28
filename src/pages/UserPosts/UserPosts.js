import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import styled from "styled-components";
import Posts from "./Posts";
import Trendings from "./Trendings";
import { useParams } from "react-router-dom";

export default function UserPosts() {
  const [reloadPosts, setReloadPosts] = useState(false);
  const [userPicture, setUserPicture] = useState("");
  const [userName, setUserName] = useState("");

  const { token } = useAuth();

  const params = useParams();

  useEffect(async () => {
    getUserPicture();
  }, []);

  function getUserPicture() {
    const promise = api.getUser(token);
    promise.then(({ data }) => setUserPicture(data));
  }

  return (
    <>
      <TitlePage>
        <img src={userPicture} />
        {userName}'s posts
      </TitlePage>

      <Container>
        <ContainerPublications>
          <Posts
            reloadPosts={reloadPosts}
            params={params}
            setUserName={setUserName}
          />
        </ContainerPublications>

        <Trendings />
      </Container>
    </>
  );
}

const TitlePage = styled.h1`
  display: flex;
  width: 936px;
  padding-top: 78px;
  padding-bottom: 43px;
  align-items: center;

  font-family: "Oswald";
  color: #ffffff;

  align-self: left;

  img {
    width: 60px;
    height: 60px;
    margin-right: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 25px;
`;

const ContainerPublications = styled.div`
  padding: 0;
  width: 610px;
`;
