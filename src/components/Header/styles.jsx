import { styled } from "styled-components";

export const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 50px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 0 30px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

export const Text = styled.p`
  font-family: "poppins";
  font-size: calc(var(--font-size) + 4px);
  color: var(--preto-secundario);
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    font-size: calc(var(--font-size) + 2px);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size);
  }
`;

export const Logout = styled.button`
  color: var(--preto-secundario);
  border: none;
  background-color: transparent;
  font-family: "poppins";
  font-size: calc(var(--font-size) + 4px);

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: calc(var(--font-size) + 2px);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size);
  }
`;