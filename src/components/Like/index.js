import { useState } from 'react';

import ReactTooltip from 'react-tooltip';

import { IoHeartOutline } from 'react-icons/io5';
import { IoHeart } from 'react-icons/io5';

export default function Like(props) {
  const [liked, setLiked] = useState(false);
  //achar lib pro balaozinho
  return (
    <>
    <a data-tip='ninguém curtiu isso' onClick={() => setLiked(!liked)}>
      {liked ? <IoHeart color='red' /> : <IoHeartOutline />}
      <p>{props.likes} likes</p>
    </a>
    <ReactTooltip place='bottom' type='light' effect='solid'/>
    </>
  );
}
