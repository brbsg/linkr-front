import styled from "styled-components";
export default function MetaLink({ url, title, description, image }) {
  function handleLink() {
    window.open(url, "_blank");
  }
  return (
    <LinkBlock onClick={handleLink}>
      <BlockText>
        <h3>{title}</h3>
        <h4>{description}</h4>
        <h5>{url}</h5>
      </BlockText>
      <img src={image} alt="link post visual" />
    </LinkBlock>
  );
}

const LinkBlock = styled.div`
  :hover {
    cursor: pointer;
  }
  width: 100%;
  height: 155px;

  display: flex;
  justify-content: space-between;

  border: 1px solid #4d4d4d;
  box-sizing: border-box;
  border-radius: 11px;

  img {
    width: 153px;
    height: 100%;
    border-radius: 0px 10px 10px 0px;
  }
`;

const BlockText = styled.div`
  width: 100%;
  padding: 24px 19px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-sizing: border-box;

  h3 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #cecece;
  }
  h4 {

    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;

    color: #9b9595;
  }
  h5 {
    margin: 0;
    padding: 0;

    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    word-wrap: break-word;

    color: #cecece;
  }
`;
