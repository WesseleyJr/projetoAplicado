import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Logo = styled.img`
  height: 150px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    height: 100px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    height: 80px;
    margin-bottom: 15px;
  }
`;

export const Title = styled.h1`
  color: var(--preto-secundario);
  font-family: "poppins";
  font-weight: 600;
  font-size: calc(var(--font-size) + 14px);

  @media (max-width: 768px) {
    font-size: calc(var(--font-size) + 10px);
  }

  @media (max-width: 480px) {
    font-size: calc(var(--font-size) + 8px);
  }
`;