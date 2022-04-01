import styled from 'styled-components'
export const CommentsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div, form {
       display: flex;
       align-items: center;
       justify-content: center;

       height: 74px;
       width: 571px;
       padding: 25px;
       padding-right: 0;
       }
    div {
        border-bottom: 1px solid #353535;
        div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;

            b {
                color: #F3F3F3;
            }

        }
    }
    span {
        display: flex;
        gap: 5px;
        p {
            color: #565656;
        }
    }
`