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
  const [follower, setFollower] = useState(false);
  const [disable, setDisable] = useState(false);
  const { token } = useAuth();

  const params = useParams();

  function isFollower(){
    const promise = api.verifyFollower(
      params.id,
      token
    );
    promise.then( ({ data })=>{
      setFollower(data);
    }).catch((error)=>{
      console.log(error);
      alert("Could not validate if user is Followed. Try later...");
    })
  }

  useEffect(async () => {
    try {
      const { data } = await api.getUserName(token, params);
      setUserName(data.name);
      setUserPicture(data.image);
      isFollower();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // function getUserPicture() {
  //   const promise = api.getUser(token);
  //   promise.then(({ data }) => setUserPicture(data));
  // }

  async function handleFollow(){
    setDisable(!disable);
    try {
      const promise = await api.toggleFollow(
        params.id,
         token
      );
      setFollower(promise.data);
      setDisable(!disable);
    } catch (error) {
      console.log(error);
      alert("Could not Follow user. Try later...")
      setDisable(!disable);
    }
  }

  return (
    <>
      <TitlePage>
        <UserTitleContent>
        <img src={userPicture} />
        {userName}'s posts
        </UserTitleContent>
        <ButtonFriendly 
          disable={disable} 
          onClick={()=>{handleFollow()}} 
          follower={follower}
        >
          {follower? "Unfollow": "Follow"}
        </ButtonFriendly>
      </TitlePage>

      <Container>
        <ContainerPublications>
          <Posts reloadPosts={reloadPosts} params={params} />
        </ContainerPublications>

        <Trendings />
      </Container>
    </>
  );
}

const TitlePage = styled.div`
  width: 936px;
  padding-top: 78px;
  padding-bottom: 43px;
  
  display: flex;
  justify-content: space-between;
`;

const UserTitleContent = styled.h1`
  display: flex;
  align-self: left;

  font-family: "Oswald";
  color: #ffffff;
  
  img {
    width: 60px;
    height: 60px;
    margin-right: 20px;
  }
`;

const ButtonFriendly = styled.div`
  width: 112px;
  height: 31px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  color: ${ (props) => props.follower? "#1877F2": "#FFFFFF"};

  background: ${ (props) => props.follower? "#FFFFFF": "#1877F2"};
  border-radius: 5px;
`;

const Container = styled.div`
  display: flex;
  gap: 25px;
`;

const ContainerPublications = styled.div`
  padding: 0;
  width: 610px;
`;
