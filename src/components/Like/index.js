import { useEffect, useState } from 'react';

import ReactTooltip from 'react-tooltip';

import { IoHeartOutline } from 'react-icons/io5';
import { IoHeart } from 'react-icons/io5';

import api from '../../services/api';

export default function Like(props) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likers, setLikers] = useState([])

  useEffect(() => getLikeData(), [])

  function getLikeData() {
    const promise = api.getLikes({postId: props.postId}, props.token)
    promise.then(({ data }) => {
      setLikers(data.users)
      setLikes(data.count)
      }
    )
  }

  function handleClick() {
    const promise = api.toggleLike({postId: props.postId}, props.token)
    promise.then()
    promise.catch()
  }

  return (
    <div onClick={() => handleClick()}>
    <a data-tip={
      likes?
        likes > 2?
          liked?
          `You, ${likers[0].user} and other ${likes - 1} people`
          :
          `${likers[0].user}, ${likers[1].user} and other ${likes - 2} people`
        :
          likes === 2?
            liked?
            `You, ${likers[0].user} and ${likers[1].user}`
            :
            `${likers[0].user} and ${likers[1].user}`
          :
            liked?
            `You and ${likers[0].user}`
            :
            `${likers[0].user}`
      :
      'Ninguém curtiu isso. Que peninha.'
    } 
    onClick={() => setLiked(!liked)}>
      {liked ? <IoHeart color='red' /> : <IoHeartOutline />}
      <p>{
      liked?
        likes +1 : likes
    } likes</p>
    </a>
    <ReactTooltip place='bottom' type='light' effect='solid'/>
    </div>
  );
}