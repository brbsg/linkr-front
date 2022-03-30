import styled from 'styled-components'

export const StyledForm = styled.form`
    display: flex;
    position: relative;

    input {
        display: flex;
        padding: 15px;

        background: #252525;
        border: none;
        border-radius: 8px;
        color: #575757;
        font-style: italic;

        width: 510px;
        height: 39px;
    }

    button {
        display: flex;
        position: absolute;
        right: 8px;
        top: 30px;

        background: none;
    }
`