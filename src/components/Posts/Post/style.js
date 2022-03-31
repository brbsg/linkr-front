import styled from 'styled-components'

export const PostBox = styled.div`
  position: relative;

  width: 100%;
  padding: 21px 20px;

  display: flex;
  gap: 18px;

  background: #171717;
  border-radius: 16px;
  box-sizing: border-box;

  @media (max-width: 630px) {
    border-radius: 0px;
  }
  @media (max-width: 550px) {
    padding: 9px 15px;
  }
`;

export const NavBox = styled.div`
  width: 50px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
  }
  display: flex;
  flex-direction: column;
  gap: 19px;
`;

export const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  h2 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;

    color: #ffffff;
  }
  h3 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;

    color: #b7b7b7;
  }

  @media (max-width: 550px) {
    h2 {
      font-size: 17px;
      line-height: 20px;
    }
    h3 {
      font-size: 15px;
      line-height: 18px;
    }
  }
`;

export const TrashCan = styled.div`
  position: absolute;
  top: 22px;
  right: 23px;

  :hover {
    cursor: pointer;
  }
  @media (max-width: 550px) {
    top: 9px;
    right: 15px;
  }
`;

export const EditIcon = styled.div`
  position: absolute;
  top: 22px;
  right: 50px;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 550px) {
    top: 9px;
    right: 45px;
  }
`;

export const Button = styled.button`
  width: 134px;
  height: 37px;
  border-radius: 5px;
  margin: 0px 13px;

  background-color: #fff;
  color: #1877f2;

  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.8px;
`;

export const ButtonDelete = styled.button`
  width: 134px;
  height: 37px;
  border-radius: 5px;
  margin: 0px 13px;

  background-color: #1877f2;
  color: #fff;

  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.8px;
`;

export const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff15',
  },
  content: {
    width: '597px',
    height: '262px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#333333',
    color: '#FFF',
    border: 'none',
    borderRadius: '50px',
    textAlign: 'center',
    padding: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '30px',
  },
};

export const StyledHashtag = styled.span`
  font-weight: 900;

  :hover {
    cursor: pointer;
  }
`;

export const CommentsAndPostBox = styled.div`
  width: 100%;
  border-radius: 16px;
  background: #1e1e1e;
`;
