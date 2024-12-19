import { styled } from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

export const Container = styled(Dropdown)`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const Input = styled(Dropdown.Toggle)`
  width: 100%;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  font-size: calc(var(--font-size) + 1px);
  font-family: "montserrat";
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  background-color: var(--branco-primario) !important;
  color: var(--preto-primario) !important;

  &:hover {
    background-color: var(--branco-primario) !important;
    color: var(--preto-primario) !important;
  }

  &:active {
    background-color: var(--branco-primario) !important;
    color: var(--preto-primario) !important;
  }
`;

export const Item = styled(Dropdown.Item)`
  width: 100%;
  border: none;
  font-size: calc(var(--font-size) + 1px);
  padding: 10px 15px;
  font-family: "montserrat";
  border-radius: 15px;
  &:hover{
    background-color: var(--azul-primario-claro);
    color: var(--branco-primario);
  }
`;

export const Menu = styled(Dropdown.Menu)`
  width: 100%;
  border: none;
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

export const Label = styled.label`
  color: var(--preto-secundario);
  font-family: "montserrat";
  font-size: calc(var(--font-size) + 2px);
  font-weight: 500;
  padding-left: 10px;
`;
