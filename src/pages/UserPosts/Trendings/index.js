import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../../hooks/useAuth";
import api from "../../../services/api";

export default function Trendings() {
  const navigate = useNavigate();
  const [hashtags, setHashtags] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const promise = api.getHashtags(token);
    promise
      .then(({ data }) => {
        setHashtags(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!hashtags) {
    return (
      <Trending>
        <Title>trending</Title>
        <Separador />
        <Trends>
          <Trend>Houve um erro ao carregar as #hashtags</Trend>
        </Trends>
      </Trending>
    );
  }
  if (hashtags.length === 0) {
    return (
      <Trending>
        <Title>trending</Title>
        <Separador />
        <Trends>
          <Trend>There are no hashtags trending yet...</Trend>
        </Trends>
      </Trending>
    );
  }

  return (
    <Trending>
      <Title>trending</Title>

      <Separador />

      <Trends>
        {hashtags.map((hashtag) => {
          <Trend onClick={() => navigate(`/hashtag/${hashtag.id}`)}>
            {`# ${hashtag.name}`}
          </Trend>;
        })}
      </Trends>
    </Trending>
  );
}

const Trending = styled.div`
  width: 301px;
  height: 100%;

  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;

    color: #ffffff;
  }

  background: #171717;
  border-radius: 16px;
`;

const Separador = styled.div`
  width: 100%;
  border: 1px solid #484848;
`;

const Title = styled.div`
  padding: 9px 16px 12px;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;

  color: #ffffff;
`;

const Trends = styled.div`
  padding: 22px 16px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Trend = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: 0.05em;

  color: #ffffff;
`;
