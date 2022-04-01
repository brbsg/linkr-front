import { useEffect, useState } from 'react';

import ReactTooltip from 'react-tooltip';

import { IoHeartOutline } from 'react-icons/io5';
import { IoHeart } from 'react-icons/io5';

import api from '../../../services/api'

export default function Like(props) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likers, setLikers] = useState([]);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => getLikeData(), []);
  useEffect(() => getLikedByUser(), []);
  useEffect(() => setLikedByUser(), [userLikes])

  function getLikedByUser() {
    const promise = api.getUserLikes(props.token);
    promise.then(({ data }) => {
      setUserLikes(data);
    });
  }

  function getLikeData() {
    const promise = api.getLikes({ postId: props.postId }, props.token);
    promise.then(({ data }) => {
      setLikers(data.users);
      setLikes(data.count);
    });
  }

  function setLikedByUser() {
    if(userLikes.find((userLike) => userLike.postId === props.postId)) {
      setLiked(true)
    }
  }

  function handleClick() {
    const promise = api.toggleLike({ postId: props.postId }, props.token);
    promise.then();
    promise.catch();
  }

  return (
    <div onClick={() => handleClick()}>
      <a
        data-tip={
          likes
            ? likes > 2
              ? liked
                ? `You, ${likers[0].user} and other ${likes - 1} people`
                : `${likers[0].user}, ${likers[1].user} and other ${
                    likes - 2
                  } people`
              : likes === 2
              ? liked
                ? `You, ${likers[0].user} and ${likers[1].user}`
                : `${likers[0].user} and ${likers[1].user}`
              : liked
              ? `You and ${likers[0].user}`
              : `${likers[0].user}`
            : liked
            ? `You`
            : 'Ninguém curtiu isso. Que peninha.'
        }
        onClick={() => setLiked(!liked)}
      >
        {liked ? <IoHeart color='red' size={30} /> : <IoHeartOutline size={30} />}
        <p>{liked ? likes + 1 : likes} likes</p>
      </a>
      <ReactTooltip place='bottom' type='light' effect='solid' />
    </div>
  );
}
