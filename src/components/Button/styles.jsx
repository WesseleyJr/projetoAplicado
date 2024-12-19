import { styled } from "styled-components";

export const ButtonStyle = styled.button`
    background-color: var(--azul-secundario);
    border: none;
    padding: 10px 30px;
    border-radius: 20px;
    color: var(--branco-primario);
    font-family: 'montserrat';
    font-size: calc(var(--font-size) + 4px);
    font-weight: 600;
    margin-top: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    
    &:hover{
        background-color: var(--azul-primario);
        cursor: pointer;
    }
`