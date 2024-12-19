import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  font-size: calc(var(--font-size) + 1px);
  padding: 10px 15px;
  font-family: "montserrat";
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  &:focus {
    outline: 2px solid var(--azul-primario);
  }

  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;

export const Label = styled.label`
  color: var(--preto-secundario);
  font-family: "montserrat";
  font-size: calc(var(--font-size) + 2px);
  font-weight: 500;
  padding-left: 10px;
`;

export const EyeIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  color: #666;

  &:hover {
    color: #333;
  }
`;
