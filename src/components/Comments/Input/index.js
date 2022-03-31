import { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi'

import { StyledForm } from './style';

import useAuth from '../../../hooks/useAuth';
import api from '../../../services/api';

export default function Input({post}) {
  const { token } = useAuth()
  const [userPicture, setUserPicture] = useState('')
  const [commentData, setCommentData] = useState({
    text: '',
    postId: post.id
  })

  useEffect(() => getUserPicture(), [])

  function getUserPicture() {
    const promise = api.getUser(token);
    promise.then(({ data }) => setUserPicture(data))
  }

    function handleSubmit(e) {
        e.preventDefault()
        api.postComment(commentData, token)
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
