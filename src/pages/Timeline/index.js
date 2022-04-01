import { useEffect, useState } from 'react';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import styled from 'styled-components';
import Posts from './Posts';
import Trendings from './Trendings';
import useUser from '../../hooks/useUser';
import NewPostsAlertButton from '../../components/NewPostsAlertButton';
import { useNavigate } from 'react-router-dom';

export default function Timeline() {
  const navigate = useNavigate();

  const [postForm, setPostForm] = useState({
    link: '',
    description: '',
    hashtags: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [reloadPostsTrend, setReloadPostsTrend] = useState(false);
  const { token } = useAuth();
  const { user } = useUser();
  const [reloadByNewPosts, setReloadByNewPosts] = useState(false);

  console.log(user, token);
  useEffect(() => {
    if (!user || !token) {
      navigate('/');
    }
  }, []);

  function handleChange(e) {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  }

  function handlePost(event) {
    event.preventDefault();
    macthHashtags();
    setIsLoading(true);
    let promise = api.sendPost(postForm, token);
    promise
      .then(() => {
        setIsLoading(false);
        setReloadPostsTrend(!reloadPostsTrend);
      })
      .catch(() => {
        alert('Houve um erro ao publicar seu link');
        setIsLoading(false);
      });
    setPostForm({ link: '', description: '', hashtags: [] });
  }

  function macthHashtags() {
    let str = postForm.description;
    let regex = /\B(\#[a-zA-Z)-9]+\b)(?!;)/gi;
    let hashArr = str.match(regex);
    console.log(hashArr);

    if (!hashArr) {
      setPostForm({ link: '', description: '', hashtags: [] });
      return;
    }

    hashArr.forEach((element) => {
      const nameHashtag = element.replace('#', '');
      setPostForm({
        ...postForm,
        hashtags: postForm.hashtags.push(nameHashtag),
      });
    });
  }

  if (!token || !user) return <></>;

  return (
    <>
      <TitlePage>timeline</TitlePage>

      <Container>
        <ContainerPublications>
          <PublishBlock>
            <UserBlock>
              <img src={user.image} alt='user-perfil' />
            </UserBlock>

            <FormBlock onSubmit={handlePost}>
              <h2>What are you going to share today?</h2>
              <LinkInput
                placeholder='http://'
                type='text'
                onChange={handleChange}
                name='link'
                value={postForm.link}
                required
              />

              <DescriptionInput
                placeholder='Awesome article about #javascript'
                type='text-area'
                onChange={handleChange}
                name='description'
                value={postForm.description}
              />

              <button type='submit' disabled={isLoading}>
                {isLoading ? 'Publishing...' : 'Publish'}
              </button>
            </FormBlock>
          </PublishBlock>
          <NewPostsAlertButton
            onClick={() => {
              setReloadByNewPosts(!reloadByNewPosts);
            }}
          />
          <Posts
            reloadPostsTrend={reloadPostsTrend}
            reloadByNewPosts={reloadByNewPosts}
          />
        </ContainerPublications>
        <Trendings reloadPostsTrend={reloadPostsTrend} />
      </Container>
    </>
  );
}

const TitlePage = styled.h1`
  width: 936px;
  padding-top: 125px;
  padding-bottom: 43px;

  font-family: 'Oswald';
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;

  color: #ffffff;

  align-self: left;

  @media (max-width: 945px) {
    width: 610px;
  }
  @media (max-width: 630px) {
    width: 100vw;
    padding-top: 91px;
    padding-bottom: 19px;
    padding-left: 17px;
  }
  @media (max-width: 550px) {
    font-size: 33px;
    line-height: 49px;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 25px;

  @media (max-width: 630px) {
    width: 100vw;
  }
`;

const ContainerPublications = styled.div`
  width: 610px;

  @media (max-width: 630px) {
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

  @media (max-width: 630px) {
    border-radius: 0px;
  }
  @media (max-width: 550px) {
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
  @media (max-width: 420px) {
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

    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;

    color: #707070;
  }
  button {
    width: 112px;
    height: 31px;

    font-family: 'Lato';
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

  @media (max-width: 550px) {
    h2 {
      font-size: 17px;
      line-height: 20px;
    }
    button {
      height: 22px;
      font-size: 13px;
      line-height: 16px;
    }
  }
  @media (max-width: 420px) {
    h2 {
      text-align: center;
    }
  }
`;

const LinkInput = styled.input`
  all: unset;
  width: 100%;
  height: 30px;
  padding: 8px 12px;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;

  color: #000000;

  ::placeholder {
    font-family: 'Lato';
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

  font-family: 'Lato';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;

  color: #000000;

  ::placeholder {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;

    color: #949494;
  }

  background: #efefef;
  border-radius: 5px;
  box-sizing: border-box;

  @media (max-width: 420px) {
    height: 47px;
  }
`;
