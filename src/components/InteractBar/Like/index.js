import { useEffect, useState } from 'react';

import ReactTooltip from 'react-tooltip';

import { IoHeartOutline } from 'react-icons/io5';
import { IoHeart } from 'react-icons/io5';

import useUser from '../../../hooks/useUser';

import api from '../../../services/api';

export default function Like(props) {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likers, setLikers] = useState([]);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => getLikeData(), []);
  useEffect(() => getLikedByUser(), []);
  useEffect(() => setLikedByUser(), [userLikes]);
  useEffect(() => filterLikeData(), [userLikes]);

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

  function filterLikeData() {
    console.log(likers);
    console.log(user.name);

    console.log(likers.filter((liker) => liker.user !== user.name));
    if (likers) {
      setLikers(likers.filter((liker) => liker.user !== user.name));
    }
    //setLikers(likers.filter((liker) => liker.user !== user.name))
  }

  function setLikedByUser() {
    if (userLikes.find((userLike) => userLike.postId === props.postId)) {
      setLiked(true);
    }
  }

  function handleClick() {
    const promise = api.toggleLike({ postId: props.postId }, props.token);
    promise.then(getLikeData());
    promise.catch();
  }

  if (!likers) return 'Carregando...';
  console.log(likers);
  //`You, ${likers[0].user} and other ${likes - 2} people`
  return (
    <div onClick={() => handleClick()}>
      <a
        data-tip={
          likers && likes
            ? likers[0]
              ? likers[1]
                ? likes === 2
                  ? liked
                    ? `You, ${likers[0].user}`
                    : `${likers[0].user}, ${likers[1].user}`
                  : liked
                  ? `You, ${likers[0].user} and other ${likes-2} people`
                  : `${likers[0].user}, ${likers[1].user} and other ${likes-2} people`
                : liked
                  ? `You`
                  : `${likers[0].user}`
              : ``
            : 'Nobody liked this. How sad.'
        }
        onClick={() => setLiked(!liked)}
      >
        {liked ? (
          <IoHeart color='red' size={30} />
        ) : (
          <IoHeartOutline size={30} />
        )}
        <p>{likes} likes</p>
      </a>
      <ReactTooltip place='bottom' type='light' effect='solid' />
    </div>
  );
}
