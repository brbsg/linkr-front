import { FiSend } from 'react-icons/fi'

import { StyledForm } from './style';

export default function Input() {
    function handleSubmit(e) {
        e.preventDefault()
    }

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e)}>
      <img src='' alt='user' />
      
        <input placeholder='write a comment...'/>
        <button><FiSend /></button>
      </StyledForm>
    
  );
}
