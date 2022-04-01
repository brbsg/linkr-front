import { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi'

import { StyledForm } from './style';

import useUser from '../../../hooks/useUser'
import useAuth from '../../../hooks/useAuth';
import api from '../../../services/api';

export default function Input({post}) {
  const { token } = useAuth()
  const [commentData, setCommentData] = useState({
    text: '',
    postId: post.id
  })

  const { user } = useUser();
  const userPicture = user.image

    function handleSubmit(e) {
        e.preventDefault()
        const promise = api.postComment(commentData, token)
        promise.then(e.target.reset()); //pq nao funciona?
    }
    function handleChange(e) {
      setCommentData({...commentData, [e.target.name]: e.target.value})
    }

    

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e)}>
      <img src={userPicture} alt='user' />
        <input 
          placeholder='write a comment...'
          type='text'
          name='text'
          value={commentData.text}
          onChange={(e) => handleChange(e)}
          />
        <button><FiSend /></button>
      </StyledForm>
    
  );
}
