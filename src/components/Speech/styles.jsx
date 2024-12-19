import { styled } from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const IconButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;

export const Tooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  width: 140px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%; 
  left: 50%;
  margin-left: -70px; 
  transition: opacity 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 100%; 
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;